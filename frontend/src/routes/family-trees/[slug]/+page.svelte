<script lang="ts">
	import { get, writable } from 'svelte/store';
	import {
		SvelteFlow,
		Controls,
		Background,
		BackgroundVariant,
		MiniMap,
		type OnConnect
	} from '@xyflow/svelte';
	import '@xyflow/svelte/dist/style.css';
	import { Button, Input, Label, Spinner } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import { clientStore, toastStore, ToastTypes, userStore } from '$lib/stores';
	import type { familyMemberIn, familyMemberOut, familyTreeOut } from '$lib/client';
	import updateAuthContext from '$lib/components/services/auth';
	import FamilyMemberNode from './FamilyMemberNode.svelte';
	import { createEntity, deleteEntity } from '$lib/components/services/crud';

	export let data: any;

	const nodeTypes = {
		familyMemberNode: FamilyMemberNode
	};

	type familyRelationship = {
		parent: string;
		child: string;
	};

	let loading = false;
	let family: familyTreeOut | undefined = undefined;
	let newFamilyMemberName: string = '';
	let nodes: any = writable([]);
	let edges: any = writable([]);

	const handleInput = (event: any) => {
		const { value } = event.target;
		newFamilyMemberName = value;
	};

	const fetchData = () => {
		client.restClient?.familyTrees
			.getV1FamilyTrees1(data.id)
			.then((data) => {
				family = data;
				syncNodesAndEdges();
			})
			.catch((error) => {
				loading = false;
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: error,
					type: ToastTypes.error
				}));
			});
	};

	onMount(() => {
		fetchData();
	});

	const syncNodesAndEdges = () => {
		// Track the levels for each member (parents, children, etc.)
		const levelMap: { [key: string]: number } = {};
		const positionsMap: { [key: string]: { x: number; y: number } } = {};

		// Initial x and y coordinates (spacing between nodes)
		let currentX = 0;
		const levelYSpacing = 150; // Distance between each level
		const nodeXSpacing = 100; // Horizontal spacing between nodes

		// Calculate levels and positions for each family member
		const calculatePositions = (familyMember: familyMemberOut, level: number) => {
			// Assign a level if it hasn't been assigned already, or if the current level is deeper
			if (levelMap[familyMember.id] === undefined || levelMap[familyMember.id] < level) {
				levelMap[familyMember.id] = level;

				// Set position for the member at the current level
				positionsMap[familyMember.id] = { x: currentX, y: level * levelYSpacing };
				currentX += nodeXSpacing; // Increment x for the next node horizontally

				// If the member has parents, place them one level above
				if (familyMember.parent_ids) {
					familyMember.parent_ids.forEach((parent_id: any) => {
						const parent = family.family_members.find((fm: any) => fm.id === parent_id);
						if (parent) {
							calculatePositions(parent, level - 1); // Parents should be on the previous level
						}
					});
				}

				// If the member has children, place them one level below
				const children = family.family_members.filter(
					(fm: any) => fm.parent_ids && fm.parent_ids.includes(familyMember.id)
				);
				children.forEach((child: any) => {
					calculatePositions(child, level + 1); // Children should be on the next level
				});
			}
		};

		// Start by calculating positions for each member
		family.family_members.forEach((familyMember: familyMemberOut) => {
			// Initially, assign level 0 to all family members who don't have parents
			if (!familyMember.parent_ids || familyMember.parent_ids.length === 0) {
				calculatePositions(familyMember, 0); // Start from level 0 (root level)
			}
		});

		// Now map positions to nodes
		const nodesFromStore = family.family_members.map((familyMember: familyMemberOut) => ({
			id: familyMember.id.toString(),
			type: 'familyMemberNode',
			data: {
				label: familyMember.name,
				id: familyMember.id,
				author_id: familyMember.user_id,
				user: user
			},
			position: positionsMap[familyMember.id] // Use the calculated positions
		}));

		// Map edges (relationships)
		const edgesFromStore: any[] = [];
		family.family_members.forEach((familyMember: any) => {
			if (familyMember.parent_ids) {
				familyMember.parent_ids.forEach((parent_id: any) => {
					edgesFromStore.push({
						id: `${familyMember.id}-${parent_id}`,
						type: 'default',
						source: parent_id.toString(),
						target: familyMember.id.toString(),
						label: ''
					});
				});
			}
		});
		edges.set(edgesFromStore);
		nodes.set(nodesFromStore);
		loading = false;
	};

	const client = get(clientStore);
	const user = get(userStore);

	const addFamilyMember = async () => {
		nodes.update((currentNodes: any) => [
			...currentNodes,
			{
				id: `${newFamilyMemberName}-new`,
				type: 'familyMemberNode',
				data: { label: newFamilyMemberName, id: undefined, author_id: user.id, user: user },
				position: { x: Math.random() * 400, y: Math.random() * 400 }
			}
		]);
		loading = true;
		createEntity(
			[
				{
					name: newFamilyMemberName,
					family_tree_id: family?.id,
					user_id: user.id
				}
			],
			'Family Member',
			client.restClient?.familyMembers.postV1FamilyMembers.bind(client.restClient.familyMembers)
		)
			.then(() => {
				fetchData();
			})
			.catch((error) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: error.toString(),
					type: ToastTypes.error
				}));
			})
			.finally(() => {
				loading = false;
			});
	};

	const deleteFamilyTree = (id: number) => {
		loading = true;
		deleteEntity(
			id,
			{ user_id: user.id as number },
			'Family Tree',
			client.restClient?.familyTrees.deleteV1FamilyTrees.bind(client.restClient.familyTrees)
		);
		loading = false;
	};

	const handleConnect: OnConnect = async (event: any) => {
		const parent = get(nodes).find((node) => node.id.toString() === event.source.toString());
		const child = get(nodes).find((node) => node.id.toString() === event.target.toString());
		const newFamilyRelationship: familyRelationship = {
			parent: parent.data.id,
			child: child.data.id
		};
		edges.update((currentEdges: any) => [
			...currentEdges,
			{
				id: `${newFamilyRelationship.child}-${newFamilyRelationship.parent}`,
				source: newFamilyRelationship.parent.toString(),
				target: newFamilyRelationship.child.toString(),
				type: 'default',
				label: ''
			}
		]);
		loading = true;
		createEntity(
			[newFamilyRelationship],
			'Relationship',
			client.restClient?.familyMembers.putV1FamilyMembers.bind(client.restClient.familyMembers)
		)
			.then(() => {
				fetchData();
			})
			.catch((error) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: error.toString(),
					type: ToastTypes.error
				}));
			})
			.finally(() => {
				loading = false;
			});
	};

	$: family;
	$: edges;
	$: nodes;
</script>

{#if loading}
	<Spinner />
{:else if family && nodes && edges}
	<p>{family.name}</p>

	<div class="mb-4 mt-4">
		{#if updateAuthContext.userActionPermitted(family.user_id, user)}
			<Button color="red" outline size="xs" on:click={() => deleteFamilyTree(family.id)}
				>Delete Family Tree</Button
			>
		{/if}
	</div>

	<form on:submit={addFamilyMember}>
		<Label class="space-y-2">
			<Input
				type="text"
				placeholder="Press enter when finished"
				size="sm"
				on:change={handleInput}
			/>
		</Label>
	</form>

	<div class="mt-3" style:height="50vh">
		<SvelteFlow {nodeTypes} {nodes} {edges} snapGrid={[25, 25]} fitView onconnect={handleConnect}>
			<Controls />
			<Background variant={BackgroundVariant.Dots} />
			<MiniMap />
		</SvelteFlow>
	</div>
{/if}
