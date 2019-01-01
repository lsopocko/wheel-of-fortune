<template>
    <div id="app">
        <GameView
            :is-started="isStarted"
            :is-spinning="isSpinning"
            :is-showing-results="isShowingResults"
            :results="results"
        />
        <UI v-bind="{ draw, start, quit, drawAgain }"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GameView from "./components/GameView.vue";
import UI from "./components/UI.vue";

@Component({
    components: {
        GameView,
        UI
    }
})
export default class App extends Vue {
    public constructor() {
        super();
        this.$store.dispatch("WheelOfFortuneStore/setupSymbolsInReels");
    }

    draw() {
        this.$store.dispatch("WheelOfFortuneStore/drawSymbols");
    }

    drawAgain() {
        this.$store.dispatch("WheelOfFortuneStore/reset");
        this.$store.dispatch("WheelOfFortuneStore/drawSymbols");
    }

    start() {
        this.$store.dispatch("WheelOfFortuneStore/start");
    }

    quit() {
        this.$store.dispatch("WheelOfFortuneStore/quit");
        window.location.href = "https://www.casumo.com/";
    }

    get isStarted() {
        return this.$store.state.WheelOfFortuneStore.isStarted;
    }

    get isSpinning() {
        return this.$store.state.WheelOfFortuneStore.isSpinning;
    }

    get isShowingResults() {
        return this.$store.state.WheelOfFortuneStore.isShowingResults;
    }

    get results() {
        return this.$store.state.WheelOfFortuneStore.results;
    }
}
</script>

<style lang="scss">
body {
    background: #000;
    padding: 0;
    margin: 0;
}

#app {
    position: relative;
    display: flex;
    justify-content: space-around;
}
</style>
