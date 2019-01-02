import config from "./config";
import { ActionTree, ActionContext } from "vuex";
import { getRandomInt } from "./helpers";

export const actions: ActionTree<WheelOfFortuneState, {}> = {
    start(context: ActionContext<WheelOfFortuneState, {}>): void {
        context.commit("START");
    },
    showResults(context: ActionContext<WheelOfFortuneState, {}>): void {
        context.commit("SHOW_RESULTS");
    },
    reset(context: ActionContext<WheelOfFortuneState, {}>): void {
        context.commit("RESET");
    },

    /**
     * Puts symbols into arrays representing reels.
     * @param  {ActionContext<WheelOfFortuneState, {}>} context
     *
     * @note This is just for demo purpose, normaly backend would randomize symbol positions in reels.
     */
    setupSymbolsInReels(context: ActionContext<WheelOfFortuneState, {}>): void {
        const symbols: TFoodSymbol[] = [
            "Fries",
            "Cake",
            "Steak",
            "Broccoli",
            "Soda"
        ];

        let reels = [];

        for (let reelIndex = 0; reelIndex < config.reels; reelIndex++) {
            let symbolsForReel = [];
            let symbolIndex = 0;

            for (let i = 0; i < config.symbolsPerReel; i++) {
                symbolsForReel.push(symbols[symbolIndex]);

                if (symbolIndex < symbols.length - 1) {
                    symbolIndex++;
                } else {
                    symbolIndex = 0;
                }
            }

            reels.push(symbolsForReel);
        }

        context.commit("UPDATE_REELS", reels);
    },

    /**
     * Picks random number of steps per reel.
     * @param  {ActionContext<WheelOfFortuneState, {}>} context
     *
     * @note This is just for demo purpose, normaly it would be downloaded from backend.
     */
    drawSymbols(context: ActionContext<WheelOfFortuneState, {}>): void {
        const baseStepsCount = getRandomInt(config.stepsMin, config.stepsMax);

        const stepsPerReel = [
            baseStepsCount + getRandomInt(0, config.symbolsPerReel),
            baseStepsCount + getRandomInt(0, config.symbolsPerReel),
            baseStepsCount + getRandomInt(0, config.symbolsPerReel),
            baseStepsCount + getRandomInt(0, config.symbolsPerReel),
            baseStepsCount + getRandomInt(0, config.symbolsPerReel)
        ];

        context.commit("UPDATE_RESULTS", stepsPerReel);
        context.commit("INCREMENT_TRIES");
        context.commit("SPIN");
    }
};
