<template>
    <div id="favourites-container">
        <div class="favourite-palette-container mt-10">
            <div class="palette"></div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "../sass/_variables.scss";

#favourites-container {
    position: relative;
    width: 100%;
    height: auto;

    .favourite-palette-container {
        position: relative;
        width: calc(100% - 20px);
        height: auto;
        margin-left: 10px;
        box-sizing: border-box;
        border: 1px solid darken($light, 15%);

        .palette {
            width: 100%;
            height: 100px;
        }
    }
}
</style>