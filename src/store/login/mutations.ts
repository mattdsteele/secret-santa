import { LoginState } from "@/store/login/types";
import { MutationTree } from "vuex";
import { firebaseMutations } from 'vuexfire';

export const mutations: MutationTree<LoginState> = {
  ...firebaseMutations,
  login(state, payload: any) {
    state.user = payload.user;
  }
};
