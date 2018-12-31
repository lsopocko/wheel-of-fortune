const state = {
    isSpinning: false,
    isStarted: false
};
const mutations = {
    spin(state: any) {
        state.isSpinning = true;
    },
    stop(state: any) {
        state.isStarted = false;
    },
    start(state: any) {
        state.isStarted = true;
    }
};

const actions = {
    spin(context: any) {
        context.commit("spin");
    },
    stop(context: any) {
        context.commit("stop");
    },
    start(context: any) {
        context.commit("start");
    }
};

export default {
    namespaced: true,
    mutations,
    state,
    actions
};
