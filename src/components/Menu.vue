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

	#tabs {
		width: 100%;
		height: 50px;
		border-bottom: 1px solid darken($light, 10%);
		box-sizing: border-box;

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

			.selection {
				border-left: 1px solid darken($primary, 15%) !important;
			}
		}

		.selection {
			display: inline-block;
			position: absolute;
			right: 0;
			width: 60px;
			height: 100%;
			border-left: 1px solid darken($light, 5%);
			text-align: center;

			span.material-icons {
				line-height: 50px;
			}

			&.standalone {
				&:hover {
					background-color: darken($primary, 2%);
				}

				&:active {
					background-color: darken($primary, 7%);
				}
			}

			&.standalone-red {
				&:hover {
					background-color: $red;
				}
				
				&:active {
					background-color: darken($red, 5%);
				}
			}
		}

		@include selection-border();
	}

	&.dark {
		background-color: lighten($dark, 5%);
		color: $light;

		#tabs {
			border-bottom: 1px solid $dark;

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