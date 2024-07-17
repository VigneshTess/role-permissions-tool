import { writable, derived } from 'svelte/store';

export const selectedType = writable(null);
export const selectedRole = writable(null);
export const typeOptions = [ "admin" , "vendor" ]

