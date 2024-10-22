<template>
	<section
		id="color-selection-form"
		v-if="firstColor && lastColor"
		:class="{ dark: darkMode }"
	>
		<div id="colors-form" class="center-container h-80">
			<div
				class="input-wrapper"
				:class="{ inactive: colorEditLast }"
			>
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
					:class="{ close: colorEditFirst }"
					:style="{ backgroundColor: firstColor.hex }"
					@click="setShowColorPicker({
						showInput: !colorEditFirst ? 'first' : ''
					})"
				>
				</div>
			</div>

			<div
				id="switch-colors-btn"
				class="btn borderless size-fluid"
				@click="switchColors"
			>
				<span
					class="material-icons t-025s"
					:style="switchBtnRotationStyle"
				>
					cached
				</span>
			</div>

			<div
				class="input-wrapper"
				:class="{ inactive: colorEditFirst }"
			>
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
					:class="{ close: colorEditLast }"
					:style="{ backgroundColor: lastColor.hex }"
					@click="setShowColorPicker({
						showInput: !colorEditLast ? 'last' : ''
					})"
				>
				</div>
			</div>
		</div>

		<div id="color-count-form" class="center-container h-80">
			<div
				class="btn square darken-if-dark active-shrink mt-10 mr-20"
				:class="{ inactive: !canRemoveColor }"
				@click="removeColor"
			>
				<span class="material-icons">
					remove
				</span>
			</div>

			<div id="color-count-label">
				<h1>{{ colorCount }} {{ messages.form.colors }}</h1>
			</div>

			<div
				class="btn square darken-if-dark active-shrink mt-10 ml-20"
				:class="{ inactive: !canAddColor }"
				@click="addColor"
			>
				<span class="material-icons">
					add
				</span>
			</div>
		</div>
	</section>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
	data() {
		return {
			switchBtnRotation: 0
		}
	},
	methods: {
		...mapActions([
			'addColor',
			'removeColor'
		]),
		...mapMutations([
			'setShowColorPicker'
		]),
		setColorAtPosition(payload) {
			// HEX code validation
			if ([3,4,6].includes(payload.value.length-1)) {
				let validHex = true

				const numbers = [...Array(10).keys()].map(number => number.toString())
				const letters = ["#", "A", "B", "C", "D", "E", "F"]
				const validCharacters = numbers.concat(letters)

				for (let char of payload.value) {
					if (!validCharacters.includes(char.toUpperCase())) {
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
		},
		switchColors() {
			this.$store.commit('setDefaultColors', [
				this.lastColor.hex, this.firstColor.hex
			])
			this.$store.commit('generateColorsInbetween')

			this.switchBtnRotation += !this.switchBtnRotation ? 180 : (-180)
		}
	},
	computed: {
		...mapGetters([
			'messages',
			'colorsList',
			'colorCount',
			'firstColor',
			'lastColor',
			'canAddColor',
			'canRemoveColor',
			'colorEditFirst',
			'colorEditLast',
			'darkMode'
		]),
		switchBtnRotationStyle() {
			return { transform: `rotate(${this.switchBtnRotation}deg)` }
		}
	}
}
</script>

<style lang="scss">
@import "../sass/_variables.scss";

#color-selection-form {
	position: relative;
	width: 100vw;
	height: 160px;
	background-color: $light;
	color: $dark;

	&.dark {
		background-color: $dark;
		color: $light;

		.btn {
			&.darken-if-dark {
				border: 1px solid lighten($dark, 10%);
				background-color: lighten($dark, 5%);
			}

			span.material-icons {
				color: $light;
			}
		}

		input[type=text] {
			border: 1px solid lighten($dark, 10%);
			background-color: lighten($dark, 15%);
			color: $light;
		}
	}
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
		font-family: 'Inter';
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

		&.close {
			background-color: $red !important;
			box-sizing: border-box;
			border: 1px solid darken($red, 15%);
			text-align: center;
			line-height: calc(30px - 2px);
			font-size: 20px;
			color: $light;

			&:after {
				content: 'x';
			}
		}

		&:hover {
			transform: scale(1.05);
		}

		&:active {
			transform: scale(1);
		}
	}

	&.inactive {
		opacity: 0.5;
		filter: saturate(0);

		input[type=text] {
			cursor: default;
		}

		.color-preview {
			cursor: default;
			background-color: $light-gray !important;

			&:hover {
				transform: scale(1);
			}
		}
	}

	transition: all 0.1s ease;
}

#switch-colors-btn {
	display: inline-block;
	margin-top: 20px;
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