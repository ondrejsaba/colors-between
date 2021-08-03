<template>
	<div id="menu" :class="{ dark: darkMode }">
		<div id="tabs">
			<div class="center-container">
				<div
					class="tab"
					:class="{ active: selectedTab == tab.component }"
					@click="selectTab(tab.component)"
					v-for="tab in tabs"
					:key="tab.id"
				>
					{{ messages.menu[tab.id] }}
				</div>
			</div>
		</div>
		
		<component :is="selectedTab"></component>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import MenuOptions from './MenuOptions.vue'
import MenuFavourites from './MenuFavourites.vue'

export default {
	components: {
		MenuOptions,
		MenuFavourites
	},
	data() {
		return {
			selectedTab: "MenuOptions",
			tabs: [
				{id: 'options', component: 'MenuOptions'},
				{id: 'favourites', component: 'MenuFavourites'}
			]
		}
	},
	methods: {
		selectTab(tabName) {
			this.selectedTab = tabName
		}
	},
	computed: {
		...mapGetters([
			'messages',
			'darkMode'
		]),
		messageOptions() {
			return this.messages.menu.options
		},
		messageFavourites() {
			return this.messages.menu.favourites
		}
	}
}
</script>

<style lang="scss">
@import "../sass/_variables.scss";

#menu {
	position: absolute;
	width: 300px;
	height: 100%;
	background-color: $light;

	#tabs {
		width: 100%;
		height: 50px;

		.tab {
			display: inline-block;
			width: fit-content;
			padding: 0 20px 0 20px;
			text-align: center;
			font-size: 14px;
			color: lighten($dark, 30%);
			line-height: calc(50px - 3px);
			box-sizing: border-box;

			&.active {
				font-weight: 600;
				border-bottom: 3px solid $primary;
				color: $dark;
			}

			&:not(.active) {
				&:hover {
					background-color: darken($light, 10%);
					border-bottom: 3px solid darken($light, 10%);
				}

				&:active {
					transform: scale(0.975);
				}
			}

			transition: transform 0.1s ease;
			cursor: pointer;
		}
	}

	&.dark {
		#tabs {
			.tab {
				color: $light;

				&:not(.active) {
					&:hover {
						background-color: lighten($dark, 3%);
						border-bottom: 3px solid lighten($dark, 3%);
					}
				}
			}
		}
	}
}
</style>