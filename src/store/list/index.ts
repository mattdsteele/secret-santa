import { Module } from "vuex";
import { RootState } from "../types";
import { ListState } from "./types";
import { actions } from "./actions";
import { mutations } from "./mutations";

export const list: Module<ListState, RootState> = {
  namespaced: true,
  actions,
  mutations
};
