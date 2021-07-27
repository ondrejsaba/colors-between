<template>
	<section id="all-colors">
		<div class="full-flex-container">
			<color-column
				v-for="color in colorsList"
				:key="color.id"
				:color-data="color"
			/>
		</div>
	</section>
</template>

<script>
import ColorColumn from './ColorColumn.vue'
import { mapGetters } from 'vuex'

export default {
	components: {
		'color-column': ColorColumn
	},
	computed: {
		...mapGetters([
			'colorsList',
			'colorCount'
		])
	}
}
</script>

<style lang="scss" scoped>
#all-colors {
	position: relative;
	width: 100vw;
	height: calc(100vh - 160px);
}
</style>