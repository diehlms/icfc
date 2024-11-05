<script lang="ts">
	import {
		Sidebar,
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
		Users
	} from 'svelte-heros-v2';
	import { userStore } from '$lib/stores';
	import type { userIn } from '$lib/client';

	let user: userIn;
	let initials: string;

	userStore.subscribe((value) => {
		user = value;
		getInitials();
	});

	function getInitials(): void {}

	$: initials;
	$: user;
</script>

<Sidebar>
	<SidebarWrapper class="bg-transparent">
		<SidebarGroup>
			<SidebarDropdownWrapper label="Reservations">
				<svelte:fragment slot="icon">
					<Ticket
						class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
					/>
				</svelte:fragment>
				<SidebarDropdownItem href="/" label="In Season" />
				<SidebarDropdownItem href="/" label="Out of Season" />
			</SidebarDropdownWrapper>
			<SidebarDropdownWrapper label="Camp Info">
				<svelte:fragment slot="icon">
					<EllipsisHorizontalCircle
						class="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
					/>
				</svelte:fragment>
				<SidebarDropdownItem href="/camp-info/archives" label="Archives" />
				<SidebarDropdownItem href="/camp-info/customs" label="Customs" />
				<SidebarDropdownItem href="/camp-info/committeeprimer" label="Committees" />
				<SidebarDropdownItem href="/camp-info/membership" label="Membership" />
				<SidebarDropdownItem href="/camp-info/forms" label="Forms" />
				<SidebarDropdownItem href="/camp-info/history" label="History" />
				<SidebarDropdownItem href="/camp-info/bylaws" label="By Laws" />
				<SidebarDropdownItem href="/camp-info/charitablegiving" label="Charitable Giving" />
				<SidebarDropdownItem href="/camp-info/familyagreements" label="Family Agreements Policy" />
				<SidebarDropdownItem href="/camp-info/plannedgiving" label="Planned Giving" />
			</SidebarDropdownWrapper>
			<SidebarItem href="/profile" label="Profile">
				<svelte:fragment slot="icon">
					<UserCircle />
				</svelte:fragment>
			</SidebarItem>
			<SidebarItem href="/photos" label="Photos">
				<svelte:fragment slot="icon">
					<Photo />
				</svelte:fragment>
			</SidebarItem>
			<SidebarItem href="/articles" label="Articles">
				<svelte:fragment slot="icon">
					<ChatBubbleLeftEllipsis />
				</svelte:fragment>
			</SidebarItem>
			<SidebarItem href="/events" label="Events">
				<svelte:fragment slot="icon">
					<CalendarDays />
				</svelte:fragment>
			</SidebarItem>
			<SidebarItem href="/charts" label="Charts">
				<svelte:fragment slot="icon">
					<Clipboard />
				</svelte:fragment>
			</SidebarItem>
			<SidebarItem href="/rideshares" label="Rideshares">
				<svelte:fragment slot="icon">
					<Map />
				</svelte:fragment>
			</SidebarItem>
			<SidebarItem href="/cabins" label="Cabins">
				<svelte:fragment slot="icon">
					<Home />
				</svelte:fragment>
			</SidebarItem>
			<SidebarItem href="/directory" label="Users">
				<svelte:fragment slot="icon">
					<Users />
				</svelte:fragment>
			</SidebarItem>
			<SidebarItem href="/family-trees" label="Family Trees">
				<svelte:fragment slot="icon">
					<UserGroup />
				</svelte:fragment>
			</SidebarItem>
		</SidebarGroup>
	</SidebarWrapper>
</Sidebar>
