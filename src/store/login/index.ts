import { Module } from "vuex";
import { RootState } from "../types";
import { LoginState } from "./types";
import { actions } from "./actions";
import { mutations } from "./mutations";

export const login: Module<LoginState, RootState> = {
  namespaced: true,
  state: {
    user: undefined,
    testData: []
  },
  actions,
  mutations
};
