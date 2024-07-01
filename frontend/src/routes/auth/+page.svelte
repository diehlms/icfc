<script lang="ts">
	import { get } from 'svelte/store';
	import { ToastTypes, clientStore, toastStore } from '$lib/stores';
	import { goto } from '$app/navigation';
	import { Card, Input, Button, Label, Checkbox, A } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import type { userIn } from '$lib/client';
	import Logo from '$lib/assets/logo.png';

	onMount(async () => {
		if (!!localStorage.getItem('authToken') && $clientStore.authenticated) {
			goto('/dashboard');
		}
	});

	let email = '';
	let password = '';
	let first_name = '';
	let last_name = '';
	let passwordConfirm = '';
	let agreedToTerms = false;

	const clients = get(clientStore);

	async function handleSignUp() {
		const req: userIn = {
			email
			// data_access: false,
			// full_name: `${first_name} ${last_name}`,
			// password,
			// verified: false
		};
		await clients.restClient?.users
			.postV1Users()
			.then((res: any) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
				toastStore.update((prevValue) => ({
					...prevValue,
					toastMessage: 'Could not register your account.',
					isOpen: true,
					type: ToastTypes.error
				}));
			});
	}
</script>

<div class="landing-img">
	<div class="login-card">
		<Card class="mx-auto mt-8">
			<img class="login-logo" src={Logo} alt="Orbio Corporate Logo" />
			<p class="mx-auto mb-2">Register for Orbio Earth</p>
			<form class="signup-form">
				<div class="mb-6 grid gap-6 md:grid-cols-2">
					<div>
						<Label for="first_name" class="mb-2">First name</Label>
						<Input
							bind:value={first_name}
							type="text"
							id="first_name"
							placeholder="John"
							required
						/>
					</div>
					<div>
						<Label for="last_name" class="mb-2">Last name</Label>
						<Input bind:value={last_name} type="text" id="last_name" placeholder="Doe" required />
					</div>
				</div>
				<div class="mb-6">
					<Label for="email" class="mb-2">Email address</Label>
					<Input
						type="email"
						id="email"
						placeholder="john.doe@company.com"
						required
						bind:value={email}
					/>
				</div>
				<div class="mb-6">
					<Label for="password" class="mb-2">Password</Label>
					<Input
						type="password"
						id="password"
						placeholder="•••••••••"
						required
						bind:value={password}
					/>
				</div>
				<div class="mb-6">
					<Label for="confirmPassword" class="mb-2">Confirm password</Label>
					<Input
						type="password"
						id="confirmPassword"
						placeholder="•••••••••"
						required
						bind:value={passwordConfirm}
					/>
				</div>
				<Checkbox bind:checked={agreedToTerms} class="mb-6 space-x-1" required>
					I agree with the <A
						href="/auth/sign-up/terms.html"
						class="text-primary-700 hover:underline dark:text-primary-600">terms and conditions</A
					>.
				</Checkbox>
				<Button
					on:click={handleSignUp}
					disabled={password !== passwordConfirm || !agreedToTerms}
					outline
					type="submit">Sign Up</Button
				>
			</form>
			<div class="inline">
				<a class="forgot-pw" href="/auth/login">Sign in instead?</a>
			</div>
		</Card>
	</div>
</div>

<style lang="scss">
	.landing-img {
		background-image: url('../../../lib/assets/background.webp');
		background-size: cover;
		height: 100vh;
	}

	.login-logo {
		max-height: 15vh;
		max-width: 15vw;
	}

	.landing-img {
		.login-card {
			padding-top: 10px;
			max-height: 50vh;
		}
	}

	.signup-form {
		max-height: 30vh;
		overflow-y: scroll;
		padding-right: 5px;
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
