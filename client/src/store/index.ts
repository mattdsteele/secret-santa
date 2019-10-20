import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '@/store/types';
import { login } from '@/store/login';
import { list } from './list';
import { photos } from './photos';
import { vuexfireMutations } from 'vuexfire';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0'
  },
  mutations: {
    ...vuexfireMutations
  },
  modules: {
    login,
    list,
    photos
  }
};

export default new Vuex.Store<RootState>(store);
