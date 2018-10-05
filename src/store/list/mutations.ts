import { ListState } from '@/store/list/types';
import { MutationTree } from "vuex";

export const mutations: MutationTree<ListState> = {
  updateList(state, newList: string) {
    state.currentYearList!.list = newList;
  },
  setListRef(state, listRef: firebase.firestore.DocumentReference) {
    state.listRef = listRef;
  }
};
