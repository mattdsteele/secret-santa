import { User } from "firebase";
import Vue from "vue";
import Vuex, { ActionContext } from "vuex";

Vue.use(Vuex);
export interface IState {
  user?: User;
}
const initialState: IState = {};

const actions = {
  login: (context: ActionContext<IState, any>, payload: User) =>
    context.commit("login", payload)
};
const mutations = {
  login(newState: IState, payload: User) {
    newState.user = payload;
  }
};

export const store = new Vuex.Store({
  state: initialState,
  actions,
  mutations
});
