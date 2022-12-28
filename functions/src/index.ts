import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { email } from './email';
import { FirestoreRepo } from './firestore-repo';
import { makeSecretSantaEmail } from './emailTemplates';

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
    await repo.saveList(user.uid, currentYear, text);
    const response = `We got your list!

    ${text}

    To update your list, just send Burt another email.
    `
    await email([from], response, 'Burt got your list!', apiKey);
  });
  await Promise.all(objs);
  console.log(JSON.stringify(req.body, null, 2));
  res.json({ status: "ok" })
});