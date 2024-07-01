<script lang="ts">
	// import { PUBLIC_VERSION } from '$env/static/public';

	const PUBLIC_VERSION = '0.0.0';
	export let year = new Date().getFullYear();
</script>

<footer>
	<p>&copy; {year} ICFC. All rights reserved. Version {PUBLIC_VERSION}</p>
</footer>

<style>
	footer {
		background-color: #eee;
		padding: 10px;
		z-index: 899;
		text-align: center;
		position: fixed;
		left: 0;
		top: 10;
		bottom: 0;
		width: 100%;
	}

	p {
		margin: 0;
		font-size: 14px;
		color: #555555;
	}
</style>
