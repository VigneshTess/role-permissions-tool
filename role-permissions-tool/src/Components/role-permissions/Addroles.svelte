<script>
  import { writable } from 'svelte/store';
  import { onMount } from "svelte";
  import Loader from "../loader/Loader.svelte";
  import { RESTClient } from "../../Utils/RestClient";
  import Toast from "../../Services/ToastService";

  // Store for the selected option
  let selectedType = "Select a type";

  // Store for dropdown visibility
  let dropdownOpen = writable(false);

  // Function to select an option and close the dropdown
  const selectType = (option) => {
      selectedType = option
      dropdownOpen.set(false);
  };

  const roles = new RESTClient("role");
  let allRoles;

  const refreshRoles = async () => {
    roles.get("/").then((response)=>{
      allRoles = [...response]
    })
  }

  onMount(()=>{
    refreshRoles();
  })
    let newRole;
    let newDescription;
    let showForm = false;

    // Function to add a new permission
    const addRole = async () => {
      let result = await roles.post("/",{code:newRole,description:newDescription,type:selectedType})
      if(result.message){
        console.error(result.message)
      }
      else{
        Toast.success("role added successfully")
        newRole = "";  // Clear the input
        newDescription = "";
        selectedType = "Select a type"
        showForm = false; // Hide the form
        refreshRoles();
      }
    };

    const onEdit = () => {
      
    }
</script>

<Loader/>
<div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full h-screen">
  <div class="flex align-middle">
    <h1 class="text-4xl font-bold text-blue-500 p-3 inline-block">Roles</h1>
    <button
      type="button"
      class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1 me-2 mb-2 mt-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      on:click={() => showForm=true}
    >
      Add New Role
    </button>
  </div>
  <div class="table-container">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
          <tr>
              <th scope="col" class="px-6 py-3">
                Role
              </th>
              <th scope="col" class="px-2 py-3">
                Type
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
          {#if allRoles}
            {#each allRoles as role}
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {role.code}
                </th>
                <td class="">
                  {role.type}
                </td>
                <td class="">
                  {role.description}
                </td>
                <td>
                  <button on:click={() => onEdit()} type="button" class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-1.5 my-1 text-center me-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800">edit</button>
                  <button type="button" class="text-red-700 hover:text-white hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 my-1 text-center me-2dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">delete</button>
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
      <div class="bg-white p-8 rounded-lg shadow-lg relative w-4/12">
          <h2 class="text-2xl font-semibold mb-6">Add New Role</h2>
          <!-- <label for="type" class="block text-sm font-medium text-gray-700">Select type</label> -->
          <span>Type:</span>&nbsp;
          <div class="dropdown" class:open={$dropdownOpen}>
            <button class="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition duration-200 ease-in-out" on:click={() => dropdownOpen.set(!$dropdownOpen)}>
              {selectedType}
            </button>
            <div class="dropdown-menu">
              <div on:click={() => selectType('admin')}>admin</div>
              <div on:click={() => selectType('vendor')}>vendor</div>
            </div>
          </div>
          <label for="role" class="block text-sm font-medium text-gray-700 mt-4">Role code</label>
            <input id="role" type="text" bind:value={newRole} class="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
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
  .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-menu {
        display: none;
        position: absolute;
        background-color: #fff;
        min-width: 160px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        z-index: 1;
    }

    .dropdown-menu div {
        color: black;
        padding: 12px 16px;
        text-decoration: none;
        display: block;
    }

    .dropdown-menu div:hover {
        background-color: #ddd;
        cursor: pointer;
    }

    .dropdown.open .dropdown-menu {
        display: block;
    }
</style>