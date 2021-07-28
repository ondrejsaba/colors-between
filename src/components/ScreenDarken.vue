<template>
	<div id="darken" @click.self="emitClick">
		<slot></slot>
	</div>
</template>

<script>
export default {
	methods: {
		emitClick() {
			this.$emit('hide')
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../sass/_variables.scss";

#darken {
	position: absolute;
	left: 0;
	top: 50px;
	width: 100vw;
	height: calc(100vh - 50px);
	background-color: rgba($dark, 0.5);
	z-index: 100;
}
</style>