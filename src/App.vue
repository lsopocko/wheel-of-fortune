<template>
    <div id="app">
        <Wheel/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Wheel from "./components/Wheel.vue";

@Component({
    components: {
        Wheel
    }
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
    background: #000;
}
</style>
