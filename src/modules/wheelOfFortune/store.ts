const state = {
    isSpinning: false
};
const mutations = {
    spin(state: any) {
        state.isSpinning = true;
    },
    stop(state: any) {
        state.isSpinning = false;
    }
};

const actions = {
    spin(context: any) {
        context.commit("spin");
    },
    stop(context: any) {
        context.commit("stop");
    }
};

export default {
    namespaced: true,
    mutations,
    state,
    actions
};
