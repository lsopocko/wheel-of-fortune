<template>
    <div id="app">
        <Screen :is-started="isStarted"/>
        <UI/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Screen from "./components/Screen.vue";
import UI from "./components/UI.vue";

@Component({
    components: {
        Screen,
        UI
    }
})
export default class App extends Vue {
    get isStarted() {
        return this.$store.state.WheelOfFortuneStore.isStarted;
    }
}
</script>

<style lang="scss">
body {
    background: #fff;
}
</style>
