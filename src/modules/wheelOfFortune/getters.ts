import { mapResultToSymbolIndex, getSymbolFromReel } from "./helpers";
import config from "./config";
import { GetterTree } from "vuex";

export const getters: GetterTree<WheelOfFortuneState, {}> = {
    drawedSymbols(state: WheelOfFortuneState) {
        const grid = [];
        let offset = -1;

        for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
            const symbols = [];
            for (let reelIndex = 0; reelIndex < config.reels; reelIndex++) {
                symbols.push(
                    getSymbolFromReel(
                        state.reels[reelIndex],
                        mapResultToSymbolIndex(
                            state.results[reelIndex] + offset
                        )
                    )
                );
            }

            grid.push(symbols.reverse());
            offset++;
        }

        return grid;
    }
};
