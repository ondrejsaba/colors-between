<template>
    <div id="delete-palette-container">
        <label>{{ dialogState.data.name }}</label>
        <div id="palette-preview">
            <div
                v-for="color in dialogState.data.colors"
                :key="color"
                class="palette-preview-color"
                :style="{ backgroundColor: color }"
            ></div>
        </div>

        <div id="dialog-form-btns-container">
            <div
                class="btn"
                :class="{ dark: darkMode }"
                @click="setShowDialog"
            >
                <span class="material-icons">
                    close
                </span>
                {{ messages.dialog.close }}
            </div>

            <div
                class="btn red right"
                @click="deletePalette"
            >
                {{ messages.dialog.delete }}
                <span class="material-icons">
                    delete
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    methods: {
        ...mapMutations([
            'setShowDialog'
        ]),
        deletePalette() {
            this.$store.commit('deletePalette', { name: this.dialogState.data.name })
            this.setShowDialog()
        }
    },
    computed: {
        ...mapGetters([
            'dialogState',
            'darkMode',
            'messages'
        ])
    }
}
</script>

<style lang="scss" scoped>
#delete-palette-container {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 10px;
}
</style>