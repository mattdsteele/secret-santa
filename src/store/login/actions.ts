import { ActionTree } from "vuex";
import { LoginState } from "@/store/login/types";
import { RootState } from "@/store/types";
import { User } from "firebase";
import { firebaseAction } from "vuexfire";
import { db } from "@/store-old/firestore";

export const actions: ActionTree<LoginState, RootState> = {
  async doLogin(context, user: User) {
    context.commit("login", { user });
  },
  getTestData: firebaseAction((ctx: any) => {
    return ctx.bindFirebaseRef("testData", db.collection("test-data"));
  })
};
