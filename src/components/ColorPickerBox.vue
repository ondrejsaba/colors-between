<template>
	<div
		id="color-picker-container"
		class="absolute-center"
		:class="{ dark: darkMode }"
	>
		<color-picker
			:color="colorPickerState.pickedColor"
			@update="updateColor"
		/>
	</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import ColorPicker from './ColorPicker/ColorPicker.vue'

export default {
	components: {
		'color-picker': ColorPicker
	},
	computed: {
		...mapGetters({
			darkMode: 'darkMode',
			colors: 'colorsList',
			colorPickerState: 'colorPicker'
		})
	},
	methods: {
		...mapMutations([
			'setColorAtPosition',
			'generateColorsInbetween'
		]),
		updateColor(color) {
			this.setColorAtPosition({
				position: this.colorPickerState.input == 'first' ? 0 : this.colors.length-1,
				value: color
			}),

			this.generateColorsInbetween()
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../sass/_variables.scss";

#color-picker-container {
	position: relative;
	width: 400px;
	height: 400px;
	background-color: $light;
	border-radius: 6px;
	border: 1px solid darken($light, 10%);
	box-sizing: border-box;

	&.dark {
		background-color: lighten($dark, 15%);
		border: 1px solid lighten($dark, 5%);
	}
}
</style>