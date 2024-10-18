<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { Navbar, NavUl, NavHamburger, Button, Avatar, Input } from 'flowbite-svelte';
  import { MagnifyingGlass } from 'svelte-heros-v2';
	import { clientStore, toastStore, ToastTypes } from '$lib/stores';
	import { get } from 'svelte/store';

  let initials: string;
  let searchQuery = '';
  let searchResults = [];  
  let loading = false;
  const dispatch = createEventDispatcher();

  function emitLogOut() {
    dispatch('emitLoggedOut');
  }

  function searchAPI(query: string) {
    client.restClient?.search
      .postV1Search({
        search: query
      })
      .then((data) => {
        searchResults = data
      })
      .catch((error) => {
        toastStore.update((prevValue) => ({
          ...prevValue,
          isOpen: true,
          toastMessage: error,
          type: ToastTypes.error
        }));
      });
    loading = false;
  }

  const client = get(clientStore);

  function handleSearchInput(event: Event) {
    searchQuery = (event.target as HTMLInputElement).value;
    searchAPI(searchQuery);  // Trigger API call when user types
  }

  $: searchResults;
</script>

<div class="relative flex-1">
  <Navbar navClass="sm:px-2 w-full z-20 top-0 left-0 border-b flex justify-between items-center" let:hidden let:toggle>
    <NavHamburger on:click={toggle} class="md:hidden" />
    <div class="flex items-center space-x-2 ml-auto"> 
      <div class="hidden relative md:block">
        <div class="flex absolute inset-y-0 start-0 items-center ps-3 pointer-events-none">
          <MagnifyingGlass class="w-4 h-4" />
        </div>
        <Input id="search-navbar" class="ps-10" placeholder="Search..." on:input={handleSearchInput} />
      </div>
      <NavUl {hidden} class="flex items-center space-x-2">
        <Button color='yellow' class="btn-override px-2 py-1" outline on:click={emitLogOut}>Pay Bill</Button>
      </NavUl>
      <NavUl {hidden} class="flex items-center space-x-2">
        <Button class="btn-override px-2 py-1" outline on:click={emitLogOut}>Log Out</Button>
      </NavUl>
      <div class="flex items-center space-x-4">
        <Avatar>{initials}</Avatar>
      </div>
    </div>
  </Navbar>

  {#if searchResults}
    <ul class="search-results">
      {searchResults}
      <!-- {#each searchResults as result}
        <li><a href={result.url}>{result.title}</a></li>
      {/each} -->
    </ul>
  {/if}
</div>

<style>
  .flex-1 {
    flex: 1;
  }

  .btn-override {
    padding: 0.25rem 0.5rem;
  }

  .ps-10 {
    padding-left: 2.5rem;
  }

  .ml-auto {
    margin-left: auto;
  }

  .space-x-2 {
    gap: 0.5rem;
  }

  .search-results {
    position: absolute;
    background-color: white;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ccc;
    z-index: 1000;
  }

  .search-results li {
    padding: 8px 16px;
    border-bottom: 1px solid #ddd;
  }

  .search-results li a {
    text-decoration: none;
    color: black;
  }

  .search-results li a:hover {
    text-decoration: underline;
  }
</style>
