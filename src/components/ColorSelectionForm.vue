<template>
	<section id="color-selection-form" v-if="firstColor && lastColor">
		<div id="colors-form" class="center-container h-80">
			<div class="input-wrapper">
				<input type="text" :value="firstColor.hex">
				<div
					class="color-preview"
					:style="{ backgroundColor: firstColor.hex }"
				>
				</div>
			</div>

			<div class="input-wrapper">
				<input type="text" :value="lastColor.hex">
				<div
					class="color-preview"
					:style="{ backgroundColor: lastColor.hex }"
				>
				</div>
			</div>
		</div>

		<div id="color-count-form" class="center-container h-80">
			<div class="btn square mt-10 mr-20" @click="removeColor">
				-
			</div>

			<div id="color-count-label">
				<h1>{{ colorCount }} colors</h1>
			</div>

			<div class="btn square mt-10 ml-20" @click="addColor">
				+
			</div>
		</div>

		<div id="modifying-btns" class="center-container h-60">
			<div class="btn primary" @click="shuffleColors">
				Shuffle endpoint colors
			</div>
		</div>
	</section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
	methods: {
		...mapActions([
			'addColor',
			'removeColor',
			'shuffleColors'
		])
	},
	computed: {
		...mapGetters([
			'colorsList',
			'colorCount',
			'firstColor',
			'lastColor'
		])
	}
}
</script>

<style lang="scss" scoped>
@import "../sass/_variables.scss";

#color-selection-form {
	position: relative;
	width: 100vw;
	height: 220px;
}

.input-wrapper {
	position: relative;
	display: inline-block;
	width: fit-content;

	input[type=text] {
		width: calc(300px - 10px);
		height: 40px;
		margin: 20px;
		font-size: 22px;
		padding-left: 10px;
		box-sizing: border-box;
		border: 1px solid $light-gray;
		border-radius: 6px;
	}

	.color-preview {
		position: absolute;
		top: 25px;
		right: 25px;
		width: 30px;
		height: 30px;
		border-radius: 6px;
	}
}

#color-count-form {
	#color-count-label {
		display: inline-block;
		vertical-align: top;
		width: 200px;
		height: 60px;
	}

	h1 {
		margin: 0;
		font-size: 32px;
		line-height: 60px;
		text-align: center;
	}
}
</style>