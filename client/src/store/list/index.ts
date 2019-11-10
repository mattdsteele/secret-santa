import { Module, GetterTree } from 'vuex';
import { RootState } from '../types';
import { ListState } from './types';
import { actions } from './actions';
import { mutations } from './mutations';

const getters: GetterTree<ListState, RootState> = {
  wishlist: state => {
    return state.currentYearList && state.currentYearList.list;
  }
};
export const list: Module<ListState, RootState> = {
  namespaced: true,
  state: {
    currentYearList: undefined,
    listRef: undefined,
    editMode: true
  },
  actions,
  mutations,
  getters
};
