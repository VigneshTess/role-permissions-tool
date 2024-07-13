<script>
  import { Route } from "tinro";
  import Home from "./Components/Home.svelte";
  import Navbar from "./Components/Navbar.svelte";
  import Addroles from "./Components/Addroles.svelte";
    import Addpermissions from "./Components/Addpermissions.svelte";
  

</script>

<Route path="/">
  <Navbar>
    <Home />
  </Navbar>
</Route>

<Route path="/addrole">
  <Navbar>
    <Addroles/>
  </Navbar>
</Route>

<Route path="/addpermission">
  <Navbar>
    <Addpermissions/>
  </Navbar>
</Route>