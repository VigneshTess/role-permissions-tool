<script>
    import { onMount } from 'svelte';
    import { selectedType , typeOptions } from '../../Stores/store.js';
    import { RESTClient } from '../../Utils/RestClient.js';
    import Loader from '../loader/Loader.svelte';
    import Toast from '../../Services/ToastService.js';

    let type = null;
    let allRoles = null;
    let currentRole = null;
    let allPermissions;
    let currentPermissions;
    let selectedPermissions = [];
    const rest = new RESTClient("role");
    const permission = new RESTClient("permission");

    onMount(() => {
        rest.get('/').then((data)=>{
          allRoles = [...data]
        })
    });
    const handleType = (e) => {
      selectedType.update(n => e.target.value)
    }
    const handleRole = (e) => {
      currentRole = JSON.parse(e.target.value)
      currentPermissions = [...currentRole.permissions]
      selectedPermissions = [...currentPermissions]
      permission.get('/').then((response)=>{
        allPermissions = [...response]
      })
    }
    selectedType.subscribe((value)=>{
        type = value
    })

    const handlePermission = (code) => {
      if(selectedPermissions.indexOf(code)<0){
        selectedPermissions = [...selectedPermissions,code]
      }
      else{
        let temp = [...selectedPermissions]
        temp.splice(temp.indexOf(code),1)
        selectedPermissions = [...temp]
      }
    }

    const saveChanges = async () => {
      let result = await rest.put(`/${currentRole._id}`,{permissions:[...selectedPermissions]})
      if(result.message){
        Toast.error(result.message)
      }
      else{
        Toast.success("Changes saved successfully")
        rest.get(`/${currentRole._id}`).then((res)=>{
          currentPermissions = [...res.permissions]
          selectedPermissions = [...currentPermissions]
        })
      }
    }

</script>

<Loader/>
<div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 w-full">
    <div class="bg-white shadow-md rounded-lg p-6 w-full h-screen">
      <h1 class="text-3xl font-bold mb-6 text-center text-indigo-600">Role and Permissions</h1>
      <label for="type" class="block text-sm font-medium text-gray-700">Select Type:</label>
      <select id="type" on:change={handleType} class="mb-4 mt-1 block w-3/4 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-slate-50">
        <option disabled selected >select a type</option>
        {#each typeOptions as option}
          <option value={option}>{option}</option>
        {/each}
      </select>
      {#if allRoles}
        <div class="mb-4">
          <label for="role" class="block text-sm font-medium text-gray-700">Select Role:</label>
          <select id="role" on:change={handleRole} class="mt-1 block w-3/4 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-slate-50">
            <option disabled selected >select a role</option>
            {#each allRoles as option}
              {#if option.type===type}
                <option value={JSON.stringify(option)}>{option.code}</option>
              {/if}
            {/each}
          </select>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h2 class="text-xl font-semibold mb-2 text-indigo-600">Permissions:</h2>
          {#if allPermissions}
            <div class="flex justify-between">
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-5/12 max-h-80">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Permission
                            </th>
                            <th scope="col" class="px-2 py-3">
                                action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each allPermissions as permission}
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" class="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {permission.code}
                            </th>
                            <td class="">
                              {#if selectedPermissions.includes(permission.code)}
                              <div class="text-red-500" on:click={()=>{handlePermission(permission.code)}}>
                                  <svg
                                    class="size-6 h-5 w-5 inline-block hover:cursor-pointer"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                  </svg>                                  
                                </div>
                                {:else}                 
                                <div class="text-green-500" on:click={()=>{handlePermission(permission.code)}}>
                                  <svg
                                    class="size-6 h-5 w-5 inline-block hover:cursor-pointer"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                  </svg>                                    
                                </div>                          
                              {/if}
                            </td>
                          </tr>
                        {/each}
                    </tbody>
                </table>
              </div>

              <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-5/12">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                Existing Permissions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each currentPermissions as permission}
                          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {permission}
                            </th>
                          </tr>
                        {/each}
                    </tbody>
                </table>
              </div>
            </div>
            <button
              type="button"
              class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 mt-4 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              on:click={saveChanges}
            >
              Save changes
            </button>
          {/if}
        </div>
      {/if}
    </div>
  </div>

<style>
  .check {
    cursor: pointer;
    position: relative;
    margin: auto;
    width: 18px;
    height: 18px;
    -webkit-tap-highlight-color: transparent;
    transform: translate3d(0, 0, 0);
  }

  .check:before {
    content: "";
    position: absolute;
    top: -15px;
    left: -15px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: rgba(34,50,84,0.03);
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  .check svg {
    position: relative;
    z-index: 1;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: #c8ccd4;
    stroke-width: 1.5;
    transform: translate3d(0, 0, 0);
    transition: all 0.2s ease;
  }

  .check svg path {
    stroke-dasharray: 60;
    stroke-dashoffset: 0;
  }

  .check svg polyline {
    stroke-dasharray: 22;
    stroke-dashoffset: 66;
  }

  /* .check:hover:before {
    opacity: 1;
  } */

  .check:hover svg {
    stroke: #4285f4;
  }

  #cbx:checked + .check svg {
    stroke: #4285f4;
  }

  .cbx:checked + .check svg path {
    stroke-dashoffset: 60;
    transition: all 0.3s linear;
  }

  .cbx:checked + .check svg polyline {
    stroke-dashoffset: 42;
    transition: all 0.2s linear;
    transition-delay: 0.15s;
  }

</style>