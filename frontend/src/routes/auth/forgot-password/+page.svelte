<script lang="ts">
	import { get } from 'svelte/store';
	import { ToastTypes, clientStore, toastStore } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { Card, Input, Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { processApiErrorsToString } from '$lib/components/services/errorHandler';
	import { PUBLIC_CAPTCHA_SITE_KEY } from '$env/static/public';
	import { Recaptcha } from "svelte-recaptcha-v2";
	import { PUBLIC_API_URL } from '$env/static/public';

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

	let email = '';
	let captchaVerified = false;

	const clients = get(clientStore);

	async function sendRecoveryEmail() {
		await clients.restClient?.passwordResets
			.postV1PasswordResets({ email: email })
			.then((_: any) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Recovery email sent, please check your email.',
					type: ToastTypes.success
				}));
			})
			.catch((error) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: `${processApiErrorsToString(error.body)}`,
					type: ToastTypes.error
				}));
			});
	}

</script>

<div class="landing-img">
	<Card class="login-card mx-auto my-8 w-96">
		<form on:submit|preventDefault={sendRecoveryEmail}>
			<!-- todo: add back recaptcha -->
			<!-- <Recaptcha
				sitekey={PUBLIC_CAPTCHA_SITE_KEY}
				badge={"top"}
				size={"normal"}
				on:success={onCaptchaSuccess}
				on:error={onCaptchaError}
				on:expired={onCaptchaExpire}
				on:close={onCaptchaClose}
				on:ready={onCaptchaReady} 
			/> -->
			<Input class="m-2" type="text" bind:value={email} placeholder="Email" />
			<Button type="submit" outline={true} class="m-2 w-full">Send Recovery Email</Button>
		</form>
		<div class="inline">
			<a class="card-b-links" href="/auth/login">Back to sign in</a>
		</div>
	</Card>
</div>

<style lang="scss">
	.landing-img {
		background-image: url('../../../assets/images/lodge.jpg');
		background-size: cover;
		background-position: bottom;
		height: 100vh;
		overflow-y: hidden;
	}

	.inline {
		padding-top: 10px;
	}
</style>
