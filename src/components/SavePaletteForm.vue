<template>
    <div id="save-palette-form-container" :class="{ dark: darkMode }">
        <label>Palette preview</label>
        <div id="palette-preview">
            <div
                v-for="color in colorsList"
                :key="color.id"
                class="palette-preview-color"
                :style="{ backgroundColor: color.hex }"
            ></div>
        </div>

        <label for="paletteName">Palette name</label>
        <input type="text" id="paletteName" spellcheck="false" v-model="paletteName">

        <div id="save-palette-form-btns-container">
            <div
                class="btn"
                :class="{ dark: darkMode }"
                @click="setShowDialog
            ">
                <span class="material-icons">
                    close
                </span>
                Close
            </div>
            <div class="btn primary right">
                Save
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
            'setShowDialog'
        ])
    },
    computed: {
        ...mapGetters([
            'colorsList',
            'darkMode'
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

    #palette-preview {
        display: flex;
        position: relative;
        width: calc(100% - 40px);
        height: 100px;
        border: 1px solid $light-gray;
        border-radius: 6px;
        box-sizing: border-box;
        margin: 10px 0 10px 20px;

        .palette-preview-color {
            flex-basis: 1;
            flex-grow: 1;

            &:first-of-type {
                border-radius: 6px 0 0 6px;
            }

            &:last-of-type {
                border-radius: 0 6px 6px 0;
            }
        }
    }

    label {
        text-transform: uppercase;
        color: $dark-gray;
        font-size: 14px;
        font-weight: 600;
        margin-left: 20px;
    }

    input[type=text] {
        width: calc(100% - 40px);
        height: 40px;
        margin: 10px 0 0 20px;
        box-sizing: border-box;
        border: 1px solid $light-gray;
        border-radius: 6px;
        padding-left: 10px;
        font-size: 22px;
        font-family: 'Inter';
    }

    #save-palette-form-btns-container {
        width: calc(100% - 40px);
        height: 40px;
        margin: 20px 0 0 20px;
    }

    &.dark {
        label {
            color: $light-gray;
        }

        input[type=text] {
            border: 1px solid lighten($dark, 10%);
			background-color: lighten($dark, 20%);
			color: $light;
        }

        #palette-preview {
            border: 1px solid lighten($dark, 10%);
        }
    }
}
</style>