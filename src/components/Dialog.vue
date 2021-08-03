<template>
    <div
        id="dialog"
        class="absolute-center"
        :class="{ dark: darkMode }"
        :style="{
            width: `${dialogState.width}px`,
            height: `${dialogState.height}px`
        }"
    >
        <component :is="dialogState.component"></component>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SavePaletteForm from './SavePaletteForm.vue'

export default {
    components: {
        SavePaletteForm
    },
    computed: {
        ...mapGetters([
            'dialogState',
            'darkMode'
        ])
    }
}
</script>

<style lang="scss" scoped>
@import "../sass/_variables.scss";

#dialog {
    position: relative;
    border-radius: 6px;
    box-sizing: border-box;
    background-color: $light;
    border: 1px solid darken($light, 10%);

    &.dark {
        background-color: lighten($dark, 15%);
        border: 1px solid lighten($dark, 5%);
    }
}
</style>