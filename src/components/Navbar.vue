<template>
	<nav>
		<div class="btn square borderless ml-5 mt-5">
			<span class="material-icons">
				menu
			</span>
		</div>

		<div id="navbar-title">
			<h1>Colors Between</h1>
		</div>

		<div id="navbar-actions">
			<div class="btn primary" @click="shuffleColors">
				Shuffle endpoint colors
			</div>
		</div>
	</nav>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	methods: {
		...mapActions([
			'shuffleColors'
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

	#navbar-title, #navbar-actions {
		display: inline-block;
	}

	#navbar-title {
		width: fit-content;

		h1 {
			margin: 0 10px 0 10px;
			font-size: 24px;
			line-height: 50px;
			color: $dark;
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
}
</style>