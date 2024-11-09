<script lang="ts">
	import { deleteEntity } from '$lib/components/services/crud';
	import { clientStore } from '$lib/stores';
	import { Handle, Position, type NodeProps } from '@xyflow/svelte';
	import { Button } from 'flowbite-svelte';
	import { Trash } from 'svelte-heros-v2';
	import { get } from 'svelte/store';
	import updateAuthContext from '$lib/components/services/auth';

	type $$Props = NodeProps;

	export let id: any;
	export let selected: $$Props['selected'];
	export let data: $$Props['data'];
	export let isConnectable: $$Props['isConnectable'];

	const client = get(clientStore)
	const { label, user } = data;

	const deleteFamilyMember = () => {
		deleteEntity(id, { user_id: user.id as number }, 'Family Member', client.restClient?.familyMembers.deleteV1FamilyMembers.bind(client.restClient.familyMembers))
	};
</script>

<Handle
	type="target" 
	position={Position.Top} 
	style="background: #555;" 
	{isConnectable} 
/>

<div>
	<strong class="mr-4">{label}</strong>
	{#if updateAuthContext.userActionPermitted(id, user)}
		<Button size="sm" outline on:click={deleteFamilyMember}><Trash /></Button>
	{/if}
</div>

<Handle
	type="source"
	position={Position.Bottom}
	id="a"
	style="background: #555;"
	{isConnectable}
/>

<style>
	:global(.svelte-flow__node-familyMemberNode) {
		padding: 5px;
		font-size: 12px;
		background: #d8ecff;
		border: 1px solid #555;
		border-radius: 5px;
		text-align: center;
	}

	/* Styling for handles to make them bigger and interactive */
  :global(.svelte-flow__handle) {
		width: 12px; /* Adjust the size as needed */
		height: 12px; /* Adjust the size as needed */
		border-radius: 50%; /* Make them round */
		cursor: pointer; /* Change cursor on hover */
		background-color: #777; /* Set a noticeable background color */
	}

  :global(.svelte-flow__handle:hover) {
    background-color: #444; /* Darken the background color on hover */
  }
</style>
