import { User } from "firebase";

export interface LoginState {
  user?: User;
  testData: Array<{ datum: string }>;
}
