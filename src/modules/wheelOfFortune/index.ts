import { Module } from "vuex";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { getters } from "./getters";

const state: WheelOfFortuneState = {
    isSpinning: false,
    isStarted: false,
    isFinished: false,
    isShowingResults: false,
    tries: 0,
    results: [0, 0, 0, 0, 0],
    reels: []
};

const wheelOfFortuneModule: Module<WheelOfFortuneState, {}> = {
    namespaced: true,
    mutations,
    state,
    actions,
    getters
};

export { default as WheelOfFortune } from "./WheelOfFortune";
export default wheelOfFortuneModule;
