// imports
import { get } from 'svelte/store';
import { theme } from '$stores';

// deconstruct theme
const { primaryBgColor, primaryContrastTextColor, primaryRingColor } = get(theme);
export const classes = `font-medium appearance-none rounded-full py-[1rem] px-[1.5rem] text-white outline-none text-white ring-4 ring-opacity-0 transition duration-200 focus:ring-opacity-[.3] ${primaryBgColor} ${primaryContrastTextColor} ${primaryRingColor}`

export { default as default } from './Default.svelte';
export { default as Button } from './Button.svelte';
export { default as Icon } from './Icon.svelte';