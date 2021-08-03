<template>
    <div class="color-picker center">
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

        <div class="color-info-container" v-if="showColorInfo">
            <color-info />
        </div>
    </div>
</template>

<script>
import SaturationPicker from './SaturationPicker.vue'
import ShadePicker from './ShadePicker.vue'
import ColorInfo from './ColorInfo.vue'
import colorConvert from './mixins/colorConvert.js'

export default {
    components: {
        'saturation-picker': SaturationPicker,
        'shade-picker': ShadePicker,
        'color-info': ColorInfo
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
$light-gray: darken(#fff, 10%);

.color-picker {
    position: relative;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    border: 1px solid $light-gray;

    // delete this in the build version
    &.center {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
    }

    @mixin component-container {
        position: relative;
        width: 100%;
        box-sizing: border-box;
    }

    .saturation-picker-container {
        @include component-container();
        height: calc(100% - 60px);
        border-bottom: 1px solid $light-gray;
    }

    .shade-picker-container {
        @include component-container();
        height: 60px;
    }

    .color-info-container {
        @include component-container();
        height: 200px;
        border-top: 1px solid $light-gray;
    }
}
</style>