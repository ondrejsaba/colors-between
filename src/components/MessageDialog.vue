<template>
    <div
        id="message-dialog-container"
        :style="{ lineHeight: `${dialogState.height}px` }"
        :class="{ dark: darkMode }"
    >
        {{ dialogState.data.message }}
        <span class="material-icons" v-if="dialogState.data.icon">
            {{ dialogState.data.icon }}
        </span>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    methods: {
        ...mapMutations([
            'setShowDialog'
        ])
    },
    computed: {
        ...mapGetters([
            'dialogState',
            'darkMode'
        ])
    },
    mounted() {
        setTimeout(() => {
            if (this.dialogState.show) {
                this.setShowDialog()
            }
        }, 1000)
    }
}
</script>

<style lang="scss">
@import "../sass/_variables.scss";

#message-dialog-container {
    position: relative;
    width: 100%;
    height: 100%;
    font-size: 36px;
    text-align: center;
    color: $dark-gray;

    span.material-icons {
        padding-left: 10px;
        font-size: 36px !important;
    }

    &.dark {
        color: $light;
    }
}
</style>