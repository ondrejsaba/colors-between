<template>
    <div id="options-container">
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
            'options'
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
		},
    }
}
</script>