<script lang="ts">
	import { Handle, Position, type NodeProps } from '@xyflow/svelte';
	import { Button } from 'flowbite-svelte';

	type $$Props = NodeProps;

	export let id: any;
	export let selected: $$Props['selected'];
	export let data: $$Props['data'];
	export let isConnectable: $$Props['isConnectable'];

	const { label } = data;
</script>

<Handle type="target" position={Position.Left} style="background: #555;" {isConnectable} />
<div>
	Custom Color Picker Node: <strong>{label}</strong>
	<Button>Delete Family Member</Button>
</div>

<Handle
	type="source"
	position={Position.Right}
	id="a"
	style="top: 10px; background: #555;"
	{isConnectable}
/>
<Handle
	type="source"
	position={Position.Right}
	id="b"
	style="bottom: 10px; top: auto; background: #555;"
	{isConnectable}
/>

<style>
	:global(.svelte-flow__node-familyMemberNode) {
		padding: 5px;
		font-size: 12px;
		background: #eee;
		border: 1px solid #555;
		border-radius: 5px;
		text-align: center;
	}
</style>
