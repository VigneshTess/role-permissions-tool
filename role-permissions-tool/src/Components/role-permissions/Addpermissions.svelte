<script>
  import { onMount } from "svelte";
  import Loader from "../loader/Loader.svelte";
  import { RESTClient } from "../../Utils/RestClient";
  import Toast from "../../Services/ToastService";

  const permissions = new RESTClient("permission");
  let allPermissions;

  const refreshPermissions = async () => {
    permissions.get("/").then((response)=>{
      allPermissions = [...response]
    })
  }

  onMount(()=>{
    refreshPermissions();
  })
    let newPermission;
    let newDescription;

    let showForm = false;

    // Function to add a new permission
    const addRole = async () => {
      let result = await permissions.post("/",{code:newPermission,description:newDescription})
      if(result.message){
        console.error(result.message)
      }
      else{
        Toast.success("permission added successfully")
        newPermission = "";  // Clear the input
        newDescription = "";
        showForm = false; // Hide the form
        refreshPermissions();
      }
    };
</script>

<Loader/>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-screen">
  <div class="flex align-middle">
    <h1 class="text-4xl font-bold text-blue-500 p-3 inline-block">Permissions</h1>
    <button
      type="button"
      class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1 me-2 mb-2 mt-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      on:click={() => showForm=true}
    >
      Add New Permission
    </button>
  </div>
  <div class="table-container">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
          <tr>
              <th scope="col" class="px-6 py-3">
                  Permission
              </th>
              <th scope="col" class="px-2 py-3">
                  Description
              </th>
          </tr>
      </thead>
      <tbody>
          {#if allPermissions}
            {#each allPermissions as permission}
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {permission.code}
                </th>
                <td class="">
                  {permission.description}
                </td>
              </tr>
            {/each}
          {/if}
      </tbody>
    </table>
  </div>
</div>

{#if showForm}
  <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div class="bg-white p-8 rounded-lg shadow-lg relative">
          <h2 class="text-2xl font-semibold mb-6">Add New Permission</h2>
          <label for="role" class="block text-sm font-medium text-gray-700">Permission code</label>
          <input id="role" type="text" bind:value={newPermission} class="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
          <label for="roleDescription" class="block text-sm font-medium text-gray-700 mt-4">Description:</label>
          <input id="roleDescription" type="text" bind:value={newDescription} class="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <div class="mt-6 flex justify-end space-x-3">
              <button class="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition duration-200 ease-in-out" on:click={addRole}>
                  Submit
              </button>
              <button class="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition duration-200 ease-in-out" on:click={() => showForm=false}>
                  Cancel
              </button>
          </div>
      </div>
  </div>
{/if}

<style>
  .table-container{
    max-height: 85vh;
    overflow: scroll;
  }
</style>