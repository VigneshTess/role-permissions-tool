<script>
    import { onMount } from 'svelte';
    import { selectedType, selectedRole, permissions } from './Stores/store.js';
  
    let roleOptions = [];
  
    $: if ($selectedType === "Admin") {
      roleOptions = ["Admin Role 1", "Admin Role 2"];
    } else if ($selectedType === "Vendor") {
      roleOptions = ["Vendor Role 1", "Vendor Role 2"];
    }
  
    onMount(() => {
      selectedRole.set(roleOptions[0]);
    });
  </script>
  
  <div class="mb-4">
    <label for="role" class="block text-sm font-medium text-gray-700">Select Role:</label>
    <select id="role" bind:value={$selectedRole} class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
      {#each roleOptions as option}
        <option value={option}>{option}</option>
      {/each}
    </select>
  </div>
  <div class="bg-gray-50 p-4 rounded-lg shadow-inner">
    <h2 class="text-xl font-semibold mb-2 text-indigo-600">Permissions:</h2>
    <ul class="list-disc pl-5">
      {#each $permissions as permission}
        <li class="text-gray-700">{permission}</li>
      {/each}
    </ul>
  </div>
  