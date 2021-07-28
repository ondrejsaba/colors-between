<template>
  <main>
    <all-colors />
    <color-select-form />
  </main>

  <GlobalEvents
    @keyup.space="shuffleColors"
  />
</template>

<script>
import { mapActions } from 'vuex'
import { GlobalEvents } from 'vue-global-events'
import AllColors from './components/AllColors.vue'
import ColorSelectionForm from './components/ColorSelectionForm.vue'

export default {
  name: 'App',
  components: {
    'GlobalEvents': GlobalEvents,
    'all-colors': AllColors,
    'color-select-form': ColorSelectionForm
  },
  methods: {
    ...mapActions([
      'shuffleColors'
    ])
  },
  mounted() {
    this.$store.dispatch('setDefaultColors')
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

::selection {
  background-color: none;
}
</style>
