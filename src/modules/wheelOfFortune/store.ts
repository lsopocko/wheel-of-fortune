import Config from "./Config";

const state = {
    isSpinning: false,
    isStarted: false,
    isFinished: false,
    isShowingResults: false,
    tries: 0,
    results: [0, 0, 0, 0, 0],
    reels: []
};
const mutations = {
    SPIN(state: any) {
        state.isSpinning = true;
    },
    start(state: any) {
        state.isStarted = true;
    },
    reset(state: any) {
        state.isStarted = true;
        state.isSpinning = false;
        state.isShowingResults = false;
        state.results = [0, 0, 0, 0, 0];
    },
    showResults(state: any) {
        state.isFinished = true;
        state.isSpinning = false;
        state.isShowingResults = true;
    },
    UPDATE_REELS(state: any, reels: any[]) {
        state.reels = reels;
    },
    UPDATE_RESULTS(state: any, results: any[]) {
        state.results = results;
    },
    INCREMENT_TRIES(state: any) {
        state.tries++;
    }
};

const actions = {
    start(context: any) {
        context.commit("start");
    },
    finish(context: any) {
        context.commit("finish");
    },
    showResults(context: any) {
        context.commit("showResults");
    },
    reset(context: any) {
        context.commit("reset");
    },
    setupSymbolsInReels(context: any) {
        const symbols = ["Fries", "Cake", "Steak", "Broccoli", "Soda"];
        let reels = [];

        for (let reelIndex = 0; reelIndex < Config.reels; reelIndex++) {
            reels.push([
                ...symbols,
                ...symbols,
                ...symbols,
                ...symbols,
                ...symbols,
                ...symbols,
                ...symbols,
                ...symbols
            ]);
        }

        context.commit("UPDATE_REELS", reels);
    },
    drawSymbols(context: any) {
        const getRandomInt = (min: number, max: number): number => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const base = getRandomInt(56, 321);

        const results = [
            base + getRandomInt(0, Config.symbolsPerReel),
            base + getRandomInt(0, Config.symbolsPerReel),
            base + getRandomInt(0, Config.symbolsPerReel),
            base + getRandomInt(0, Config.symbolsPerReel),
            base + getRandomInt(0, Config.symbolsPerReel)
        ];
        context.commit("UPDATE_RESULTS", results);
        context.commit("INCREMENT_TRIES");
        context.commit("SPIN");
    }
};

const getters = {
    drawedSymbols(state: any) {
        const getSymbolFromReel = (
            reel: string[],
            symbolIndex: number
        ): string => {
            return reel[symbolIndex];
        };

        const mapResultToSymbolIndex = (result: number): number => {
            if (result >= 40) {
                if (result % 40) {
                    return 40 - (result % 40);
                } else {
                    return 0;
                }
            } else {
                return 40 - result;
            }
        };

        const results = state.results;

        const reels = state.reels;

        const grid = [];

        let offset = -1;

        for (let i = 0; i < 3; i++) {
            const symbol1 = getSymbolFromReel(
                reels[0],
                mapResultToSymbolIndex(results[0] + offset)
            );

            const symbol2 = getSymbolFromReel(
                reels[1],
                mapResultToSymbolIndex(results[1] + offset)
            );
            const symbol3 = getSymbolFromReel(
                reels[2],
                mapResultToSymbolIndex(results[2] + offset)
            );
            const symbol4 = getSymbolFromReel(
                reels[3],
                mapResultToSymbolIndex(results[3] + offset)
            );
            const symbol5 = getSymbolFromReel(
                reels[4],
                mapResultToSymbolIndex(results[4] + offset)
            );

            grid.push([symbol1, symbol2, symbol3, symbol4, symbol5].reverse());
            offset++;
        }

        return grid;
    }
};

export default {
    namespaced: true,
    mutations,
    state,
    actions,
    getters
};
