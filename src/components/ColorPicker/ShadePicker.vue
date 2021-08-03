<template>
    <div
        class="shade-picker"
        @mouseup="sliderStopMoving"
        @mouseleave="sliderStopMoving"
        @mousemove="moveSlider"
    >
        <canvas class="shade-picker-canvas" ref="shadePickerCanvas"></canvas>
        <div
            class="shade-slider"
            :style="{
                backgroundColor: pickedShade,
                marginLeft: `${sliderMarginLeft}px`
            }"
            @mousedown="sliderStartMoving"
            ref="shadeSlider"
        ></div>
    </div>
</template>

<script>
import colorConvert from './mixins/colorConvert.js'

export default {
    props: {
        pickedShade: String,
        baseShade: String
    },
    emits: [
        'pickShade'
    ],
    mixins: [
        colorConvert
    ],
    data() {
        return {
            sliderMoving: false,
            cursorX: 0,
            sliderMarginLeft: 0
        }
    },
    methods: {
        sliderStartMoving() {
            this.sliderMoving = true
        },
        sliderStopMoving() {
            this.sliderMoving = false
        },
        moveSlider(e) {
            if (this.sliderMoving) {
                if (this.cursorX && e.clientX != this.cursorX) {
                    const change = e.clientX - this.cursorX
                    this.sliderMarginLeft += change

                    if (this.sliderMarginLeft < 0) {
                        this.sliderMarginLeft = 0 
                    } else if (this.sliderMarginLeft > this.$refs.shadePickerCanvas.clientWidth-1) {
                        this.sliderMarginLeft = this.$refs.shadePickerCanvas.clientWidth-1
                    }

                    const context = this.$refs.shadePickerCanvas.getContext('2d')
                    const [red, green, blue] = context.getImageData(this.sliderMarginLeft, 0, 1, 1).data
                    
                    this.$emit('pickShade', this.convertRGBToHex(red, green, blue))
                }

                this.cursorX = e.clientX
            }
        }
    },
    mounted() {
        // initialize canvas
        const canvas = this.$refs.shadePickerCanvas
        const context = canvas.getContext('2d')

        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight

        // initialize colors
        const gradientStops = {
            'red': "#ff0000",
            'yellow': "#ffff00",
            'green': "#00ff00",
            'cyan': "#00ffff",
            'blue': "#0000ff",
            'magenta': "#ff00ff",
            'endRed': "#ff0000" 
        }

        const totalGradientStops = Object.keys(gradientStops).length

        // initialize gradient
        const gradient = context.createLinearGradient(0, 0, canvas.width, 0)

        const distance = 1 / (totalGradientStops-1)
        for (let colorPosition = 0; colorPosition < totalGradientStops; colorPosition++) {
            gradient.addColorStop(distance * colorPosition, gradientStops[Object.keys(gradientStops)[colorPosition]])
        }

        context.fillStyle = gradient
        context.fillRect(0, 0, canvas.width, canvas.height)
    },
    watch: {
        baseShade() {
            // get the hue of the base shade
            const [red, green, blue] = this.convertHexToRGB(this.baseShade)
            const h = this.convertRGBToHSL(red, green, blue)[0]

            // set the position and color
            const sliderPosition = Math.round(this.$refs.shadePickerCanvas.clientWidth*(h/360))
            this.sliderMarginLeft = sliderPosition
            this.$emit('pickShade', this.baseShade)
        }
    }
}
</script>

<style lang="scss" scoped>
.shade-picker {
    position: absolute;
    width: 100%;
    height: 100%;

    .shade-picker-canvas {
        position: absolute;
        width: calc(100% - 40px);
        height: 10px;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        border-radius: 5px;
    }

    .shade-slider {
        position: absolute;
        width: 20px;
        height: 20px;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 10px;
        border: 2px solid #fff;
        box-sizing: border-box;
        cursor: pointer;
    }
}
</style>