<!-- src/components/Navbar.svelte -->
<script>
    import { router } from 'tinro';

    const navigate = (link="") => {
        router.goto(`/${link}`)
    }
    
</script>
  
<nav class="bg-gray-800 p-4">
  <div class="container mx-auto flex justify-between items-center">
    <span on:click={()=>{navigate()}} class="text-white text-lg font-semibold cursor-pointer">Home</span>
    <div class="space-x-4">
        <span on:click={()=>{navigate('addrole')}} class="text-white text-lg font-semibold cursor-pointer">Add roles</span>
        <span on:click={()=>{navigate('addpermission')}} class="text-white text-lg font-semibold cursor-pointer">Add permissions</span>
      <!-- Add more navigation links as needed -->
    </div>
  </div>
</nav>
<slot></slot>
  
<style>
  
</style>