<template>
	<div
		class="color-column"
		:style="{ backgroundColor: colorData.hex }"
	>
		<div class="data-container" @click="copyColor">
			<h1>{{ colorData.hex }}</h1>

			<div class="color-copy">
				{{ hintText }}
			</div>
		</div>

		<input
			type="text"
			class="copyInput"
			ref="copyInput"
			:value="colorData.hex"
		/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	data() {
		return {
			alternateHint: false
		}
	},
	props: {
		'color-data': Object
	},
	methods: {
		copyColor() {
			// change hint text
			this.alternateHint = !this.alternateHint

			// put text to clipboard
			this.$refs.copyInput.select()
			document.execCommand("copy")

			// revert hint text
			setTimeout(() => {
				this.alternateHint = !this.alternateHint
			}, 2000)
		}
	},
	computed: {
		...mapGetters([
			'messages'
		]),
		hintText() {
			const message = !this.alternateHint ? 'copy' : 'copied'
			return this.messages.colorColumn[message]
		}
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

		h1 {
			transition: all 0.1s ease;
			cursor: pointer;

			&:hover + .color-copy {
				display: block;
			}

			&:active {
				transform: scale(0.95);
			}
		}

		.color-copy {
			position: absolute;
			width: fit-content;
			height: 30px;
			left: 50%;
			top: -20px;
			transform: translateX(-50%);
			line-height: 30px;
			font-size: 12px;
			padding: 0 10px 0 10px;
			background-color: rgba($dark, 0.5);
			border-radius: 6px;
			display: none;
		}
	}
}

.copyInput {
	/* usually all you need to do in order to hide
	an element is to set its display property to none,
	this time however you can't do that because you
	wouldn't be able to copy text from it */
	position: absolute;
	width: 1px;
	height: 1px;
	top: -100px;
	opacity: 0;
}
</style>