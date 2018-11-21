import { FirebaseFirestore } from '@firebase/firestore-types';
import { SecretSantaUser } from './store/login/types';

export class FirestoreRepo {
  constructor(private store: FirebaseFirestore) {}
  public async santaFor(
    gifter: string,
    year: string
  ): Promise<[SecretSantaUser, string]> {
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
        const gifteeData: SecretSantaUser = gifteeUser.data() as SecretSantaUser;
        const list = await this.listFor(gifteeData.uid, parseInt(year, 10));
        return [gifteeData, list];
      }
    } catch (e) {
      throw new Error(e);
    }
  }
  private async listFor(user: string, year: number) {
    const results = await this.store
      .collection('list')
      .where('year', '==', year)
      .where('user', '==', user)
      .get();
    if (results.empty) {
      throw new Error(`No list found for ${user}`);
    } else {
      const [userListRef] = results.docs;
      const userListData = userListRef.data();
      return userListData.list as string;
    }
  }
}
