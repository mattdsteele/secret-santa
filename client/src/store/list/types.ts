export interface ListState {
  currentYearList?: {
    year: number;
    user: string;
    list: string;
  },
  listRef?: firebase.firestore.DocumentReference
}
