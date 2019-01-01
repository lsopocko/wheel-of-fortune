import { MutationTree } from "vuex";

export const mutations: MutationTree<WheelOfFortuneState> = {
    SPIN(state: WheelOfFortuneState) {
        state.isSpinning = true;
    },
    START(state: WheelOfFortuneState) {
        state.isStarted = true;
    },
    RESET(state: WheelOfFortuneState) {
        state.isStarted = true;
        state.isSpinning = false;
        state.isShowingResults = false;
        state.results = [0, 0, 0, 0, 0];
    },
    SHOW_RESULTS(state: WheelOfFortuneState) {
        state.isFinished = true;
        state.isSpinning = false;
        state.isShowingResults = true;
    },
    UPDATE_REELS(state: WheelOfFortuneState, reels: TReel[]) {
        state.reels = reels;
    },
    UPDATE_RESULTS(state: WheelOfFortuneState, results: number[]) {
        state.results = results;
    },
    INCREMENT_TRIES(state: WheelOfFortuneState) {
        state.tries++;
    }
};
