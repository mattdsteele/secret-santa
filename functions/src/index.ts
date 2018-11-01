import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { email } from './email';
import { FirestoreRepo } from './firestore-repo';

admin.initializeApp();
const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: false });
const apiKey = functions.config().sparkpost.apikey;

export const sendEmailAsBurt = functions.https.onCall(async data => {
  const { emailList, content } = data;
  return await email(emailList, content, 'A message from Burt the Elf', apiKey);
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

export const onUserCreate = functions.auth.user().onCreate(async user => {
  const { uid } = user;
  const year = 2018;
  const repo = new FirestoreRepo(firestore);
  await repo.createDefaultList(uid, year);
  console.log(`Added default list for ${uid}`);
});
