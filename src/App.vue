<template>
  <main>
    <all-colors />
    <color-select-form />
  </main>
</template>

<script>
import AllColors from './components/AllColors.vue'
import ColorSelectionForm from './components/ColorSelectionForm.vue'

export default {
  name: 'App',
  components: {
    'all-colors': AllColors,
    'color-select-form': ColorSelectionForm
  },
  methods: {
    generateColor() {
      const hexKeys = [...Array(10).keys(), "A", "B", "C", "D", "E", "F"]

      return '#' + [...Array(6).keys()].map(() => hexKeys[Math.floor(Math.random() * hexKeys.length)]).join("")
    }
  },
  mounted() {
    this.$store.commit('setDefaultColors', [this.generateColor(), this.generateColor()])
    this.$store.commit('generateColorsInbetween')
  }
}
</script>

<style lang="scss">
@import "./sass/_classes.scss";
@import "./sass/_variables.scss";

#app {
  font-family: Inter, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  background-color: $light;
}
</style>
