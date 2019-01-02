import config from "./config";

export const getSymbolFromReel = (
    reel: string[],
    symbolIndex: number
): string => {
    return reel[symbolIndex];
};

export const getRandomInt = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Maps number of steps by which reel is rotated to symbol index in array of symbols in reel.
 * Reels are spinning clockwise so we have to substract steps from number of symbols in reel and use result as index.
 *
 * @param  {number} steps
 * @returns number
 */
export const mapStepsToSymbolIndex = (steps: number): number => {
    if (steps >= config.symbolsPerReel) {
        if (steps % config.symbolsPerReel) {
            return config.symbolsPerReel - (steps % config.symbolsPerReel);
        } else {
            return 0;
        }
    } else {
        return config.symbolsPerReel - steps;
    }
};
