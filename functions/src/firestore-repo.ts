import { Firestore } from '@google-cloud/firestore';

export interface User {
  displayName: string;
  uid: string;
  email: string;
  photoURL: string;
}
export class FirestoreRepo {
  constructor(private store: Firestore) {}
  async santaFor(gifter: string, year: string): Promise<User> {
    try {
      const results = await this.store
        .collection('pairings')
        .where('gifter', '==', gifter)
        .where('year', '==', parseInt(year))
        .get();
      if (results.empty) {
        throw new Error(`No results found for ${year} and ${gifter}`);
      } else {
        const [result] = results.docs;
        const data = result.data();
        const { giftee } = data;

        const gifteeResults = await this.store
          .collection('users')
          .where('uid', '==', giftee)
          .get();
        const [gifteeUser] = gifteeResults.docs;
        const gifteeData = gifteeUser.data();
        return gifteeData as User;
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}