import { Module, GetterTree } from "vuex";
import { RootState } from "../types";
import { LoginState } from "./types";
import { actions } from "./actions";
import { mutations } from "./mutations";

const getters: GetterTree<LoginState, RootState> = {
  email: state => state.user && state.user.email,
  name: state => state.user && state.user.displayName
};
export const login: Module<LoginState, RootState> = {
  namespaced: true,
  state: {
    user: undefined
  },
  getters,
  actions,
  mutations
};
