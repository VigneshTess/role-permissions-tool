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
    let selectedPermission = null;
    let showEditPopup = false;
    let showDeletePopup = false;

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

    const onEditPermission = permission => {
      selectedPermission = {...permission};
      showEditPopup = true;
    }

    const onDeletePermission = permission => {
      selectedPermission = {...permission};
      showDeletePopup = true;
    }

    const confirmEdit = async () => {
      const response = await permissions.put(`/${selectedPermission._id}`,{code : selectedPermission.code, description: selectedPermission.description})
      if(response.message){
        console.error(response.message)
      }
      else{
        Toast.success("permission edited successfully")
        selectedPermission = null
        showEditPopup = false; // Hide the form
        refreshPermissions();
      }
    }
    const onConfirmDelete = async () => {
      const response = await permissions.delete(`/${selectedPermission._id}`)
      if(response.message){
        console.error(response.message)
      }
      else{
        Toast.success("role deleted successfully")
        selectedPermission = null
        showDeletePopup = false; // Hide the form
        refreshPermissions();
      }
    }

</script>

<Loader/>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-screen">
  <div class="flex align-middle relative">
    <h1 class="text-4xl font-bold text-sky-500 p-3 inline-block">Permissions</h1>
    <button
      type="button"
      class="absolute end-0 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-3 me-2 mb-2 mt-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
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
              <th scope="col" class="px-2 py-3">
                  Actions
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
                <td>
                  <button on:click={() => onEditPermission(permission)} type="button" class="text-gray-900 hover:text-white border border-gray-400 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-1.5 my-1 text-center me-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">edit</button>
                  <button on:click={() => onDeletePermission(permission)} type="button" class="text-red-700 hover:text-white border border-red-800 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 my-1 text-center me-2dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">delete</button>
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

{#if showEditPopup}
  <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div class="bg-white p-8 rounded-lg shadow-lg relative w-4/12">
          <h2 class="text-2xl font-semibold mb-6">Edit Permission</h2>
          <label for="role" class="block text-sm font-medium text-gray-700 mt-4">Permission code</label>
            <input id="role" type="text" bind:value={selectedPermission.code} class="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
            <label for="roleDescription" class="block text-sm font-medium text-gray-700 mt-4">Description:</label>
            <input id="roleDescription" type="text" bind:value={selectedPermission.description} class="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          <div class="mt-6 flex justify-end space-x-3">
              <button class="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition duration-200 ease-in-out" on:click={confirmEdit}>
                  Confirm
              </button>
              <button class="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition duration-200 ease-in-out" on:click={() => showEditPopup=false}>
                  Cancel
              </button>
          </div>
      </div>
  </div>
{/if}

{#if showDeletePopup}
  <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div class="bg-white p-8 rounded-lg shadow-lg relative w-4/12">
          <h2 class="text-2xl font-semibold mb-6 text-center">Confirm Delete</h2>
          <p class="font-semibold mb-6">Are you sure you want to delete the permission "{selectedPermission.code}"?</p>
          <div class="mt-6 flex justify-center space-x-3">
              <button class="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition duration-200 ease-in-out" on:click={onConfirmDelete}>
                  Confirm
              </button>
              <button class="bg-blue-400 text-white px-4 py-2 rounded shadow hover:bg-blue-500 transition duration-200 ease-in-out" on:click={() => showDeletePopup=false}>
                  Cancel
              </button>
          </div>
      </div>
  </div>
{/if}

<style>
  .table-container{
    max-height: 92vh;
    overflow-y: auto;
  }
</style>