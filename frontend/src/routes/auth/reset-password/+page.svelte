<script lang="ts">
	import { clientStore, toastStore, ToastTypes } from '$lib/stores';
	import { Card, Input, Button, Label, Helper } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import PasswordInput from '$lib/components/display/PasswordInput.svelte';

	onMount(async () => {
		const url = $page.url;
		const resetToken = url.searchParams.get('token');
		if (resetToken) {
			useResetForm = true;
			token = resetToken;
		}
	});

	let email = '';
	let useResetForm: boolean = false;
	let token: string;
	let password = '';
	let passwordConfirm = '';

	const VALID_PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

	async function sendRecoveryEmail() {
		await $clientStore.restClient.passwordResets
			.postV1PasswordResets(email)
			.then(() => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Recovery email sent',
					type: ToastTypes.success
				}));
			})
			.catch(() => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Unable to send recovery email. Please contact administration.',
					type: ToastTypes.error
				}));
			});
	}

	async function resetPassword() {
		await $clientStore.restClient.passwordResets
			.putV1PasswordResets({
				password_reset_token: token,
				password: password,
				password_confirmation: passwordConfirm
			})
			.then((res: any) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Password Updated!',
					type: ToastTypes.success
				}));
				goto('/auth/login');
			})
			.catch((err) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: `Unable to reset password: Error: ${err}`,
					type: ToastTypes.error
				}));
			});
	}

	$: useResetForm;
</script>

<div class="landing-img">
	{#if useResetForm === true}
		<Card class="login-card mx-auto my-8 w-96">
			<form on:submit|preventDefault={resetPassword}>
				<div class="mb-6">
					<Label for="password" class="mb-2">Password</Label>
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
					<PasswordInput id="password" required bind:value={password} />
				</div>
				<div class="mb-6">
					<Label for="confirmPassword" class="mb-2">Confirm password</Label>
					<PasswordInput id="confirmPassword" required bind:value={passwordConfirm} placeholder="Confirm password" />
				</div>
				{#if password !== passwordConfirm}
					<Helper class="mt-2" color="red">
						<span class="font-medium">Password inputs do not match</span>
					</Helper>
				{/if}
				<Button type="submit" outline={true} class="m-2 w-full">Reset Password</Button>
			</form>
		</Card>
	{:else}
		<Card class="login-card mx-auto my-8 w-96">
			<form on:submit|preventDefault={sendRecoveryEmail}>
				<Input class="m-2" type="text" bind:value={email} placeholder="Email" />
				<Button type="submit" outline={true} class="m-2 w-full">Send Recovery Email</Button>
			</form>
			<a class="forgot-pw" href="/auth/forgot-password">Forgot Password?</a>
		</Card>
	{/if}
</div>

<style>
	.landing-img {
		background-image: url('../../../assets/images/lodge.jpg');
		background-size: cover;
		background-position: bottom;
		height: 100vh;
		overflow-y: hidden;
	}

	.login-logo,
	.forgot-pw {
		display: block;
		margin: 15px auto;
		padding-top: 15px;
		padding-bottom: 15px;
	}
</style>
