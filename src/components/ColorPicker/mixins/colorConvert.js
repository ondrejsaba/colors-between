var colorConvert = {
    methods: {
        convertRGBToHex(red, green, blue) {
            let colorParts = [red, green, blue]
            colorParts = colorParts.map(part => part.toString(16)).map(part => {
                if (part.length == 1) {
                    return "0" + part
                } else {
                    return part
                }
            })

            let outputColor = "#"
            colorParts.forEach(part => {
                outputColor = outputColor.concat(part)
            })

            return outputColor
        },
        convertHexToRGB(hex) {
            let colorParts = {}
            if (hex.length == 7) {
                colorParts = {
                    red: parseInt(hex.slice(1, 3), 16),
                    green: parseInt(hex.slice(3, 5), 16),
                    blue: parseInt(hex.slice(5, 7), 16)
                }
            } else if (hex.length == 4) {
               colorParts = {
                    red: parseInt(hex.slice(1, 2), 16),
                    green: parseInt(hex.slice(2, 3), 16),
                    blue: parseInt(hex.slice(3, 4), 16)
                }
            }

            const {red, green, blue} = colorParts
            return [red, green, blue]
        },
        /* thanks to css-tricks.com for this part
        (converting RGB to HSL and vice versa) */
        convertRGBToHSL(red, green, blue) {
            red /= 255
            green /= 255
            blue /= 255

            const colorMin = Math.min(red, green, blue)
            const colorMax = Math.max(red, green, blue)
            const difference = colorMax - colorMin
            let h = 0, s = 0, l = 0

            if (!difference) {
                h = 0
            } else if (colorMax == red) {
                h = ((green - blue) / difference) % 6
            } else if (colorMax == green) {
                h = (blue - red) / difference + 2
            } else {
                h = (red - green) / difference + 4
            }

            h = Math.round(h * 60)
            if (h < 0) {
                h += 360
            }

            l = (colorMax + colorMin) / 2

            s = difference == 0 ? 0 : difference / (1 - Math.abs(2 * l - 1));
            s = +(s * 100).toFixed(1)
            l = +(l * 100).toFixed(1)

            return [h, s, l]
        },
        convertHSLToRGB(h, s, l) {
            s /= 100;
            l /= 100;

            let c = (1 - Math.abs(2 * l - 1)) * s
            let x = c * (1 - Math.abs((h / 60) % 2 - 1))
            let m = l - c/2
            let r = 0, g = 0, b = 0

            if (0 <= h && h < 60) {
                r = c, g = x, b = 0 
            } else if (60 <= h && h < 120) {
                r = x, g = c, b = 0
            } else if (120 <= h && h < 180) {
                r = 0, g = c, b = x
            } else if (180 <= h && h < 240) {
                r = 0, g = x, b = c
            } else if (240 <= h && h < 300) {
                r = x, g = 0, b = c
            } else if (300 <= h && h < 360) {
                r = c, g = 0, b = x
            }

            r = Math.round((r + m) * 255);
            g = Math.round((g + m) * 255);
            b = Math.round((b + m) * 255);

            return [r, g, b]
        },
        // thanks to Kamil Kielczewski from stackoverflow for this one
        convertRGBToHSV(red, green, blue) {
            let v = Math.max(red, green, blue), c = v-Math.min(red, green, blue)
            let h = c && ((v == red) ? (green - blue) / c : ((v == green) ? 2+(blue - red)/c : 4+(red - green)/c))
            return [60*(h < 0 ? h + 6 : h), v&&c / v, v / 255]
        }
    }
}

export default colorConvert