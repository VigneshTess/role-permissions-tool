<script>
  import { Route } from "tinro";
  import Addroles from "./Components/role-permissions/Addroles.svelte";
  import Addpermissions from "./Components/role-permissions/Addpermissions.svelte";
  import AssignPermissions from "./Components/role-permissions/AssignPermissions.svelte";
  import Sidebar from "./Components/sidebar/Sidebar.svelte";


</script>


<Route path="/assignpermissions">
  <Sidebar>
    <AssignPermissions/>
  </Sidebar>
</Route>
<Route path="/manageroles">
  <Sidebar>
    <Addroles/>
  </Sidebar>
</Route>
<Route path="/managepermissions">
  <Sidebar>
    <Addpermissions/>
  </Sidebar>
</Route>


