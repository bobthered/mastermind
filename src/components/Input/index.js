// import
import { get } from 'svelte/store';
import { theme } from '$stores';

// deconstruct theme
const { primaryRingColor, textColor } = get(theme);

export const classes = `font-light appearance-none rounded-[.625rem] bg-white bg-opacity-[.05] py-[1rem] px-[1.5rem] outline-none transition duration-200 ring-4 ring-opacity-0 focus:ring-opacity-[.3] ${primaryRingColor} ${textColor}`;
export { default as default } from './Default.svelte';
export { default as Email } from './Email.svelte';
export { default as Password } from './Password.svelte';
export { default as Text } from './Text.svelte';