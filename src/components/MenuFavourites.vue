<template>
    <div id="favourites-container">
        <div id="favourites-exist" v-if="favourites.length">
            <div
                class="menu-row-btn"
                v-for="favourite in favourites"
                :key="favourite.name"
            >
                <div class="favourite-copy-container" @click="copyToCurrent(favourite)">
                    <div
                        class="favourite-preview"
                        :style="{ background: gradient(favourite) }"
                    ></div>

                    <div class="favourite-name">
                        {{ favourite.name }}
                    </div>
                </div>

                <div class="selection standalone" @click="removePalette(favourite)">
                    <span class="material-icons">
                        close
                    </span>
                </div>
            </div>
        </div>
        <div id="no-favourites" v-else>
            {{ messages.favourites.noFavourites }}
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
            'setDialog',
            'setDefaultColors',
            'setColorCount'
        ]),
        openSaveDialog() {
            this.setShowMenu()
            this.setDialog({
                show: true,
                width: 400,
                height: 300,
                component: 'SavePaletteForm'
            })
        },
        gradient(palette) {
            const first = palette.colors[0]
            const last = palette.colors[palette.colors.length-1]

            return `linear-gradient(90deg, ${first} 0%, ${last} 100%)`
        },
        copyToCurrent(palette) {
            this.setDefaultColors(palette.colors)
            this.setColorCount({ count: palette.colors.length })
            this.setShowMenu()
        },
        removePalette(palette) {
            this.setShowMenu()
            this.setDialog({
                show: true,
                width: 400,
                height: 220,
                component: 'DeletePalette',
                title: {
                    show: true,
                    message: this.messages.dialog.deletePalette
                },
                data: palette
            })
        }
    },
    computed: {
        ...mapGetters([
            'messages',
            'favourites'
        ])
    }
}
</script>

<style lang="scss" scoped>
@import "../sass/_variables.scss";

#favourites-container {
    position: relative;
    width: 100%;
    height: calc(100% - 120px);
    overflow-y: auto;

    .favourite-copy-container {
        position: absolute;
        width: calc(100% - 60px);
        height: 100%;
        left: 0;

        .favourite-preview {
            position: absolute;
            width: 34px;
            height: 34px;
            left: 8px;
            top: 8px;
            border-radius: 4px;
            box-sizing: border-box;
            border: 1px solid darken($light, 10%);
        }

        .favourite-name {
            position: absolute;
            left: 50px;
            padding-left: 10px;
            line-height: 50px;
        }
    }

    #no-favourites {
        padding: 20px;
        font-size: 16px;
        text-align: center;
    }
}

#menu.dark {
    #favourites-container {
        .favourite-preview {
            border: 1px solid $dark;
        }
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