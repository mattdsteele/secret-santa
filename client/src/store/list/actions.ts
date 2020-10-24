import { db } from '@/store/firestore';
import { ListState } from '@/store/list/types';
import { RootState } from '@/store/types';
import { User } from 'firebase';
import { ActionTree } from 'vuex';
import { firestoreAction } from 'vuexfire';

const currentYear = new Date().getFullYear();

export const actions: ActionTree<ListState, RootState> = {
  init: firestoreAction(async (context, user: User) => {
    console.log('initting', context, user);
    const listCollection = db.collection('list');
    const list = await listCollection
      .where('year', '==', currentYear)
      .where('user', '==', user.uid)
      .get();
    if (list.empty) {
      console.error('Unable to find list, this is bad!');
    } else {
      const result = list.docs[0].ref;
      await context.bindFirestoreRef('currentYearList', result);
      context.commit('setListRef', result);
    }
  }),
  async updateUserList(context, updatedList: string) {
    context.commit('updateList', updatedList);
    await context.state.listRef!.update({ list: updatedList });
  },
};
