import { ActionTree } from "vuex";
import { LoginState } from "@/store/login/types";
import { RootState } from "@/store/types";
import { User } from "firebase";
import { firebaseAction } from "vuexfire";
import { db } from "@/store/firestore";

export const actions: ActionTree<LoginState, RootState> = {
  async doLogin(context, user: User) {
    context.commit("login", { user });
    await context.dispatch("saveUser", user);
  },
  async saveUser(context, user: User) {
    const users = db.collection("users");
    const existingUser = await users.where("uid", "==", user.uid).get();
    if (existingUser.empty) {
      const { email, uid } = user;
      await users.add({ email, uid });
    }
  },
  getTestData: firebaseAction((ctx: any) => {
    return ctx.bindFirebaseRef("testData", db.collection("test-data"));
  })
};
