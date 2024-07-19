<script>
    import { onMount } from 'svelte';
    import { selectedRole, selectedType , typeOptions } from '../../Stores/store.js';
    import { RESTClient } from '../../Utils/RestClient.js';
    import Loader from '../loader/Loader.svelte';
    import Toast from '../../Services/ToastService.js';

    let type = null;
    let allRoles = null;
    let currentRole = null;
    let allPermissions;
    let currentPermissions;
    let selectedPermissions = [];
    let tempSelected = [];
    let tempDeselected = [];
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
        let temp = response.filter((p)=>{
          return !currentRole.permissions.includes(p.code)
        })
        allPermissions = [...temp]
      })
    }
    selectedType.subscribe((value)=>{
      type = value
      if(value){
        // document.getElementById('role').selectedIndex = 0;
        currentRole = null;
      }
    })

    const handleCheck = (e,type) => {
      if(type==="select"){
        if(e.target.checked){
          tempSelected = [...tempSelected,e.target.value]
        }
        else{
          let temp = [...tempSelected]
          temp.splice(tempSelected.indexOf(e.target.value),1)
          tempSelected = [...temp]
        }
        console.log(tempSelected)
      }
      else{
        if(e.target.checked){
          tempDeselected = [...tempDeselected,e.target.value]
        }
        else{
          let temp = [...tempDeselected]
          temp.splice(tempDeselected.indexOf(e.target.value),1)
          tempDeselected = [...temp]
        }
        console.log(tempDeselected)
      }
    }

    const clearCheckboxes = () => {
      let checkboxes = document.querySelectorAll('.reset-btn');
      checkboxes.forEach(checkbox => {
        // checkbox.checked = false;
      });
    }

    const handleChange = (type) => {
      if(type==="select"){
        let temp = allPermissions.filter((p)=>{
          return !tempSelected.includes(p.code)
        })
        currentPermissions = [...currentPermissions,...tempSelected]
        allPermissions = [...temp]
      }
      if(type==="deselect"){
        let temp = currentPermissions.filter((p)=>{
          return !tempDeselected.includes(p)
        })
        currentPermissions = [...temp]
        let temp2 = [];
        tempDeselected.forEach((p)=>{
          temp2.push({code:p})
        })
        allPermissions = [...allPermissions,...temp2]
      }
      clearCheckboxes();
      tempSelected = [];
      tempDeselected = [];
    }

    const saveChanges = async () => {
      let result = await rest.put(`/${currentRole._id}`,{permissions:currentPermissions})
      if(result.message){
        console.error(result.message)
      }
      else{
        Toast.success("permissions assigned sucessfully");
        clearCheckboxes();
      }
    }

</script>

<Loader/>
<div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 w-full">
    <div class="bg-white shadow-md rounded-lg p-6 w-full h-screen">
      <h1 class="text-3xl font-bold mb-6 text-center text-sky-500">Role and Permissions</h1>
      <div class="flex">
        <div class="me-5">
          <label for="type" class="block text-sm font-medium text-gray-700">Select Type:</label>
          <select
            id="type"
            on:change={handleType}
            class="mb-4 mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-slate-100"
          >
            <option disabled selected >select a type</option>
            {#each typeOptions as option}
              <option class="bg-white" value={option}>{option}</option>
            {/each}
          </select>
        </div>
        {#if allRoles}
          <div class="mb-4 w-2/5">
            <label for="role" class="block text-sm font-medium text-gray-700">Select Role:</label>
            <select id="role" on:change={handleRole} class="mt-1 w-full block pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-slate-100">
              <option disabled selected >select a role</option>
              {#each allRoles as option}
                {#if option.type===type}
                  <option class="bg-white" value={JSON.stringify(option)}>{option.code}</option>
                {/if}
              {/each}
            </select>
          </div>
        {/if}
      </div>
      {#if currentRole}
        <h2 class="text-xl font-semibold mb-2 text-sky-500">Permissions: {currentRole.code}</h2>
        <div class="bg-white p-4 rounded-md flex justify-evenly">
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-5/12 table-div">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                    <tr class="">
                        <th scope="col" class="px-2 py-3">
                          select
                        </th>
                        <th scope="col" class="px-3 py-3">
                          Code
                        </th>
                    </tr>
                </thead>
                <tbody class="overflow-y-auto">
                  {#if allPermissions}
                    {#each allPermissions as permission}
                      {#if !currentPermissions.includes(permission.code)}
                        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <td scope="row" class="px-2 py-2">
                            <input
                              type="checkbox"
                              value={permission.code}
                              on:click={(e)=>{handleCheck(e,"select")}}
                              class="reset-btn"
                            />
                          </td>
                          <th class="px-3 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {permission.code}
                          </th>
                        </tr>
                      {/if}
                    {/each}
                  {/if}
                </tbody>
            </table>
          </div>
          <div class="flex flex-col justify-between">
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore invalid-html-attribute -->
            <svg on:click={()=>{handleChange('select')}} class="size-10 h-10 w-10 text-green-500 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
            </svg>
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore invalid-html-attribute -->
            <svg on:click={()=>{handleChange('deselect')}} class="size-10 h-10 w-10 text-red-500 hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width={1.5} stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
            </svg>                               
          </div>
          <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-5/12 table-div">
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                    <tr class="">
                        <th scope="col" class="px-2 py-3">
                          select
                        </th>
                        <th scope="col" class="px-3 py-3">
                          Existing permissions
                        </th>
                    </tr>
                </thead>
                <tbody class="overflow-y-auto">
                  {#if allPermissions}
                    {#each currentPermissions as permission}
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td scope="row" class="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <input
                            type="checkbox"
                            value={permission}
                            on:click={(e)=>{handleCheck(e,"deselect")}}
                            class="reset-btn"
                          />
                        </td>
                        <th class="px-3 py-2">
                          {permission}
                        </th>
                      </tr>
                    {/each}
                  {/if}
                </tbody>
            </table>
          </div>
        </div>
        <button
          type="button"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          on:click={saveChanges}
        >
          Save Changes
        </button>
      {/if}
    </div>
  </div>

<style>
  .table-div{
    max-height: 60vh;
  }

  /* .check {
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
  } */

</style>