<script lang="ts">
	import {
		Drawer,
		Sidebar,
		SidebarBrand,
		SidebarDropdownItem,
		SidebarDropdownWrapper,
		SidebarGroup,
		SidebarItem,
		SidebarWrapper
	} from 'flowbite-svelte';
	import {
		UserCircle,
		CalendarDays,
		ChatBubbleLeftEllipsis,
		Photo,
		UserGroup,
		Home,
		EllipsisHorizontalCircle,
		Ticket,
		Map,
		Clipboard,
		Users,
		Bars3CenterLeft,
		Cog
	} from 'svelte-heros-v2';
	import { userStore } from '$lib/stores';
	import { sineIn } from 'svelte/easing';
	import { onMount } from 'svelte';
	import {
		PUBLIC_INSEASON_RESERVATION_LINK,
		PUBLIC_OUTSEASON_RESERVATION_LINK
	} from '$env/static/public';
	import mapleleaf from '../../../assets/images/mapleleaf.png';

	let sidebarOpen = true;
	let showAdminLinks = false;
	let transitionParams = {
		x: -320,
		duration: 200,
		easing: sineIn
	};
	let breakPoint: number = 1024;
	let width: number;
	let backdrop: boolean = false;
	let activateClickOutside = true;
	let drawerHidden: boolean = false;
	let user: any;
	let initials: any;
	let site = {
		name: 'ICFC',
		href: '/',
		img: mapleleaf
	};

	$: if (width >= breakPoint) {
		drawerHidden = false;
		activateClickOutside = false;
	} else {
		drawerHidden = true;
		activateClickOutside = true;
	}

	onMount(() => {
		if (width >= breakPoint) {
			drawerHidden = false;
			activateClickOutside = false;
		} else {
			drawerHidden = true;
			activateClickOutside = true;
		}
	});

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	userStore.subscribe((value) => {
		user = value;
		if (!!user.admin) {
			showAdminLinks = true;
		}
	});

	$: initials;
	$: user;
</script>

<div class="button-container bg-emerald-900">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="toggle-button" on:click={toggleSidebar}>
		<Bars3CenterLeft class="text-color-white" />
	</div>
</div>

<Drawer
	transitionType="fly"
	{backdrop}
	{transitionParams}
	hidden={!sidebarOpen}
	bind:activateClickOutside
	class="overflow-scroll bg-emerald-950"
	id="sidebar"
