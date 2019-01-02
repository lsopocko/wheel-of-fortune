import Vue from "vue";
import Vuex from "vuex";
import wheelOfFortuneStore from "./modules/wheelOfFortune";

Vue.use(Vuex);

const store = {
    state: {},
    mutations: {},
    actions: {},
    modules: {
        wheelOfFortuneStore
    }
};

export default new Vuex.Store<any>(store);
