<script lang="ts">
	import { get } from 'svelte/store';
	import { ToastTypes, clientStore, toastStore } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { Card, Input, Button } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { processApiErrorsToString } from '$lib/components/services/errorHandler';
	import { Recaptcha } from 'svelte-recaptcha-v2';
	import { PUBLIC_CAPTCHA_SITE_KEY } from '$env/static/public';

	onMount(async () => {
		if (!!localStorage.getItem('authToken')) {
			goto('/');
		}
	});

	let email = '';
	let captchaToken = '';

	const clients = get(clientStore);

	let captchaError = '';

	function onCaptchaSuccess(e: any) { captchaToken = e.detail.response; captchaError = ''; }
	function onCaptchaExpire() { captchaToken = ''; captchaError = 'Captcha expired, please try again.'; }
	function onCaptchaError() { captchaToken = ''; captchaError = 'Captcha failed, please try again.'; }

	async function sendRecoveryEmail() {
		await clients.restClient?.passwordResets
			.postV1PasswordResets({ email: email }, captchaToken)
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
			<Input class="m-2" type="text" bind:value={email} placeholder="Email" />
			<div class="m-2">
				<Recaptcha
					sitekey={PUBLIC_CAPTCHA_SITE_KEY}
					on:success={onCaptchaSuccess}
					on:expire={onCaptchaExpire}
					on:error={onCaptchaError}
				/>
			</div>
			{#if captchaError}
				<p class="mx-2 mt-1 text-sm text-red-600">{captchaError}</p>
			{/if}
			<Button type="submit" outline={true} class="m-2 w-full" disabled={!captchaToken}>
				Send Recovery Email
			</Button>
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
