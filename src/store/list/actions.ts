import { db } from "@/store/firestore";
import { RootState } from "@/store/types";
import { User } from "firebase";
import { ActionTree } from "vuex";
import { firebaseAction } from "vuexfire";
import { ListState } from '@/store/list/types';
import {defaultWishlist} from '../../wishlist';

const currentYear = 2018;

export const actions: ActionTree<ListState, RootState> = {
  init: firebaseAction(async (context: any, user: User) => {
    const listCollection = db.collection('list');
    const list = await listCollection.where('year', '==', currentYear).where('user', '==', user.uid).get();
    if (list.empty) {
      const currentYearList = await listCollection.add({
        year: currentYear,
        user: user.uid,
        list: defaultWishlist
      });
      await context.bindFirebaseRef('currentYearList', currentYearList);
      await context.commit('setListRef', currentYearList);
    } else {
      const result = list.docs[0].ref;
      await context.bindFirebaseRef('currentYearList', result);
      await context.commit('setListRef', result);
    }
  }),
  async updateUserList(context, updatedList: string) {
    await context.commit('updateList', updatedList);
    await context.state.listRef!.update({ list: updatedList });
    console.log('updated user list');
  }
};
