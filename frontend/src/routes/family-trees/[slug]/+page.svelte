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
	import type { familyMemberIn } from '$lib/client';
	import updateAuthContext from '$lib/components/services/auth';
	import FamilyMemberNode from './FamilyMemberNode.svelte';

	export let data: any;

	const nodeTypes = {
		familyMemberNode: FamilyMemberNode
	};

	type familyRelationship = {
		parent: string;
		child: string;
	};

	let loading = false;
	let family: any;
	let addFamilyMemberFormOpen: boolean = false;
	let newFamilyMemberName: string = '';
	let relationships: familyRelationship[] = [];

	const handleInput = (event: any) => {
		const { value } = event.target;
		newFamilyMemberName = value;
	};

	let nodes: any = writable([]);
	let edges: any = writable([]);

	onMount(() => {
		client.restClient?.familyTrees
			.getV1FamilyTrees1(data.id)
			.then((data) => {
				family = data;
				syncNodesAndEdges();
				loading = false;
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
	});

	const syncNodesAndEdges = () => {
		// Track the levels for each member (parents, children, etc.)
		const levelMap: { [key: string]: number } = {};
		const positionsMap: { [key: string]: { x: number; y: number } } = {};

		// Initial x and y coordinates (spacing between nodes)
		let currentX = 0;
		const levelYSpacing = 150; // Distance between each level
		const nodeXSpacing = 150; // Horizontal spacing between nodes

		// Calculate levels and positions for each family member
		const calculatePositions = (familyMember: any, level: number) => {
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
		family.family_members.forEach((familyMember: any) => {
			// Initially, assign level 0 to all family members who don't have parents
			if (!familyMember.parent_ids || familyMember.parent_ids.length === 0) {
				calculatePositions(familyMember, 0); // Start from level 0 (root level)
			}
		});

		// Now map positions to nodes
		const nodesFromStore = family.family_members.map((familyMember: any) => ({
			id: familyMember.id.toString(),
			type: 'familyMemberNode',
			data: { label: familyMember.name, id: familyMember.id },
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
						label: 'foobar'
					});
				});
			}
		});

		// Update the nodes and edges with calculated values
		edges.set(edgesFromStore);
		nodes.set(nodesFromStore);
	};

	const client = get(clientStore);
	const user = get(userStore);

	const openAddFamilyMemberForm = () => {
		addFamilyMemberFormOpen = true;
	};

	const addFamilyMember = () => {
		const newFamilyMember = {
			id: `${newFamilyMemberName}-new`,
			type: 'familyMemberNode',
			data: { label: newFamilyMemberName },
			position: { x: Math.random() * 400, y: Math.random() * 400 }
		};

		nodes.update((currentNodes: any) => [...currentNodes, newFamilyMember]);
	};

	const saveFamilyTreeState = () => {
		const familyMembers: familyMemberIn[] = [];

		get(nodes).forEach((node: any) => {
			const newFamilyMember: familyMemberIn = {
				family_tree_id: data.id,
				name: node.data.label
			};
			familyMembers.push(newFamilyMember);
		});

		client.restClient?.familyMembers
			.postV1FamilyMembers(familyMembers)
			.then((_) => {})
			.catch((error) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: error,
					type: ToastTypes.error
				}));
			});

		client.restClient?.familyMembers
			.putV1FamilyMembers(relationships)
			.then(() => {})
			.catch((error) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: error,
					type: ToastTypes.error
				}));
			});
	};

	const deleteFamilyTree = (id: number) => {
		client.restClient?.familyTrees
			.deleteV1FamilyTrees(id, { user_id: user.id as number })
			.then((_) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: 'Family member deleted!',
					type: ToastTypes.success
				}));
			})
			.catch((error) => {
				toastStore.update((prevValue) => ({
					...prevValue,
					isOpen: true,
					toastMessage: error,
					type: ToastTypes.error
				}));
			});
	};

	const handleConnect: OnConnect = (event: any) => {
		let parent = get(nodes).filter((node) => node.id.toString() === event.source.toString());
		let child = get(nodes).filter((node) => node.id.toString() === event.target.toString());

		const newFamilyRelationship: familyRelationship = {
			parent: parent[0].data.id,
			child: child[0].data.id
		};
		relationships.push(newFamilyRelationship);
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
		<Button on:click={openAddFamilyMemberForm}>Add Family Member</Button>
		<Button on:click={saveFamilyTreeState}>Save</Button>
		{#if updateAuthContext.userActionPermitted(family.user_id, user)}
			<Button on:click={() => deleteFamilyTree(family.id)}>Delete Family Tree</Button>
		{/if}
		<Button>Reset</Button>
	</div>

	{#if addFamilyMemberFormOpen}
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
	{/if}

	<div class="mt-3" style:height="60vh">
		<SvelteFlow {nodeTypes} {nodes} {edges} snapGrid={[25, 25]} fitView onconnect={handleConnect}>
			<Controls />
			<Background variant={BackgroundVariant.Dots} />
			<MiniMap />
		</SvelteFlow>
	</div>
{/if}
