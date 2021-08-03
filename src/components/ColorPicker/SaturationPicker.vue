<template>
    <div
        class="point-move-area"
        @mouseleave="stopMoving"
        @mouseup="stopMoving"
        @mousemove="movePoint"
    >
        <canvas
            class="saturation-picker"
            ref="saturationPickerCanvas"
        ></canvas>
        <div
            class="saturation-point"
            :style="{
                marginLeft: `${pointMargin.left}px`,
                marginTop: `${pointMargin.top}px`,
                backgroundColor: pickedColor
            }"
            @mousedown="startMoving"
        ></div>
    </div>
</template>

<script>
import colorConvert from './mixins/colorConvert.js'

export default {
    props: {
        pickedShade: String,
        pickedColor: String,
        baseColor: String,
        updateColor: Boolean
    },
    emits: [
        'pickColor',
        'colorUpdated'
    ],
    mixins: [
        colorConvert
    ],
    data() {
        return {
            pointMargin: {
                left: 0,
                top: 0
            },
            pointMoving: false,
            cursor: {
                x: 0,
                y: 0
            }
        }
    },
    methods: {
        renderGradient(from, to, x, y, width, height, direction) {
            const canvas = this.$refs.saturationPickerCanvas
            const context = canvas.getContext('2d')

            let gradient
            if (direction == "horizontal") {
                gradient = context.createLinearGradient(0, 0, canvas.width, 0)
            } else {
                gradient = context.createLinearGradient(0, 0, 0, canvas.height)
            }

            gradient.addColorStop(0, from)
            gradient.addColorStop(1, to)

            context.fillStyle = gradient
            context.fillRect(x, y, width, height)
        },
        updateCanvas() {
            const canvas = this.$refs.saturationPickerCanvas
            const context = canvas.getContext('2d')

            // prepare the first part of the gradient
            this.renderGradient("#fff", this.pickedShade, 0, 0, canvas.width, 1, "horizontal")

            // prepare the second part of the gradient
            for (let x = 0; x < canvas.width; x++) {
                const [red, green, blue] = context.getImageData(x, 0, 1, 1).data
                const startColor = this.convertRGBToHex(red, green, blue)
                this.renderGradient(startColor, "#000", x, 0, 1, canvas.height, "vertical")
            }
        },
        startMoving() {
            this.pointMoving = true
        },
        stopMoving() {
            this.pointMoving = false
        },
        movePoint(e) {
            if (this.pointMoving) {
                if (this.cursor.x && this.cursor.y) {
                    if (this.cursor.x != e.clientX || this.cursor.y != e.clientY) {
                        const change = {
                            x: e.clientX - this.cursor.x,
                            y: e.clientY - this.cursor.y
                        }

                        const { left, top } = this.pointMargin

                        this.pointMargin = {
                            left: (left + change.x <= this.pickerWidth) && (0 < left + change.x) ? left + change.x : left,
                            top: (top + change.y <= this.pickerHeight) && (0 < top + change.y) ? top + change.y : top
                        }

                        this.$emit('colorUpdated', this.pickedColor)
                    }
                }
                
                this.cursor = {
                    x: e.clientX,
                    y: e.clientY
                }
            }
        },
        updatePoint() {
            const context = this.$refs.saturationPickerCanvas.getContext('2d')
            const [red, green, blue] = context.getImageData(this.pointMargin.left-1, this.pointMargin.top, 1, 1).data

            this.$emit('pickColor', this.convertRGBToHex(red, green, blue))
        }
    },
    mounted() {
        // initialize the canvas
        const canvas = this.$refs.saturationPickerCanvas

        // set canvas dimensions for correct rendering
        canvas.width = canvas.clientWidth
        canvas.height = canvas.clientHeight
        this.updateCanvas()

        if (this.baseColor) {
            const [red, green, blue] = this.convertHexToRGB(this.baseColor)
            const [h, s, v] = this.convertRGBToHSV(red, green, blue)

            // set point position based on saturation and value
            this.pointMargin = {
                left: Math.ceil(s*this.pickerWidth),
                top: Math.ceil(this.pickerHeight - (v*this.pickerHeight))
            }

            // adjust if the generated position is out of range
            Object.keys(this.pointMargin).forEach(side => {
                if (this.pointMargin[side] <= 0) {
                    this.pointMargin[side] += 1
                }

                if (this.pointMargin[side] > side == 'left' ? this.pickerWidth : this.pickerHeight) {
                    this.pointMargin[side] -= 1
                }
            })
        } else {
            this.pointMargin.left = this.pickerWidth
        }
    },
    watch: {
        pickedShade() {
            this.updateCanvas()
        },
        updateColor() {
            this.updatePoint()
            this.$emit('colorUpdated', this.pickedColor)
        },
        pointMargin: {
            handler: function() {
                this.updatePoint()
            },
            deep: true
        }
    },
    computed: {
        pickerWidth() {
            return this.$refs.saturationPickerCanvas.clientWidth
        },
        pickerHeight() {
            return this.$refs.saturationPickerCanvas.clientHeight
        }
    }
}
</script>

<style lang="scss" scoped>
.point-move-area {
    width: 100%;
    height: 100%;
}

.saturation-picker {
    position: relative;
    width: 100%;
    height: 100%;
}

.saturation-point {
    position: absolute;
    width: 30px;
    height: 30px;
    left: -15px;
    top: -15px;
    border-radius: 15px;
    border: 2px solid #fff;
    box-sizing: border-box;
    box-shadow: 2px 2px 32px rgba(0,0,0,0.25);
    transition: transform 0.05s ease;
    cursor: pointer;

    &:active {
        transform: scale(0.95);
    }
}
</style>