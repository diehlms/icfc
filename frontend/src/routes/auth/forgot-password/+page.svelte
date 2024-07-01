<script lang="ts">
	import { get } from 'svelte/store';
	import { ToastTypes, clientStore, toastStore } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { Card, Input, Button } from 'flowbite-svelte';
	import updateAuthContext from '$lib/components/services/auth';
	import { onMount } from 'svelte';

	import Logo from '$lib/assets/logo.png';

	onMount(async () => {
		if (!!localStorage.getItem('authToken')) {
			goto('/dashboard');
		}
	});

	let email = '';

	const clients = get(clientStore);

	async function sendRecoveryEmail() {
		// await clients.restClient?.login
		// 	.recoverPasswordApiV1PasswordRecoveryEmailPost(email)
		// 	.then((res: any) => {
		// 		toastStore.update((prevValue) => ({
		// 			...prevValue,
		// 			isOpen: true,
		// 			toastMessage: 'Recovery email sent, please check your email.',
		// 			type: ToastTypes.success
		// 		}));
		// 	})
		// 	.catch((err) => {
		// 		toastStore.update((prevValue) => ({
		// 			...prevValue,
		// 			isOpen: true,
		// 			toastMessage: 'Unable to send recovery email. Please contact administration.',
		// 			type: ToastTypes.error
		// 		}));
		// 	});
	}
</script>

<div class="landing-img">
	<Card class="login-card mx-auto my-8 w-96">
		<img class="login-logo" src={Logo} alt="Orbio Corporate Logo" />
		<form on:submit|preventDefault={sendRecoveryEmail}>
			<Input class="m-2" type="text" bind:value={email} placeholder="Email" />
			<Button type="submit" outline={true} class="m-2 w-full">Send Recovery Email</Button>
		</form>
		<div class="inline">
			<a class="card-b-links" href="/auth/login">Back to sign in</a>
		</div>
	</Card>
</div>

<style>
	.landing-img {
		background-image: url('../../../lib/assets/background.webp');
		background-size: cover;
		height: 100vh;
		overflow-y: hidden;
	}

	.landing-img {
		.login-card {
			max-height: 70vh;
		}
	}

	.login-logo {
		max-height: 15vh;
		max-width: 15vw;
	}

	.inline {
		padding-top: 10px;
	}

	.login-logo {
		display: block;
		margin: 15px auto; /* Centers the image horizontally */
		padding-top: 15px;
		padding-bottom: 15px;
	}
</style>
