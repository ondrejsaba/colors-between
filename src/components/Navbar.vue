<template>
	<nav :class="{ dark: darkMode }">
		<div class="btn square borderless size-fluid ml-5 mt-5" @click="setShowMenu">
			<span class="material-icons">
				{{ showMenu ? 'close' : 'menu'}}
			</span>
		</div>

		<div id="navbar-title">
			<h1>Colors Between</h1>
		</div>

		<div id="navbar-actions">
			<div id="minor-actions" class="inline-block relative mr-5">
				<div class="btn borderless square">
					<span class="material-icons">
						arrow_back
					</span>
				</div>

				<div class="btn borderless square">
					<span class="material-icons">
						arrow_forward
					</span>
				</div>

				<div class="btn borderless square">
					<span class="material-icons">
						star_outline
					</span>
				</div>
			</div>

			<div class="btn primary" @click="shuffleColors">
				{{ messages.navbar.shuffleBtn }}
				<span class="material-icons">
					shuffle
				</span>
			</div>
		</div>
	</nav>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

export default {
	methods: {
		...mapActions([
			'shuffleColors'
		]),
		...mapMutations([
			'setShowMenu'
		])
	},
	computed: {
		...mapGetters([
			'messages',
			'showMenu',
			'options',
			'darkMode'
		])
	}
}
</script>

<style lang="scss" scoped>
@import "../sass/_variables.scss";

nav {
	position: relative;
	width: 100vw;
	height: 50px;
	box-sizing: border-box;
	border-bottom: 1px solid darken($light, 10%);
	background-color: $light;
	color: $dark;

	#navbar-title, #navbar-actions {
		display: inline-block;
	}

	#navbar-title {
		width: fit-content;

		h1 {
			margin: 0 10px 0 10px;
			font-size: 24px;
			line-height: 50px;
		}
	}

	#navbar-actions {
		position: absolute;
		top: 0;
		right: 0;
		width: fit-content;
		height: 100%;
		margin: 5px;
	}

	&.dark {
		background-color: $dark;
		color: $light;
		border-bottom: 1px solid darken($dark, 5%);

		.btn span.material-icons {
			color: $light;
		}

		#navbar-actions {
			.btn {
				color: $light;
			}
		}
	}
}
</style>