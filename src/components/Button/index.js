export const defaultClasses = `font-medium text-center appearance-none rounded-full py-[1rem] px-[1.5rem] outline-none ring-4 ring-opacity-0 transition duration-200 flex justify-center focus:ring-opacity-[.3]`
export const generateClasses = (theme, flavor) => flavor === 'primary' ? `${defaultClasses} ${theme.primaryBgColor} ${theme.primaryContrastTextColor} ${theme.primaryRingColor}` : flavor === 'secondary' ? `${defaultClasses} ${theme.contrastBgColor} bg-opacity-[.05] ${theme.primaryRingColor}` : flavor === 'error' ? `${defaultClasses} bg-red-500 text-white ring-red-500` : ''

export { default as default } from './Default.svelte';
export { default as Button } from './Button.svelte';
export { default as Icon } from './Icon.svelte';