import Vue from "vue";
import Vuex from "vuex";
import WheelOfFortuneStore from "./modules/wheelOfFortune";

Vue.use(Vuex);

const store = {
    state: {},
    mutations: {},
    actions: {},
    modules: {
        WheelOfFortuneStore
    }
};

export default new Vuex.Store<any>(store);
