<script lang="ts">
	import {
	Button,
	Drawer,
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
		Users,
		Bars3CenterLeft
	} from 'svelte-heros-v2';
	import { userStore } from '$lib/stores';
	import { sineIn } from 'svelte/easing';
	import { onMount } from 'svelte';

	let sidebarOpen = false;  // Manage sidebar open state
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
    getInitials();
  });

  function getInitials(): void {
    // Calculate initials from user data (ensure this function is implemented)
  }

  $: initials;
  $: user;
</script>

<div class="button-container">
  <!-- Using a div styled as a button for full height control -->
  <div class="toggle-button" on:click={toggleSidebar}>
    <Bars3CenterLeft />
  </div>
</div>


<Drawer
	transitionType="fly"
	{backdrop}
	{transitionParams}
	hidden={!sidebarOpen}
	bind:activateClickOutside
	width="w-64"
	class="overflow-scroll pb-32"
	id="sidebar"
>
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
    background-color: lightgrey; /* Initial color */
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

  .toggle-button svg {
    width: 12px; /* Adjust the icon size as necessary */
    height: auto;
    fill: currentColor; /* Ensure the icon takes the current color of the button */
  }
</style>