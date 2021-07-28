<template>
	<div
		class="color-column"
		:style="{ backgroundColor: colorData.hex }"
	>
		<div class="data-container">
			<h1>{{ colorData.hex }}</h1>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		'color-data': Object
	}
}
</script>

<style lang="scss" scoped>
@import "../sass/_variables.scss";

.color-column {
	position: relative;
	flex-basis: 1;
	flex-grow: 1;
	height: 100%;
	transition: all 0.1s ease;

	.data-container {
		position: absolute;
		width: 100%;
		height: fit-content;
		left: 0;
		bottom: 20px;
		text-align: center;
		color: $light;
	}
}
</style>