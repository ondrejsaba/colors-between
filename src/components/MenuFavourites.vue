<template>
    <div id="favourites-container">
        <div class="menu-row-btn">
            
        </div>
    </div>

    <div id="favourites-btns-container">
        <div class="btn primary center" @click="openSaveDialog">
            {{ messages.menu.savePalette }}
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    methods: {
        ...mapMutations([
            'setShowMenu',
            'setDialog'
        ]),
        openSaveDialog() {
            this.setShowMenu()
            this.setDialog({
                show: true,
                width: 400,
                height: 300,
                component: 'SavePaletteForm'
            })
        }
    },
    computed: {
        ...mapGetters([
            'messages'
        ])
    }
}
</script>

<style lang="scss">
@import "../sass/_variables.scss";

#favourites-container {
    position: relative;
    width: 100%;
    height: calc(100% - 120px);

    .favourite-palette-container {
        position: relative;
    }
}

#favourites-btns-container {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;

    .btn {
        &.center {
            display: block;
            margin: 10px auto;
        }
    }
}
</style>