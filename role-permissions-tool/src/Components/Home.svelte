<script>
    import { onMount } from 'svelte';
    import { selectedType , typeOptions } from '../Stores/store.js';
    import Loader from './Loader.svelte';
    import { RESTClient } from '../Utils/RestClient.js';
    import Toast from '../Services/ToastService.js';

    let type = null;
    let roles = null;
    const rest = new RESTClient("role-permissions")

    onMount(() => {
        //selectedType.set(typeOptions[0]);
    });
    const handleType = (e) => {
        selectedType.update(n => e.target.value)
        rest.get('/roles/admin').then((data)=>{
            if(data.length<1){
                Toast.error("no roles to show at the moment...")
            }
        })
    }
    selectedType.subscribe((value)=>{
        type = value 
    })
</script>

<Loader/>
<div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
    <div class="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
      <h1 class="text-3xl font-bold mb-6 text-center text-indigo-600">Role and Permissions</h1>
      <label for="type" class="block text-sm font-medium text-gray-700">Select Type:</label>
      <select id="type" on:change={handleType} class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
        <option disabled selected >select a type</option>
        {#each typeOptions as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
      {#if roles}
        <div class="mb-4">
          <label for="role" class="block text-sm font-medium text-gray-700">Select Role:</label>
          <select id="role" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
            {#each roles as option}
              <option value={option}>{option}</option>
            {/each}
          </select>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h2 class="text-xl font-semibold mb-2 text-indigo-600">Permissions:</h2>
          <ul class="list-disc pl-5">
            <!-- {#each $permissions as permission}
              <li class="text-gray-700">{permission}</li>
            {/each} -->
          </ul>
        </div>
      {/if}
    </div>
  </div>