<script lang="ts">
	import { PUBLIC_VERSION } from '$env/static/public';
	export let year = new Date().getFullYear();
</script>

<footer class="not-printable bg-emerald-900">
	<p class="text-emerald-50">
		&copy; {year} ICFC | Version {PUBLIC_VERSION}
	</p>
</footer>

<style>
	footer {
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
	}
</style>
