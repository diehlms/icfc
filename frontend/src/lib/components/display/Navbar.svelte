<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from 'flowbite-svelte';

	const dispatch = createEventDispatcher();

	function emitLogOut() {
		dispatch('emitLoggedOut');
	}
</script>

<div class="relative flex-1 border-black">
	<Navbar navClass="sm:px-4 absolute w-full z-20 top-0 left-0 border-b" let:hidden let:toggle>
		<NavBrand href="/profile">
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">ICFC</span>
		</NavBrand>
		<NavHamburger on:click={toggle} />
		<NavUl {hidden}>
			<Button class="btn-override" outline on:click={emitLogOut}>Log Out</Button>
		</NavUl>
	</Navbar>
</div>
