import { ActionTree } from "vuex";
import { LoginState, SecretSantaUser } from "@/store/login/types";
import { RootState } from "@/store/types";
import { User } from "firebase";
import { db } from "@/store/firestore";

export const actions: ActionTree<LoginState, RootState> = {
  async doLogin(context, user: User) {
    const { newUser, userInfo } = await context.dispatch("saveUser", user);
    context.commit("login", userInfo);
    return { newUser };
  },
  async saveUser(context, user: User) {
    const users = db.collection("users");
    const existingUser = await users.where("uid", "==", user.uid).get();
    let userInfo: SecretSantaUser;
    if (existingUser.empty) {
      const { photoURL, displayName, email, uid } = user;
      userInfo = { photoURL, displayName, email, uid };
      const newUser = await users.add(userInfo);
      context.commit("userRef", newUser);
      return { newUser: true, userInfo };
    }
    const elRef = existingUser.docs[0].ref;
    context.commit("userRef", elRef);
    const el = await elRef.get();
    userInfo = (await elRef.get()).data() as any;
    return { newUser: false, userInfo };
  },
  async updateUser(context, { email, displayName }) {
    await context.state.userRef!.update({ email, displayName });
    context.commit("updateUser", { email, displayName });
  }
};
