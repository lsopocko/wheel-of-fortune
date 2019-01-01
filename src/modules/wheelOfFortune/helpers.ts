import config from "./config";

export const getSymbolFromReel = (
    reel: string[],
    symbolIndex: number
): string => {
    return reel[symbolIndex];
};

export const mapResultToSymbolIndex = (result: number): number => {
    if (result >= config.symbolsPerReel) {
        if (result % config.symbolsPerReel) {
            return config.symbolsPerReel - (result % config.symbolsPerReel);
        } else {
            return 0;
        }
    } else {
        return config.symbolsPerReel - result;
    }
};
