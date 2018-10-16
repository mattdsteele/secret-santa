import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as SparkPost from 'sparkpost';
import { FirestoreRepo } from './firestore-repo';

admin.initializeApp();
const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: false });

export const helloWorld = functions.https.onCall(data => {
  console.log(`data: ${data}`);
  return { text: 'Hello world?!?!' };
});

export const sendTestEmail = functions.https.onCall(
  async (emailAddress: string) => {
    const apiKey = functions.config().sparkpost.apikey;
    const client = new SparkPost(apiKey);
    const data = await client.transmissions.send({
      content: {
        from: 'burt@secretsanta-mail.steele.blue',
        reply_to: 'matt@steele.blue',
        subject: 'Hello it is your secret santa!!',
        html: `
          <html><body>
            <p>Hello ${emailAddress}! I promise you that I am not spam.</p>
            <p><a href="https://secretsanta.steele.blue">Check out Secret Santa</a></p>
        </body></html>
          `
      },
      recipients: [{ address: emailAddress }]
    });
    return { response: data };
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
