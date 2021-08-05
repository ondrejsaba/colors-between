<template>
    <div id="save-palette-form-container" :class="{ dark: darkMode }">
        <label>{{ messages.dialog.palettePreview }}</label>
        <div id="palette-preview">
            <div
                v-for="color in colorsList"
                :key="color.id"
                class="palette-preview-color"
                :style="{ backgroundColor: color.hex }"
            ></div>
        </div>

        <label for="paletteName">{{ messages.dialog.paletteName }}</label>
        <input
            type="text"
            id="paletteName"
            spellcheck="false"
            v-model="paletteName"
            @keydown.enter="savePalette"
        >

        <div id="dialog-form-btns-container">
            <div
                class="btn"
                :class="{ dark: darkMode }"
                @click="setShowDialog"
            >
                <span class="material-icons">
                    close
                </span>
                {{ messages.dialog.cancel }}
            </div>
            <div
                class="btn primary right"
                @click="savePalette"
            >
                {{ messages.dialog.save }}
                <span class="material-icons">
                    bookmark
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    data() {
        return {
            paletteName: ""
        }
    },
    methods: {
        ...mapMutations([
            'setShowDialog',
            'setDialog'
        ]),
        savePalette() {
            if (this.paletteName.length) {
                this.$store.commit('savePalette', {name: this.paletteName})

                if (!this.dialogState.error) {
                    setTimeout(() => {
                        this.setDialog({
                            show: true,
                            width: 350,
                            height: 100,
                            component: "MessageDialog",
                            data: {
                                message: "Palette saved!",
                                icon: "check"
                            }
                        })
                    }, 100)
                } else {
                    this.setDialog({
                        title: {
                            show: true,
					        message: this.messages.dialog.errors.exists
                        },
                        error: true
                    })
                }
            } else {
                this.setDialog({
                    title: {
                        show: true,
                        message: this.messages.dialog.errors.name
                    },
                    error: true
                })
            }
        }
    },
    computed: {
        ...mapGetters([
            'colorsList',
            'darkMode',
            'messages',
            'dialogState'
        ])
    }
}
</script>

<style lang="scss" scoped>
@import "../sass/_variables.scss";

#save-palette-form-container {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 10px;
}
</style>