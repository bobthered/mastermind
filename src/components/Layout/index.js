export { default as default } from './Default.svelte';
export { default as Full } from './Full.svelte';
export { default as TwoRows } from './TwoRows.svelte';
export { default as ThreeRows } from './ThreeRows.svelte';

export const backButtonClickHandler = () => {if ( window?.history ) window.history.back();}