<template>
  <main>
    <navbar />
    <transition-group name="fade">
      <screen-darken v-if="showMenu" @hide="setShowMenu">
        <transition name="slide" appear>
          <sidebar-menu />
        </transition>
      </screen-darken>
    </transition-group>

    <all-colors />
    <color-select-form />
  </main>

  <GlobalEvents
    @keyup.space="shuffleColors"
  />
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import { GlobalEvents } from 'vue-global-events'
import Navbar from './components/Navbar.vue'
import Menu from './components/Menu.vue'
import AllColors from './components/AllColors.vue'
import ColorSelectionForm from './components/ColorSelectionForm.vue'
import ScreenDarken from './components/ScreenDarken.vue'

export default {
  name: 'App',
  components: {
    'GlobalEvents': GlobalEvents,
    'navbar': Navbar,
    'sidebar-menu': Menu,
    'all-colors': AllColors,
    'color-select-form': ColorSelectionForm,
    'screen-darken': ScreenDarken
  },
  methods: {
    ...mapActions([
      'shuffleColors'
    ]),
    ...mapMutations([
      'setShowMenu'
    ])
  },
  computed: {
    ...mapGetters([
      'showMenu'
    ])
  },
  mounted() {
    this.$store.dispatch('setDefaultColors')

    if (localStorage.options) {
      this.$store.commit('syncOptions')
    } else {
      localStorage.setItem('options', JSON.stringify({
        colorMode: "light",
        language: "en"
      }))
    }
  }
}
</script>

<style lang="scss">
@import "./sass/_classes.scss";
@import "./sass/_variables.scss";
@import "./sass/_animations.scss";

#app {
  font-family: Inter, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  position: relative;
}

body {
  margin: 0;
  background-color: $light;
  user-select: none;
}
</style>
