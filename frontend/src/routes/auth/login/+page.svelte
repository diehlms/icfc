<script lang="ts">
	import { ToastTypes, clientStore, toastStore, userStore } from '$lib/stores';
	import { goto, invalidateAll } from '$app/navigation';
	import { Card, Input, Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import type { AppClient, userIn } from '$lib/client';
	import updateAuthContext from '$lib/components/services/auth';
	// import Logo from '$lib/assets/logo.png';

	onMount(async () => {
		if (!!localStorage.getItem('authToken') && $clientStore.authenticated) {
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
			// Rest Client not initialized, will need to programatically refresh page
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
				console.log(res)
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
				restClient.auth
					.postV1AuthLogin()
					.then((res: userIn) => {
						userStore.update((prevValue) => ({
							...prevValue
						}));
						goto('/')
					})
					.catch((_) => {
						clientStore.update((prevValue) => ({
							...prevValue,
							authCookie: null,
							authenticated: false
						}));
						goto('/auth/login');
					});
				goto('/');
			})
			.catch((err) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					toastMessage: 'Failed to log in',
					isOpen: true,
					type: ToastTypes.error
				}));
			});
	}
</script>

<div class="landing-img">
	<div class="login-card">
		<Card class="mx-auto my-12 w-96">
			<!-- <img class="login-logo" src={Logo} alt="Orbio Corporate Logo" /> -->
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

<style>
	.landing-img {
		background-image: url('../../../lib/assets/background.webp');
		background-size: cover;
		height: 100vh;
		overflow-y: hidden;
	}

	.landing-img {
		/* .login-card {
			max-height: 70vh;
		} */
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
