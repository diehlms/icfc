<script lang="ts">
	import { ToastTypes, clientStore, toastStore } from '$lib/stores';
	import { goto, invalidateAll } from '$app/navigation';
	import { Card, Input, Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import type { AppClient } from '$lib/client';
	import updateAuthContext from '$lib/components/services/auth';
	import { processApiErrorsToString } from '$lib/components/services/errorHandler';

	onMount(async () => {
		if (!!localStorage.getItem('authToken')) {
			goto('/');
		}
	});

	let username = '';
	let password = '';
	let restClient: AppClient;

	clientStore.subscribe((value) => {
		if (value.restClient !== null) {
			restClient = value.restClient;
		} else {
			invalidateAll();
		}
	});

	async function handleLogin() {
		await restClient.auth
			.postV1AuthLogin({
				email: username,
				password: password
			})
			.then((res: any) => {
				localStorage.setItem('authToken', res.token);
				clientStore.update((prevValue) => ({
					...prevValue,
					authCookie: res.token,
					authenticated: true
				}));
				toastStore.update((prevValue) => ({
					...prevValue,
					toastMessage: 'Logged In Successfully',
					isOpen: true,
					type: ToastTypes.success
				}));
				updateAuthContext.updateAuthContext();
				goto('/');
			})
			.catch((error: any) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					toastMessage: `Failed to log in: ${processApiErrorsToString(error.body)}`,
					isOpen: true,
					type: ToastTypes.error
				}));
				goto('/auth/login');
			});
	}
</script>

<div class="landing-img">
	<div class="login-card">
		<Card class="mx-auto my-12 w-96">
			<h1>Iron City Fishing Club</h1>
			<form on:submit|preventDefault={handleLogin}>
				<Input class="m-2" type="text" bind:value={username} placeholder="Username" />
				<Input class="m-2" type="password" bind:value={password} placeholder="Password" />
				<Button type="submit" outline={true} class="m-2 w-full">Log in</Button>
			</form>
			<div class="inline">
				<a class="float-left" href="/auth/forgot-password">Forgot password?</a>
				<a class="float-right" href="/auth/sign-up">Don't have an account?</a>
			</div>
		</Card>
	</div>
</div>

<style lang="scss">
	.landing-img {
		background-image: url('../../../assets/images/lodge.jpg');
		background-size: cover;
		background-position: bottom;
		height: 100vh;
		overflow-y: hidden;
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
