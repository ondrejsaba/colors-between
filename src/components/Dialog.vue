<template>
    <div
        id="dialog"
        class="absolute-center"
        :class="{ dark: darkMode }"
        :style="{
            width: `${dialogState.width}px`,
            height: `${calculatedHeight}px`
        }"
    >
        <div id="dialog-title" v-if="dialogState.title.show">
            <span
                class="material-icons"
                v-if="dialogState.error"
            >
                warning
            </span>
            {{ dialogState.title.message }}
        </div>

        <component :is="dialogState.component"></component>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import SavePaletteForm from './SavePaletteForm.vue'
import DeletePalette from './DeletePalette.vue'
import MessageDialog from './MessageDialog.vue'

export default {
    components: {
        SavePaletteForm,
        DeletePalette,
        MessageDialog
    },
    methods: {
        ...mapMutations([
            'setDialog'
        ])
    },
    computed: {
        ...mapGetters([
            'dialogState',
            'darkMode'
        ]),
        calculatedHeight() {
            return this.dialogState.title.show ?
                this.dialogState.height + 40 : this.dialogState.height
        }
    }
}
</script>

<style lang="scss">
@import "../sass/_variables.scss";

#dialog {
    position: relative;
    border-radius: 6px;
    box-sizing: border-box;
    background-color: $light;
    border: 1px solid darken($light, 10%);

    #dialog-title {
        width: 100%;
        height: 40px;
        background-color: darken($light, 15%);
        color: $dark-gray;
        border-bottom: 1px solid darken($light, 10%);
        border-radius: 6px 6px 0 0;
        text-align: center;
        font-size: 18px;
        line-height: 40px;

        span.material-icons {
            vertical-align: top;
            line-height: 40px;
            padding-right: 5px;
        }
    }

    #save-palette-form-container, #delete-palette-container {
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

        #dialog-form-btns-container {
            width: calc(100% - 40px);
            height: 40px;
            margin: 20px 0 0 20px;
        }
    }

    &.dark {
        background-color: lighten($dark, 15%);
        border: 1px solid lighten($dark, 5%);

        #dialog-title {
            background-color: $dark-gray;
            color: $light;
            border-bottom: 1px solid lighten($dark, 5%);
        }

        #save-palette-form-container, #delete-palette-container {
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
}
</style>