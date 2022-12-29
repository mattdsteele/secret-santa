import { Firestore } from '@google-cloud/firestore';
import { defaultWishlist } from './wishlist';

export interface User {
  displayName: string;
  uid: string;
  email: string;
  photoURL: string;
  disabled: boolean;
}
export class FirestoreRepo {
  constructor(private store: Firestore) {}
  async createDefaultList(uid: string, year: number) {
    await this.saveList(uid, year, defaultWishlist);
  }

  async deleteWishlists(userId: string, year: number) {
    const results = await this.store.collection("list").where("user", "==", userId).where("year", "==", year).get();
    console.log(`found ${results.size} existing lists`);
    results.forEach(async r => {
      await r.ref.delete();
      console.log(`deleted ref ${r.ref.id}`);
    });
  }

  async userFromEmail(email: string): Promise<User> {
    const results = await this.store.collection("users").where("email", "==", email).where("disabled", "!=", true).get();
    if (results.empty) {
      throw new Error(`No user for email ${email}`);
    }
    const [result] = results.docs;
    const data = result.data();
    return data as User;
  }
  async santaFor(gifterId: string, year: string) {
    try {
      const results = await this.store
        .collection('pairings')
        .where('gifter', '==', gifterId)
        .where('year', '==', parseInt(year))
        .get();
      if (results.empty) {
        throw new Error(`No results found for ${year} and ${gifterId}`);
      } else {
        const [result] = results.docs;
        const data = result.data();
        const { giftee } = data;

        const gifteeResults = await this.store
          .collection('users')
          .where('uid', '==', giftee)
          .get();
        const [gifteeUser] = gifteeResults.docs;
        const gifteeData = gifteeUser.data() as User;
        const list = await this.listFor(giftee, parseInt(year));
        return { gifteeData, list };
      }
    } catch (e) {
      throw new Error(e);
    }
  }
  async userData(userId: string) {
    const gifteeResults = await this.store
      .collection('users')
      .where('uid', '==', userId)
      .get();
    const [gifteeUser] = gifteeResults.docs;
    const gifteeData = gifteeUser.data();
    return gifteeData as User;
  }
  async saveList(userId: string, year: number, list: string) {
    const listCollection = this.store.collection('list');
    await listCollection.add({
      year,
      user: userId,
      list: list,
    });
  }

  async listFor(user: string, year: number) {
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
  async allUsers() {
    const results = await this.store.collection('users').get();
    return results.docs.map((result) => result.data() as User);
  }
  async activeUsers() {
    const users = await this.allUsers();
    console.log(`found ${users.length} total users`);
    const activeUsers = users.filter((u) => u.disabled !== true);
    console.log(`found ${activeUsers.length} active users`);
    return activeUsers;
  }
}
