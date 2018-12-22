<template>
    <div id="app">
        <Screen/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Screen from "./components/Screen.vue";

@Component({
    components: {
        Screen
    }
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
    background: #fff;
}
</style>
