<script lang="ts">
	export let model: any = undefined;
	export let textAlign: string = 'text-center';
</script>

<p class="mt-4 {textAlign} text-xs text-gray-500">
	Created: {new Date(model?.created_at).toLocaleDateString()} | Last Updated: {new Date(
		model?.updated_at
	).toLocaleDateString()} | Author: {model?.user?.email}
</p>
