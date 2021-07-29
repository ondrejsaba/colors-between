<template>
	<div id="menu" :class="{ dark: darkMode }">
		<div class="menu-row-btn" @click="switchColorMode">
			{{ messages.menu.colorMode }} 
			<div class="selection">
				{{ colorModeSymbol }}
			</div>
		</div>

		<div class="menu-row-btn" @click="switchLanguage">
			{{ messages.menu.language }}
			<div class="selection">
				{{ languageSymbol }}
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	methods: {
		switchColorMode() {
			const colorModes = ["light", "dark"]

			localStorage.setItem('options', JSON.stringify({
				...this.options,
				colorMode: colorModes.filter(mode => {
					return mode != this.options.colorMode 
				}).join()
			}))

			this.$store.commit('syncOptions')
		},
		switchLanguage() {
			const languages = ["en", "cz"]
			const currentLanguage = {
				name: this.options.language,
				index: languages.indexOf(this.options.language)
			}

			let nextLanguage
			if (currentLanguage.index+1 < languages.length) {
				nextLanguage = languages[currentLanguage.index+1]
			} else {
				nextLanguage = languages[0]
			}

			localStorage.setItem('options', JSON.stringify({
				...this.options,
				language: nextLanguage
			}))

			this.$store.commit('syncOptions')
		}
	},
	computed: {
		...mapGetters([
			'messages',
			'options',
			'darkMode'
		]),
		colorModeSymbol() {
			return this.options.colorMode == 'light' ? '☀️' : '🌙'
		},
		languageSymbol() {
			const flags = {
				'en': '🇬🇧',
				'cz': '🇨🇿'
			}

			return flags[this.options.language]
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../sass/_variables.scss";

@mixin selection-border {
	&:hover {
		.selection {
			border-left: 1px solid darken($primary, 5%);
		}
	}

	&:active {		
		.selection {
			border-left: 1px solid darken($primary, 10%);
		}
	}
}

#menu {
	position: absolute;
	width: 300px;
	height: 100%;
	background-color: $light;

	.menu-row-btn {
		position: relative;
		width: calc(100% - 20px);
		height: 50px;
		border-bottom: 1px solid darken($light, 5%);
		line-height: 50px;
		text-align: left;
		padding-left: 20px;
		font-size: 18px;
		cursor: pointer;

		&:hover {
			background-color: $primary;
			color: $light;
		}

		&:active {
			background-color: darken($primary, 5%);
		}

		.selection {
			display: inline-block;
			position: absolute;
			right: 0;
			width: 60px;
			height: 100%;
			border-left: 1px solid darken($light, 5%);
			text-align: center;
		}

		@include selection-border();
	}

	&.dark {
		background-color: lighten($dark, 5%);
		color: $light;

		.menu-row-btn {
			border-bottom: 1px solid $dark;

			.selection {
				border-left: 1px solid $dark;
			}

			@include selection-border();
		}
	}
}
</style>