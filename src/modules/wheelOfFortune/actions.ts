import config from "./config";
import { ActionTree, ActionContext } from "vuex";

export const actions: ActionTree<WheelOfFortuneState, {}> = {
    start(context: ActionContext<WheelOfFortuneState, {}>) {
        context.commit("START");
    },
    showResults(context: ActionContext<WheelOfFortuneState, {}>) {
        context.commit("SHOW_RESULTS");
    },
    reset(context: ActionContext<WheelOfFortuneState, {}>) {
        context.commit("RESET");
    },

    /**
     * Puts symbols into arrays representing reels.
     * @param  {ActionContext<WheelOfFortuneState, {}>} context
     *
     * @note This is just for demo purpose, normaly it would be downloaded from backend.
     */
    setupSymbolsInReels(context: ActionContext<WheelOfFortuneState, {}>) {
        const symbols: TFoodSymbol[] = [
            "Fries",
            "Cake",
            "Steak",
            "Broccoli",
            "Soda"
        ];

        let reels = [];

        // @TODO should take it from config

        for (let reelIndex = 0; reelIndex < config.reels; reelIndex++) {
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

    /**
     * Picks random number of steps per reel.
     * @param  {ActionContext<WheelOfFortuneState, {}>} context
     *
     * @note This is just for demo purpose, normaly it would be downloaded from backend.
     */
    drawSymbols(context: ActionContext<WheelOfFortuneState, {}>) {
        const getRandomInt = (min: number, max: number): number => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        const base = getRandomInt(56, 321);

        const results = [
            base + getRandomInt(0, config.symbolsPerReel),
            base + getRandomInt(0, config.symbolsPerReel),
            base + getRandomInt(0, config.symbolsPerReel),
            base + getRandomInt(0, config.symbolsPerReel),
            base + getRandomInt(0, config.symbolsPerReel)
        ];
        context.commit("UPDATE_RESULTS", results);
        context.commit("INCREMENT_TRIES");
        context.commit("SPIN");
    }
};
