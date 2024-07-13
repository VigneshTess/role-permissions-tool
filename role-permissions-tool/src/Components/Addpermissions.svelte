<script>
    import { onMount } from 'svelte';
    import Loader from './Loader.svelte';
    import { RESTClient } from '../Utils/RestClient.js';
    import { selectedType , typeOptions } from '../Stores/store.js';

    const rest = new RESTClient("role-permissions");
    let type = null;

    onMount(() => {
        //selectedType.set(typeOptions[0]);
    });
    const handleChange = (e) => {
        selectedType.set(e.target.value)
    }

    selectedType.subscribe((value)=>{
        type = value 
    })
    let role = ''; // Variable to hold the role input

// Function to handle form submission
const handleSubmit = (e) => {
  e.preventDefault();
  // Here you would handle the role input, e.g., sending it to a server
  console.log('Submitted role:', role);
  // Reset the input after submission if needed
  role = '';
}
    
</script>

<Loader/>
<div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
  <div class="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
    <h1 class="text-3xl font-bold mb-6 text-center text-indigo-600">Add Permission</h1>
    <label for="type" class="block text-sm font-medium text-gray-700">Select Type:</label>
    <select id="type" on:change={handleChange} class="bg-slate-50 mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
      <option disabled selected >select a type</option>
      {#each typeOptions as option}
        <option value={option}>{option}</option>
      {/each}
    </select>
    <form on:submit={handleSubmit} class="space-y-4">
      <div>
        <label for="role" class="block text-sm font-medium text-gray-700">Permission</label>
        <input
          id="role"
          type="text"
          bind:value={role}
          placeholder="Enter permission here"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        class="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  </div>
</div>