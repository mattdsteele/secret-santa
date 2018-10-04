import { db } from "@/store/firestore";
import { RootState } from "@/store/types";
import { User } from "firebase";
import { ActionTree } from "vuex";
import { firebaseAction } from "vuexfire";
import { ListState } from '@/store/list/types';

const currentYear = 2018;
export const actions: ActionTree<ListState, RootState> = {
  init: firebaseAction(async (context: any, user: User) => {
    const listCollection = db.collection('list');
    const list = await listCollection.where('year', '==', currentYear).where('user', '==', user.uid).get();
    if (list.empty) {
      console.log('could not find this user');
      const currentYearList = await listCollection.add({
        year: currentYear,
        user: user.uid,
        list: '# EMPTY  LIST'
      });
      await context.bindFirebaseRef('currentYearList', currentYearList);
      console.log('set current year list');
    } else {
      const result = list.docs[0].ref;
      await context.bindFirebaseRef('currentYearList', result);
      console.log('my list is', (await result.get()).data());
    }
  }),
  async updateUserList(context, updatedList: string) {
    console.log('userlist', updatedList);
    await context.commit('updateList', updatedList);
  }
};
