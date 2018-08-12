import { LoginState } from "@/store/login/types";
import { MutationTree } from "vuex";

export const mutations: MutationTree<LoginState> = {
  login(state, payload: any) {
    state.user = payload.user;
  }
};
