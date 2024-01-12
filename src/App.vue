<template>
  <Orbiter />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Orbiter from './components/Orbiter.vue';

export default defineComponent({
  name: 'App',
  components: {
    Orbiter,
  },
});
</script>

<style lang="scss">

body {
  padding: 0;
  margin: 0;
}

#app {
  width: 100vw;
  height: 100vh;
  background: #000;
  overflow: hidden;
}

</style>
