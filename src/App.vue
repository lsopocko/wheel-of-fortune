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
        this.$store.dispatch("wheelOfFortuneStore/setupSymbolsInReels");
    }

    draw() {
        this.$store.dispatch("wheelOfFortuneStore/drawSymbols");
    }

    drawAgain() {
        this.$store.dispatch("wheelOfFortuneStore/reset");
        this.$store.dispatch("wheelOfFortuneStore/drawSymbols");
    }

    start() {
        this.$store.dispatch("wheelOfFortuneStore/start");
    }

    quit() {
        this.$store.dispatch("wheelOfFortuneStore/quit");
        window.location.href = "https://www.casumo.com/";
    }

    get isStarted() {
        return this.$store.state.wheelOfFortuneStore.isStarted;
    }

    get isSpinning() {
        return this.$store.state.wheelOfFortuneStore.isSpinning;
    }

    get isShowingResults() {
        return this.$store.state.wheelOfFortuneStore.isShowingResults;
    }

    get results() {
        return this.$store.state.wheelOfFortuneStore.results;
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
