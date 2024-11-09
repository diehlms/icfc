<script lang="ts">
  import { page } from '$app/stores';
	import { toastStore, ToastTypes } from '$lib/stores';
	import { onMount } from 'svelte';
	import { PUBLIC_API_URL } from '$env/static/public';
	import { goto } from '$app/navigation';

  onMount(async() => {
    const slug = $page.params.slug;
    const url = `${PUBLIC_API_URL}/v1/auth/confirm_email/${slug}`;

    const response = await fetch(url, {
			method: 'POST'
		});

		if (!response.ok) {
      toastStore.update((prevValue) => ({
        ...prevValue,
        isOpen: true,
        toastMessage: `Error: ${response.statusText}`,
        type: ToastTypes.error
      }));
		} else {
      toastStore.update((prevValue) => ({
        ...prevValue,
        isOpen: true,
        toastMessage: 'Email validated. You may now log in.',
        type: ToastTypes.success
      }));
    }

    goto('/auth/login')
  })
</script>

<span>Validating email...</span>