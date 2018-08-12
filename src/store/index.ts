import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "@/store/types";
import { login } from "@/store/login";
import { firebaseMutations } from "vuexfire";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: "1.0"
  },
  mutations: {
    ...firebaseMutations
  },
  modules: {
    login
  }
};

export default new Vuex.Store<RootState>(store);
