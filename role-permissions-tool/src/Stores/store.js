import { writable, derived } from 'svelte/store';

export const selectedType = writable(null);
export const selectedRole = writable(null);

const adminPermissions = {
  "Admin Role 1": ["Permission A1", "Permission A2"],
  "Admin Role 2": ["Permission A3", "Permission A4"],
  "Admin Role 3": ["Permission A1", "Permission A2"],
  "Admin Role 4": ["Permission A3", "Permission A4"],
  "Admin Role 5": ["Permission A1", "Permission A2"],
  "Admin Role 6": ["Permission A3", "Permission A4"],
  "Admin Role 7": ["Permission A1", "Permission A2"],
  "Admin Role 8": ["Permission A3", "Permission A4"],
  "Admin Role 9": ["Permission A1", "Permission A2"],
  "Admin Role 10": ["Permission A3", "Permission A4"],
};

const vendorPermissions = {
  "Vendor Role 1": ["Permission V1", "Permission V2"],
  "Vendor Role 2": ["Permission V3", "Permission V4"]
};

export const roles = derived(selectedType, $selectedType => {
  if ($selectedType === 'Admin') {
    return Object.keys(adminPermissions);
  } else if ($selectedType === 'Vendor') {
    return ["Vendor Role 1", "Vendor Role 2"];
  }
  return [];
});

export const permissions = derived([selectedType, selectedRole], ([$selectedType, $selectedRole]) => {
  if ($selectedType === 'Admin') {
    return adminPermissions[$selectedRole] || [];
  } else if ($selectedType === 'Vendor') {
    return vendorPermissions[$selectedRole] || [];
  }
  return [];
});

export const typeOptions = [ "Admin" , "Vendor" ]
