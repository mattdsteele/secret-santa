import { RootState } from "@/store/types";
import { ActionTree, Module, MutationTree } from "vuex";
import { storage } from "../firestore";

export interface PhotosState {
  photoUrl?: string;
}

const photoRefs = [
  "img/IMG_20171225_105849.jpg",
  "img/IMG_20171225_112618.jpg",
  "img/IMG_20171225_112649.jpg",
  "img/IMG_3901.jpg",
  "img/IMG_3904.jpg",
  "img/IMG_3905.jpg"
];

const actions: ActionTree<PhotosState, RootState> = {
  async init(ctxt) {
    const photo = photoRefs[Math.floor(Math.random() * photoRefs.length)];
    const url = await storage.ref(photo).getDownloadURL();
    ctxt.commit("ref", url);
  }
};
const mutations: MutationTree<PhotosState> = {
  ref(store, url: string) {
    store.photoUrl = url;
  }
};
export const photos: Module<PhotosState, RootState> = {
  namespaced: true,
  state: {
    photoUrl: undefined
  },
  actions,
  mutations
};
