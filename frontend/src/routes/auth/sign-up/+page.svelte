<script lang="ts">
	import { ToastTypes, clientStore, toastStore } from '$lib/stores';
	import { goto, invalidateAll } from '$app/navigation';
	import { Card, Input, Button, Helper } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import type { AppClient, signupPayload } from '$lib/client';
	import Loader from '$lib/components/display/Loader.svelte';
	import { processApiErrorsToString } from '$lib/components/services/errorHandler';
	import { PUBLIC_CAPTCHA_SITE_KEY } from '$env/static/public';
	import { Recaptcha } from "svelte-recaptcha-v2";
	import { PUBLIC_API_URL } from '$env/static/public';

	onMount(async () => {
		if (!!localStorage.getItem('authToken')) {
			goto('/');
		}
	});

	const onCaptchaReady = (event: any) => {
		console.log("recaptcha init has completed.")
	};

	const onCaptchaSuccess = async (event: any) => {
		console.log("token received");
		const response = await fetch(
			`${PUBLIC_API_URL}/v1/verify_captcha`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ token: event.detail.token })
			}
		);
		captchaVerified = response.ok
	};

	const onCaptchaError = (event: any) => {
		console.log("recaptcha init has failed.");
	};

	const onCaptchaExpire = (event: any) => {
		console.log("recaptcha api has expired");
	};

	const onCaptchaClose = (event: any) => {
		console.log("google decided to challange the user");
	};

	onMount(async () => {
		if (!!localStorage.getItem('authToken')) {
			goto('/');
		}
	});

	let loading = false;
	let username = '';
	let password = '';
	let passwordConfirmation = '';
	let email = '';
	let phoneNumber = '';
	let firstName = '';
	let lastName = '';
	let restClient: AppClient;
	let captchaVerified = false;

	const VALID_EMAIL_REGEX = /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i;
	const VALID_PHONE_REGEX = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
	const VALID_PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

	clientStore.subscribe((value) => {
		if (value.restClient !== null) {
			restClient = value.restClient;
		} else {
			invalidateAll();
		}
	});

	async function handleSignup() {	
		loading = true;

		if (captchaVerified) {
			const newUser: signupPayload = {
				username: username,
				password: password,
				phonenumber: phoneNumber,
				password_confirmation: passwordConfirmation,
				firstname: firstName,
				lastname: lastName,
				email: email
			};

			await restClient.auth
				.postV1AuthSignup({ user: newUser })
				.then(() => {
					toastStore.update((prevValue) => ({
						...prevValue,
						toastMessage: 'You have successfully registered. Please check your email for validation.',
						isOpen: true,
						type: ToastTypes.success
					}));
					goto('/auth/login');
				})
				.catch((error: any) => {
					toastStore.update((prevValue) => ({
						...prevValue,
						toastMessage: `${processApiErrorsToString(error.body)}`,
						isOpen: true,
						type: ToastTypes.error
					}));
				})
				.finally(() => {
					loading = false;
				});
		} else {
			toastStore.update((prevValue) => ({
				...prevValue,
				isOpen: true,
				toastMessage: `Captcha verification failed. Please refresh page`,
				type: ToastTypes.error
			}));
		}
	}
</script>

<div class="landing-img">
	<div class="login-card">
		<Card class="mx-auto my-12 w-3/4 max-w-none p-5">
			{#if loading}
				<Loader />
			{:else}
				<h1>Iron City Fishing Club</h1>
				<form on:submit|preventDefault={handleSignup}>
					<span>Sign up for new account?</span>
					<Input class="m-2" type="text" bind:value={firstName} placeholder="First Name" />
					<Input class="m-2" type="text" bind:value={lastName} placeholder="Last Name" />
					<Input class="m-2" type="text" bind:value={username} placeholder="Username" />
					<Input class="m-2" type="email" bind:value={email} placeholder="Email" />
					{#if email && !email.match(VALID_EMAIL_REGEX)}
						<Helper class="mt-2" color="red">
							<span class="font-medium">Invalid email</span>
						</Helper>
					{/if}
					<Input class="m-2" type="tel" bind:value={phoneNumber} placeholder="Phone Number" />
					{#if phoneNumber && !phoneNumber.match(VALID_PHONE_REGEX)}
						<Helper class="mt-2" color="red">
							<span class="font-medium">Invalid telephone number</span>
						</Helper>
					{/if}
					<Input class="m-2" type="password" bind:value={password} placeholder="Password" />
					{#if password && !password.match(VALID_PASSWORD_REGEX)}
						<Helper class="mt-2" color="red">
							<span class="font-medium">Invalid password</span>
							Passwords must adhere to the following rules:
							<ol>
								<li>Be more than 8 characters</li>
								<li>Contain at least one digit</li>
								<li>Contain a lower case letter</li>
								<li>Contain an upper case letter</li>
							</ol>
						</Helper>
					{/if}
					<Input
						class="m-2"
						type="password"
						bind:value={passwordConfirmation}
						placeholder="Password Confirmation"
					/>
					{#if password !== passwordConfirmation}
						<Helper class="mt-2" color="red">
							<span class="font-medium">Password inputs do not match</span>
						</Helper>
					{/if}
					<Recaptcha
						sitekey={PUBLIC_CAPTCHA_SITE_KEY}
						badge={"top"}
						size={"normal"}
						on:success={onCaptchaSuccess}
						on:error={onCaptchaError}
						on:expired={onCaptchaExpire}
						on:close={onCaptchaClose}
						on:ready={onCaptchaReady} 
					/>
					<Button type="submit" outline={true} class="m-2 w-full">Sign Up</Button>
				</form>
				<div class="inline">
					<a class="float-left" href="/auth/forgot-password">Forgot password?</a>
					<a class="float-right" href="/auth/login">Back to login?</a>
				</div>
			{/if}
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
