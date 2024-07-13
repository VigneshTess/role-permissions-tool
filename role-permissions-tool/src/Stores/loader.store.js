// src/stores/loaderStore.js
import { writable } from 'svelte/store';

export const loader = writable(false); // This store holds the visibility state of the loader
