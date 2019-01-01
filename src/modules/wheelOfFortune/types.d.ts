type FoodSymbolsList = {
    Fries: any;
    Cake: any;
    Steak: any;
    Broccoli: any;
    Soda: any;
};

type TReel = TFoodSymbol[];

type WheelOfFortuneState = {
    isSpinning: boolean;
    isStarted: boolean;
    isFinished: boolean;
    isShowingResults: boolean;
    tries: number;
    results: number[];
    reels: TReel[];
};

type TFoodSymbol = "Fries" | "Cake" | "Steak" | "Broccoli" | "Soda";
