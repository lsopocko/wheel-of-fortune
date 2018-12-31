<template>
    <div id="app">
        <GameView :is-started="isStarted" :is-spinning="isSpinning"/>
        <UI/>
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
    get isStarted() {
        return this.$store.state.WheelOfFortuneStore.isStarted;
    }
    get isSpinning() {
        return this.$store.state.WheelOfFortuneStore.isSpinning;
    }
}
</script>

<style lang="scss">
body {
    background: #fff;
    padding: 0;
    margin: 0;
}
</style>
