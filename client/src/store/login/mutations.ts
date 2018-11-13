import { LoginState } from "@/store/login/types";
import { MutationTree } from "vuex";
import { firebaseMutations } from "vuexfire";
import { User } from "firebase";

export const mutations: MutationTree<LoginState> = {
  ...firebaseMutations,
  login(state, user: User) {
    console.log('persisting user', user);
    state.user = user;
  },
  logout(state) {
    state.user = undefined;
  },
  userRef(state, userRef: firebase.firestore.DocumentReference) {
    state.userRef = userRef;
  },
  updateUser(state, { email, displayName }) {
    state.user!.email = email;
    state.user!.displayName = displayName;
  }
};
