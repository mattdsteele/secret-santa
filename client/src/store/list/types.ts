export interface ListState {
  currentYearList?: {
    year: number;
    user: string;
    list: string;
  };
  editMode: boolean;
  listRef?: firebase.firestore.DocumentReference;
}
