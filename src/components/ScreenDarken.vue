<template>
	<div
		class="darken"
		:class="{ smaller: smallerSize }"
		@click.self="emitClick"
	>
		<slot></slot>
	</div>
</template>

<script>
export default {
	props: {
		smallerSize: Boolean
	},
	methods: {
		emitClick() {
			this.$emit('hide')
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../sass/_variables.scss";

.darken {
	position: absolute;
	left: 0;
	top: 50px;
	width: 100vw;
	height: calc(100vh - 50px);
	background-color: rgba($dark, 0.6);
	z-index: 100;

	&.smaller {
		height: calc(100vh - 210px);
	}
}
</style>