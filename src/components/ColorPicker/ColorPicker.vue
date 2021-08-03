<template>
    <div class="color-picker center" :class="{ dark: darkMode }">
        <div class="saturation-picker-container">
            <saturation-picker
                :pickedShade="pickedShade"
                :pickedColor="pickedColor"
                :updateColor="updateColor"
                :baseColor="color"
                @pickColor="changeColor"
                @colorUpdated="colorUpdated"
            />
        </div>

        <div class="shade-picker-container">
            <shade-picker
                :pickedShade="pickedShade"
                :baseShade="baseShade"
                @pickShade="changeShade"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SaturationPicker from './SaturationPicker.vue'
import ShadePicker from './ShadePicker.vue'
import colorConvert from './mixins/colorConvert.js'

export default {
    components: {
        'saturation-picker': SaturationPicker,
        'shade-picker': ShadePicker
    },
    props: {
        'showColorInfo': Boolean,
        'color': String
    },
    emits: [
        'update'
    ],
    mixins: [
        colorConvert
    ],
    data() {
        return {
            pickedShade: "#ff0000",
            pickedColor: "#ff0000",
            baseShade: "",
            updateColor: false
        }
    },
    methods: {
        changeShade(shade) {
            this.pickedShade = shade
            this.updateColor = true
        },
        changeColor(color) {
            this.pickedColor = color
        },
        colorUpdated(color) {
            this.updateColor = false
            this.$emit('update', color)
        }
    },
    computed: {
        ...mapGetters([
            'darkMode'
        ])
    },
    mounted() {
        if (this.color) {
            // convert HEX to RGB then to HSL with saturation 100% and lightness 50%
            const [red, green, blue] = this.convertHexToRGB(this.color)
            let [h, s, l] = this.convertRGBToHSL(red, green, blue)
            s = 100, l = 50

            // convert this modified HSL back to HEX
            const [finalRed, finalGreen, finalBlue] = (this.convertHSLToRGB(h, s, l))
            this.baseShade = this.convertRGBToHex(finalRed, finalGreen, finalBlue)
        }
    }
}
</script>

<style lang="scss">
@import "../../sass/_variables.scss";

.color-picker {
    position: relative;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    border: 1px solid $light-gray;

    &.center {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
    }

    &.dark {
        border: 1px solid lighten($dark, 5%);
    }

    @mixin component-container {
        position: relative;
        width: 100%;
        box-sizing: border-box;
    }

    .saturation-picker-container {
        @include component-container();
        height: calc(100% - 60px);
    }

    .shade-picker-container {
        @include component-container();
        height: 60px;
    }
}
</style>