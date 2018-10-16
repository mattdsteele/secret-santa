import { FirebaseFirestore } from '@firebase/firestore-types';
import { SecretSantaUser } from './store/login/types';

export class FirestoreRepo {
  constructor(private store: FirebaseFirestore) {}
  public async santaFor(
    gifter: string,
    year: string
  ): Promise<SecretSantaUser> {
    try {
      const results = await this.store
        .collection('pairings')
        .where('gifter', '==', gifter)
        .where('year', '==', parseInt(year, 10))
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
        return gifteeData as SecretSantaUser;
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}
