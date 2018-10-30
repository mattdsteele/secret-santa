import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as SparkPost from 'sparkpost';
import { FirestoreRepo } from './firestore-repo';

admin.initializeApp();
const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: false });

const email = async (emails: string[], htmlBody: string, subject: string) => {
  const apiKey = functions.config().sparkpost.apikey;
  const client = new SparkPost(apiKey);
  const response = await client.transmissions.send({
    content: {
      from: 'burt@secretsanta-mail.steele.blue',
      reply_to: 'matt@steele.blue',
      subject: 'A message from Burt the Elf',
      html: `
          <html><body>
          ${htmlBody}
        </body></html>
          `
    },
    recipients: emails.map(address => {
      return { address };
    })
  });
  return response.results;
};

export const sendEmailAsBurt = functions.https.onCall(async data => {
  const { emailList, content } = data;
  return await email(emailList, content, 'A message from Burt the Elf');
});
export const helloWorld = functions.https.onCall(data => {
  console.log(`data: ${data}`);
  return { text: 'Hello world?!?!' };
});

export const sendTestEmail = functions.https.onCall(
  async (emailAddress: string) => {
    const body = `<p>Hello ${emailAddress}! I promise you that I am not spam.</p>
            <p><a href="https://secretsanta.steele.blue">Check out Secret Santa</a></p>`;
    const emailResults = await email(
      [emailAddress],
      body,
      'Hello SECRET SANTA'
    );
    return emailResults.id;
  }
);

export const mySampleFunction = functions.https.onRequest(async (req, res) => {
  const { gifter, year } = req.query;
  const repo = new FirestoreRepo(firestore);
  try {
    const user = await repo.santaFor(gifter, year);
    res.write(`Secret santa for ${gifter} is ${user.displayName}`);
  } catch (e) {
    res.status(500);
    res.write(`Failed: ${e}`);
  }
  res.end();
});
