import EmailReplyParser = require('email-reply-parser');
import * as admin from 'firebase-admin';
import * as params from 'firebase-functions/params';
import * as https from 'firebase-functions/v2/https';
import {initializeApp} from 'firebase/app';
import {getDownloadURL, getStorage, ref, uploadString} from 'firebase/storage';
import { formidable } from "formidable";
import { IncomingMessage } from 'http';
import { Readable } from 'stream';
import { email } from './email';
import { makeSecretSantaEmail } from './emailTemplates';
import { FirestoreRepo } from './firestore-repo';
import MarkdownIt = require('markdown-it');
import { replaceAllImages } from './attachments';

const settings = {
  storageBucket: "steele-secret-santa.appspot.com",
};
admin.initializeApp(settings);
const app = initializeApp(settings);
const storage = getStorage(app);
const firestore = admin.firestore();
firestore.settings({});
const sparkpostKey = params.defineString('MAILGUN_API_KEY');

export const sendEmailAsBurt = https.onCall(async (data) => {
  const { emailList, content, subject = 'A message from Burt the Elf' } = data.data;
  return await email(emailList, content, subject, sparkpostKey.value());
});

export const sendTestEmail = https.onCall(async (data) => {
  const { emailAddress } = data.data;
  const body = `<p>Hello ${emailAddress}! I promise you that I am not spam.</p>
            <p><a href="https://secretsanta.steele.blue">Check out Secret Santa</a></p>`;
  const emailResults = await email(
    [emailAddress],
    body,
    'Hello SECRET SANTA',
    sparkpostKey.value()
  );
  return emailResults;
}
);


const currentYear = new Date().getFullYear();

export const emailSecretPal = https.onCall(
  async ({ data }) => {
    const { userId, year } = data;
    const repo = new FirestoreRepo(firestore);
    const userData = await repo.userData(userId);
    const { gifteeData, list } = await repo.santaFor(userId, year);
    const emailBody = makeSecretSantaEmail(gifteeData, list, userData);
    await email(
      [userData.email],
      emailBody,
      'Your Secret Pal has been chosen!',
      sparkpostKey.value()
    );
  }
);

export const emailWishlist = https.onRequest(async (req, res) => {
  console.log("got an email with data");
  const { body, rawBody } = req;
  console.log(JSON.stringify(req.headers));
  const form = formidable({keepExtensions: true});
  const stream = new Readable();
  stream.push(rawBody);
  stream.push(null);
   (stream as IncomingMessage).headers = {
    ...req.headers,
    'content-length': rawBody.length.toString()
   }
  console.log("about to parse");
  // https://github.com/node-formidable/formidable/issues/1029
  const [fields, files] = await form.parse(stream as IncomingMessage);
  console.log("parsed with stream approach");
  console.log(JSON.stringify(fields));
  console.log(JSON.stringify(files));
  const fileNames = Object.keys(files);
  let mimeTypes = [];
  fileNames.forEach(f => {
    files[f].forEach(async f => {
      // will try to perform upload here
      console.log('will be trying to upload here');

      // https://firebase.google.com/docs/storage/web/upload-files#upload_from_a_string
      mimeTypes.push(f.mimetype);
    })
  })
  
  // Basic upload test
  const storageRef = ref(storage);
  const firebaseFile = await uploadString(storageRef, 'hello friend')
  const dlUrl = await getDownloadURL(firebaseFile.ref);
  console.log(`dl url is ${dlUrl}`);

  const from = fields.sender[0];

  let hasForbiddenAttachment = false;
  const forbiddenAttachments = ['application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  forbiddenAttachments.forEach(a => {
    if (mimeTypes.includes(a)) {
      hasForbiddenAttachment = true;
    }
  });

  if (hasForbiddenAttachment) {
    const response = `<b>Uh oh!</b>
    <p>Looks like your list included a Word document. Unfortunately Burt's supercomputer can't handle those yet.</p>.
    <p>Please resend your list to Burt, directly in the email body.</p>`;
    await email([from], response, "Burt ran into an issue :(", sparkpostKey.value());
    res.json({ status: "ok" });
    return;
  }
  
  const html = fields["body-html"][0];
  const text = fields["body-plain"][0];
  let wishlist = text;
  console.log(`text: ${text}`);
  console.log(`html: ${html}`);
  const repo = new FirestoreRepo(firestore);
  const user = await repo.userFromEmail(from);

  if (!text) {
    // Sometimes text content doesn't show
    // TODO we should send the respondant a failure email,
    // and also Matt a message when it happens
    wishlist = html;
  }
  let htmlList = '';

  const useHtml = false;
  if (useHtml) {
    wishlist = html;
    // embed attachments
    // fixme this will not work, alas
    // https://stackoverflow.com/questions/16242489/send-a-base64-image-in-html-email
    htmlList = replaceAllImages(wishlist, files);
    console.log(`new html list: ${htmlList}`);
  } else {
    try {
      wishlist = new EmailReplyParser().parseReply(text);
    } catch (e) {
      console.log(e);
    }
    await repo.deleteWishlists(user.uid, currentYear);
    await repo.saveList(user.uid, currentYear, wishlist);
    const md = new MarkdownIt({ html: true, linkify: true });
    htmlList = md.render(wishlist);
  }

  const response = `<p><strong>Burt got your list!</strong></p>

<p>Your list is:</p>

${htmlList}

<p><em>To update your list, send Burt another email and it will replace your new list.</em></p>`;
  await email([from], response, "Burt got your list!", sparkpostKey.value());

  const shouldEmailMattCopy = true;
  if (shouldEmailMattCopy) {
    console.log("sending matt a copy of the email too");
    const mattEmailContent = `<p>Updated email contents!<p>
    <p>From: ${from}</p>
    <p>Wishlist:</p>
    ${htmlList}`;
    await email(
      ["orphum@gmail.com"],
      mattEmailContent,
      "Someone updated their wish list",
      sparkpostKey.value()
    );
  }
  res.json({ status: "ok" });
});
