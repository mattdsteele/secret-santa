import { ListState } from "@/store/list/types";
import { MutationTree } from "vuex";

export const mutations: MutationTree<ListState> = {
  updateList(state, newList: string) {
    console.log('updating list', state, newList)
    state.currentYearList!.list = newList;
  },
  setListRef(state, listRef: firebase.firestore.DocumentReference) {
    state.listRef = listRef;
  },
  logout(state) {
    state.listRef = undefined;
    state.currentYearList = undefined;
  }
};
