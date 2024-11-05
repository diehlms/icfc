<script lang="ts">
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import L from 'leaflet';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import * as tj from '@mapbox/togeojson';
	import Timestamps from '$lib/components/display/Timestamps.svelte';
	import { Card } from 'flowbite-svelte';
	import type { chartOut } from '$lib/client';
	import { deleteEntity } from '$lib/components/services/crud';
	import { hotSwapProductionUris } from '$lib/components/services/imageUtils';

	let map: any;
	let loading: boolean = true;
	let chart: chartOut | undefined;

	export let data: any;

	const client = get(clientStore);
	const user = get(userStore);

	onMount(() => {
		client.restClient?.charts
			.getV1Charts1(data.id)
			.then((data: chartOut) => {
				chart = data;
			})
			.catch((error) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: error,
					type: ToastTypes.error
				}));
			});
		loading = false;
	});

	const deleteChart = (id: number) => {
		loading = true;
		deleteEntity(
			chart?.id,
			{ user_id: user.id as number },
			client.restClient?.charts.deleteV1Charts.bind(client.restClient?.charts)
		);
		loading = false;
	};

	const renderBaseMap = async () => {
		map = L.map('map');

		L.tileLayer('https://a.tile.openstreetmap.org/{z}/{x}/{y}.png ', {
			attribution:
				'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
			maxZoom: 18,
			tileSize: 512,
			zoomOffset: -1
		}).addTo(map);

		map.setView([51.505, -0.09], 13);
	};

	const fetchGpxFile = async (chartGpxUrl: string): Promise<string> => {
		const response = await fetch(hotSwapProductionUris(chartGpxUrl));
		const gpxText = await response.text();
		return gpxText;
	};

	const renderGpx = (gpxText: string) => {
		const parser = new DOMParser();
		const gpxXml = parser.parseFromString(gpxText, 'application/xml');
		const geoJSON = tj.gpx(gpxXml);

		// Create a GeoJSON layer and add it to the map
		const geoJsonLayer = L.geoJSON(geoJSON).addTo(map);

		// Get the bounds of the GeoJSON layer and fit the map to those bounds
		const bounds = geoJsonLayer.getBounds();
		map.fitBounds(bounds);
	};

	onMount(async () => {
		await renderBaseMap();
		await client.restClient?.charts
			.getV1Charts1(data.id)
			.then(async (data) => {
				chart = data;
				let gpxText = await fetchGpxFile(data.chart?.url);
				renderGpx(gpxText); // Render the GPX data and center the map
			})
			.catch((error) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: error,
					type: ToastTypes.error
				}));
			});
		loading = false;
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
		integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
		crossorigin=""
	/>
</svelte:head>

<div class="container mx-auto max-w-7xl p-4">
	<div class="flex flex-col gap-4 lg:flex-row">
		<div class="w-full lg:w-3/4">
			<Card>
				<Timestamps model={chart} />
			</Card>
		</div>
		<div class="w-full lg:w-1/2">
			<div class="sticky top-4">
				<div id="map" />
			</div>
		</div>
	</div>
</div>

<style>
	html,
	body {
		padding: 0;
		margin: 0;
	}
	html,
	body,
	#map {
		height: 70vh;
		width: 30vw;
	}
</style>
