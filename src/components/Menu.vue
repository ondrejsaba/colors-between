<template>
	<div id="menu">
		<div class="menu-row-btn">
			Color mode 
			<div class="selection">
				☀️ 
			</div>
		</div>

		<div class="menu-row-btn">
			Language
			<div class="selection">
				🇨🇿
			</div>
		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "../sass/_variables.scss";

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

			.selection {
				border-left: 1px solid darken($primary, 5%);
			}
		}

		&:active {
			background-color: darken($primary, 5%);

			.selection {
				border-left: 1px solid darken($primary, 10%);
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
		}
	}
}
</style>