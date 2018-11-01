import { db } from '@/store/firestore';
import { ListState } from '@/store/list/types';
import { RootState } from '@/store/types';
import { User } from 'firebase';
import { ActionTree } from 'vuex';
import { firebaseAction } from 'vuexfire';

const currentYear = 2018;

export const actions: ActionTree<ListState, RootState> = {
  init: firebaseAction(async (context: any, user: User) => {
    const listCollection = db.collection('list');
    const list = await listCollection
      .where('year', '==', currentYear)
      .where('user', '==', user.uid)
      .get();
    if (list.empty) {
      console.error('Unable to find list, this is bad!');
    } else {
      const result = list.docs[0].ref;
      await context.bindFirebaseRef('currentYearList', result);
      await context.commit('setListRef', result);
    }
  }),
  async updateUserList(context, updatedList: string) {
    await context.commit('updateList', updatedList);
    await context.state.listRef!.update({ list: updatedList });
  }
};
