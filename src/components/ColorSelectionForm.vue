<template>
	<section id="color-selection-form" v-if="firstColor && lastColor">
		<div id="colors-form" class="center-container h-80">
			<div class="input-wrapper">
				<input
					ref="firstColor"
					type="text"
					:value="firstColor.hex"
					@input="setColorAtPosition({
						position: firstColor.id,
						value: $refs.firstColor.value
					})"
					@blur="syncValue(firstColor.id)"
				>
				<div
					class="color-preview"
					:style="{ backgroundColor: firstColor.hex }"
				>
				</div>
			</div>

			<div class="input-wrapper">
				<input
					ref="lastColor"
					type="text"
					:value="lastColor.hex"
					@input="setColorAtPosition({
						position: lastColor.id,
						value: $refs.lastColor.value
					})"
					@blur="syncValue(lastColor.id)"
				>
				<div
					class="color-preview"
					:style="{ backgroundColor: lastColor.hex }"
				>
				</div>
			</div>
		</div>

		<div id="color-count-form" class="center-container h-80">
			<div class="btn square active-shrink mt-10 mr-20" @click="removeColor">
				-
			</div>

			<div id="color-count-label">
				<h1>{{ colorCount }} colors</h1>
			</div>

			<div class="btn square active-shrink mt-10 ml-20" @click="addColor">
				+
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
			'removeColor'
		]),
		setColorAtPosition(payload) {
			// HEX code validation
			if ([3,4,6].includes(payload.value.length-1)) {
				let validHex = true

				const numbers = [...Array(10).keys()].map(number => number.toString())
				const letters = ["#", "A", "B", "C", "D", "E", "F"]
				const validCharacters = numbers.concat(letters)

				for (let char of payload.value) {
					if (!validCharacters.includes(char)) {
						validHex = false
					}
				}

				/* if the HEX code is invalid, then the displayed color
				gets out of sync with the input */
				if (validHex) {
					this.$store.commit('setColorAtPosition', payload)
					this.$store.commit('generateColorsInbetween')
				}
			}
		},
		syncValue(id) {
			if (id == 0) {
				this.$refs.firstColor.value = this.colorsList[id].hex
			} else {
				this.$refs.lastColor.value = this.colorsList[id].hex
			}
		}
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
	height: 160px;
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
		transition: all 0.1s ease;
		cursor: pointer;

		&:hover {
			transform: scale(1.05);
		}

		&:active {
			transform: scale(1);
		}
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
		color: $dark;
	}
}
</style>