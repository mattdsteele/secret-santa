import * as admin from 'firebase-admin';
import * as https from 'firebase-functions/v2/https';
import * as params from 'firebase-functions/params';
import * as functions from 'firebase-functions/v1';
import { email } from './email';
import { FirestoreRepo } from './firestore-repo';
// import busboy = require('async-busboy');
// import formidable = require('formidable');
import { formidable } from "formidable";
// import formidable from 'formidable-mini';
import { makeSecretSantaEmail } from './emailTemplates';
const EmailReplyParser =  require('email-reply-parser');
import MarkdownIt = require('markdown-it');
import { Readable } from 'stream';
import { IncomingMessage } from 'http';

admin.initializeApp();
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

export const makeDefaultLists = https.onCall(async ({ data }) => {
  const { year } = data;
  console.log('Making default lists!', year);
  const repo = new FirestoreRepo(firestore);
  const responses = await Promise.all(
    (await repo.activeUsers())
      .map((userids) => userids.uid)
      .map((uid) => repo.createDefaultList(uid, year))
  );
  console.log(`generated ${responses.length} lists`);
});
const currentYear = new Date().getFullYear();

export const onUserCreate = functions.auth.user().onCreate(async (user) => {
  const { uid } = user;
  const year = currentYear;
  const repo = new FirestoreRepo(firestore);
  await repo.createDefaultList(uid, year);
  console.log(`Added default list for ${uid}`);
});

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
  const [fields] = await form.parse(stream as IncomingMessage);
  // const [fields, files] =  await form.parse(req);
  // const [fields, files]= await form.parse(req);
  // const {files, fields} =  await busboy(req);
  console.log("parsed with stream approach");
  // console.log(JSON.stringify(files));
  console.log(JSON.stringify(fields));
  const from = fields.sender[0];
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

  try {
    wishlist = new EmailReplyParser().parseReply(text);
  } catch (e) {
    console.log(e);
  }
  await repo.deleteWishlists(user.uid, currentYear);
  await repo.saveList(user.uid, currentYear, wishlist);
  const md = new MarkdownIt({ html: true, linkify: true });
  const htmlList = md.render(wishlist);
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
