import { User } from "firebase";

export type SecretSantaUser = Pick<
  User,
  "uid" | "email" | "displayName" | "photoURL"
>;

export interface LoginState {
  user?: SecretSantaUser;
  userRef?: firebase.firestore.DocumentReference;
}
