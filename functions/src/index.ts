import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { email } from './email';
import { FirestoreRepo } from './firestore-repo';
import { makeSecretSantaEmail } from './emailTemplates';
const EmailReplyParser =  require('email-reply-parser');
import MarkdownIt = require('markdown-it');

admin.initializeApp();
const firestore = admin.firestore();
firestore.settings({});
const apiKey = functions.config().sparkpost.apikey;

export const sendEmailAsBurt = functions.https.onCall(async (data) => {
  const { emailList, content, subject = 'A message from Burt the Elf' } = data;
  return await email(emailList, content, subject, apiKey);
});

export const sendTestEmail = functions.https.onCall(
  async (emailAddress: string) => {
    const body = `<p>Hello ${emailAddress}! I promise you that I am not spam.</p>
            <p><a href="https://secretsanta.steele.blue">Check out Secret Santa</a></p>`;
    const emailResults = await email(
      [emailAddress],
      body,
      'Hello SECRET SANTA',
      apiKey
    );
    return emailResults.id;
  }
);

export const makeDefaultLists = functions.https.onCall(async ({ year }) => {
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

export const emailSecretPal = functions.https.onCall(
  async ({ userId, year }) => {
    const repo = new FirestoreRepo(firestore);
    const userData = await repo.userData(userId);
    const { gifteeData, list } = await repo.santaFor(userId, year);
    const emailBody = makeSecretSantaEmail(gifteeData, list, userData);
    await email(
      [userData.email],
      emailBody,
      'Your Secret Pal has been chosen!',
      apiKey
    );
  }
);

export const emailWishlist = functions.https.onRequest(async (req, res) => {
  console.log('got an email with data');
  const { body } = req;
  const objs = body.map(async post => {
    const { relay_message } = post.msys;
    const { content } = relay_message;
    const { html, text } = content;
    const from: string = relay_message.friendly_from;
    const repo = new FirestoreRepo(firestore);
    const user = await repo.userFromEmail(from);
    const wishlist = new EmailReplyParser().parseReply(text);
    await repo.saveList(user.uid, currentYear, wishlist);
    const md = new MarkdownIt({ html: true, linkify: true });
    const htmlList = md.render(wishlist);
    const response = `<p><strong>We got your list!</strong></p>

<p>Your list is:</p>

<blockquote>
${htmlList}
</blockquote>

<p><em>To update, send Burt another email with a new list.</em></p>`
    await email([from], response, 'Burt got your list!', apiKey);
  });
  await Promise.all(objs);
  console.log(JSON.stringify(req.body, null, 2));
  res.json({ status: "ok" })
});