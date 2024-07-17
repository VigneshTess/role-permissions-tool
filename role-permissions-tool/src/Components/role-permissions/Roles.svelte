<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    // Store for roles
    let roles = writable([]);

    // Store for form visibility
    let showForm = writable(false);

    // Store for new role input
    let newRole = writable('');
    let newRoleType = writable('');

    // Function to load roles (mocked data for this example)
    const loadRoles = () => {
        roles.set([
            { name: 'Admin', type: 'Full Access' },
            { name: 'Editor', type: 'Write Access' },
            { name: 'Viewer', type: 'Read Only' }
        ]);
    };

    // Function to add a new role
    const addRole = () => {
        roles.update(currentRoles => [...currentRoles, { name: newRole, type: newRoleType }]);
        newRole.set(''); // Clear the input
        newRoleType.set(''); // Clear the input
        showForm.set(false); // Hide the form
    };

    // Load roles on component mount
    onMount(() => {
        loadRoles();
    });
</script>

<div class="container mx-auto p-4 min-h-screen">
    <h1 class="text-4xl font-bold mb-8 text-gray-800">Roles</h1>
    <ul class="divide-y divide-gray-700">
        {#each $roles as role}
            <li class="flex justify-between p-3 bg-gray-800 border border-gray-700 shadow-md hover:bg-gray-700 transition duration-200 ease-in-out">
                <span class="text-lg font-semibold text-white">{role.name}</span>
                <span class="text-sm text-gray-400">{role.type}</span>
            </li>
        {/each}
    </ul>
    <button class="bg-blue-600 text-white px-4 py-2 rounded shadow mt-6 hover:bg-blue-700 transition duration-200 ease-in-out" on:click={() => showForm.set(true)}>
        Add New Role
    </button>

    {#if $showForm}
        <div class="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
            <div class="bg-white p-8 rounded-lg shadow-lg relative">
                <h2 class="text-2xl font-semibold mb-6">Add New Role</h2>
                <label for="role" class="block text-sm font-medium text-gray-700">Role Name:</label>
                <input id="role" type="text" bind:value={$newRole} class="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

                <label for="roleType" class="block text-sm font-medium text-gray-700 mt-4">Role Type:</label>
                <input id="roleType" type="text" bind:value={$newRoleType} class="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

                <div class="mt-6 flex justify-end space-x-3">
                    <button class="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700 transition duration-200 ease-in-out" on:click={addRole}>
                        Submit
                    </button>
                    <button class="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition duration-200 ease-in-out" on:click={() => showForm.set(false)}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    {/if}
</div>