>
	<Sidebar>
		<SidebarWrapper class="bg-transparent text-emerald-50">
			<SidebarGroup>
				<SidebarBrand {site} />
				<SidebarDropdownWrapper class="text-emerald-50 hover:text-emerald-950" label="Reservations">
					<svelte:fragment slot="icon">
						<Ticket />
					</svelte:fragment>
					<SidebarDropdownItem
						class="text-emerald-50 hover:text-emerald-950"
						href={PUBLIC_INSEASON_RESERVATION_LINK}
						target="_blank"
						label="In Season"
					/>
					<SidebarDropdownItem
						class="text-emerald-50 hover:text-emerald-950"
						href={PUBLIC_OUTSEASON_RESERVATION_LINK}
						target="_blank"
						label="Out of Season"
					/>
				</SidebarDropdownWrapper>
				<SidebarDropdownWrapper class="text-emerald-50 hover:text-emerald-950" label="Camp Info">
					<svelte:fragment slot="icon">
						<EllipsisHorizontalCircle />
					</svelte:fragment>
					<SidebarDropdownItem
						class="text-emerald-50 hover:text-emerald-950"
						href="/camp-info/archives"
						label="Archives"
					/>
					<SidebarDropdownItem
						class="text-emerald-50 hover:text-emerald-950"
						href="/camp-info/customs"
						label="Customs"
					/>
					<SidebarDropdownItem
						class="text-emerald-50 hover:text-emerald-950"
						href="/camp-info/committeeprimer"
						label="Committees"
					/>
					<SidebarDropdownItem
						class="text-emerald-50 hover:text-emerald-950"
						href="/camp-info/membership"
						label="Membership"
					/>
					<SidebarDropdownItem
						class="text-emerald-50 hover:text-emerald-950"
						href="/camp-info/forms"
						label="Forms"
					/>
					<SidebarDropdownItem
						class="text-emerald-50 hover:text-emerald-950"
						href="/camp-info/history"
						label="History"
					/>
					<SidebarDropdownItem
						class="text-emerald-50 hover:text-emerald-950"
						href="/camp-info/bylaws"
						label="By Laws"
					/>
					<SidebarDropdownItem
						class="text-emerald-50 hover:text-emerald-950"
						href="/camp-info/charitablegiving"
						label="Charitable Giving"
					/>
					<SidebarDropdownItem
						class="text-emerald-50 hover:text-emerald-950"
						href="/camp-info/familyagreements"
						label="Family Agreements Policy"
					/>
					<SidebarDropdownItem
						class="text-emerald-50 hover:text-emerald-950"
						href="/camp-info/plannedgiving"
						label="Planned Giving"
					/>
				</SidebarDropdownWrapper>
				<SidebarItem class="text-emerald-50 hover:text-emerald-950" href="/profile" label="Profile">
					<svelte:fragment slot="icon">
						<UserCircle />
					</svelte:fragment>
				</SidebarItem>
				<SidebarItem class="text-emerald-50 hover:text-emerald-950" href="/photos" label="Photos">
					<svelte:fragment slot="icon">
						<Photo />
					</svelte:fragment>
				</SidebarItem>
				<SidebarItem
					class="text-emerald-50 hover:text-emerald-950"
					href="/articles"
					label="Articles"
				>
					<svelte:fragment slot="icon">
						<ChatBubbleLeftEllipsis />
					</svelte:fragment>
				</SidebarItem>
				<SidebarItem class="text-emerald-50 hover:text-emerald-950" href="/events" label="Events">
					<svelte:fragment slot="icon">
						<CalendarDays />
					</svelte:fragment>
				</SidebarItem>
				<SidebarItem class="text-emerald-50 hover:text-emerald-950" href="/charts" label="Charts">
					<svelte:fragment slot="icon">
						<Clipboard />
					</svelte:fragment>
				</SidebarItem>
				<SidebarItem
					class="text-emerald-50 hover:text-emerald-950"
					href="/rideshares"
					label="Rideshares"
				>
					<svelte:fragment slot="icon">
						<Map />
					</svelte:fragment>
				</SidebarItem>
				<SidebarItem class="text-emerald-50 hover:text-emerald-950" href="/cabins" label="Cabins">
					<svelte:fragment slot="icon">
						<Home />
					</svelte:fragment>
				</SidebarItem>
				<SidebarItem class="text-emerald-50 hover:text-emerald-950" href="/directory" label="Users">
					<svelte:fragment slot="icon">
						<Users />
					</svelte:fragment>
				</SidebarItem>
				<SidebarItem
					class="text-emerald-50 hover:text-emerald-950"
					href="/family-trees"
					label="Family Trees"
				>
					<svelte:fragment slot="icon">
						<UserGroup />
					</svelte:fragment>
				</SidebarItem>
			</SidebarGroup>
		</SidebarWrapper>
	</Sidebar>
</Drawer>

<style>
	.button-container {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: 24px; /* Set the width of the skinny button */
		display: flex;
		align-items: center; /* Center content vertically if needed */
		justify-content: center; /* Center icon horizontally */
		/* background-color: lightgrey; Initial color */
		cursor: pointer;
		transition: background-color 0.3s; /* Smooth transition for hover effect */
	}

	.toggle-button:hover {
		background-color: grey; /* Change color on hover */
	}

	.toggle-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%; /* Ensure full button occupies full container width */
		height: 100%; /* Cover entire height of the viewport */
	}
</style>
