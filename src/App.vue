<template>
  <main>
    <navbar />

    <!-- Menu -->
    <transition name="fade">
      <screen-darken
        v-if="showMenu"
        @hide="setShowMenu"
      >
        <transition name="slide" appear>
          <sidebar-menu v-if="showMenu" />
        </transition>
      </screen-darken>
    </transition>

    <all-colors />

    <!-- Color picker input -->
    <transition name="fade">
      <screen-darken
        v-if="colorPicker.show" 
        :smallerSize="true"
        @hide="this.setShowColorPicker({
          showInput: ''
        })"
      >
        <transition name="center-zoom" appear>
          <color-picker />
        </transition>
      </screen-darken>
    </transition>

    <!-- Dialog -->
    <transition name="fade">
      <screen-darken
        v-if="dialogState.show"
        :smallerSize="true"
        @hide="setShowDialog"
      >
        <transition name="center-zoom" appear>
          <popup-dialog />
        </transition>
      </screen-darken>
    </transition>

    <color-select-form />
  </main>

  <GlobalEvents
    @keyup.space="tryToShuffleColors"
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
import ColorPickerBox from './components/ColorPickerBox.vue'
import Dialog from './components/Dialog.vue'

export default {
  name: 'App',
  components: {
    'GlobalEvents': GlobalEvents,
    'navbar': Navbar,
    'sidebar-menu': Menu,
    'all-colors': AllColors,
    'color-select-form': ColorSelectionForm,
    'screen-darken': ScreenDarken,
    'color-picker': ColorPickerBox,
    'popup-dialog': Dialog
  },
  methods: {
    ...mapActions([
      'shuffleColors'
    ]),
    ...mapMutations([
      'setShowMenu',
      'setShowColorPicker',
      'setShowDialog'
    ]),
    tryToShuffleColors() {
      if (!this.dialogState.show) {
        this.shuffleColors()
      }
    }
  },
  computed: {
    ...mapGetters([
      'showMenu',
      'colorPicker',
      'dialogState'
    ]),
    canDarken() {
      return this.colorPicker.show || this.dialogState.show
    }

  },
  mounted() {
    this.$store.dispatch('setDefaultColors')

    if (localStorage.options) {
      this.$store.commit('syncOptions')
    } else {
      localStorage.setItem('options', JSON.stringify({
        colorMode: "light",
        language: "en",
        favourites: []
      }))
    }
  }
}
</script>

<style lang="scss">
@import "./sass/_classes.scss";
@import "./sass/_variables.scss";
@import "./sass/_animations.scss";
@import "./sass/_mediaqueries.scss";

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
