export const defaultClasses = 'w-[3rem] h-[3rem] flex items-center justify-center rounded-full transition duration-200 ring-4';
export const generateClasses = (color, theme, current = false) => {
  const colorClasses = color === 'pink' ?    `bg-pink-500 text-white ring-pink-500`:
                       color === 'red' ?     `bg-red-500 text-white ring-red-500` :
                       color === 'orange' ?  `bg-orange-500 text-white ring-orange-500`:
                       color === 'yellow' ?  `bg-yellow-500 text-gray-900 ring-yellow-500`:
                       color === 'green' ?   `bg-green-500 text-white ring-green-500`:
                       color === 'blue' ?    `bg-blue-500 text-white ring-blue-500`:
                       color === 'purple' ?  `bg-purple-500 text-white ring-purple-500`:
                       color === 'contrast' ? `${theme.contrastBgColor} ${theme.contrastTextColor} ${theme.ringColor}` : 
                                             `ring-1 ring-opacity-[.1] ${theme.ringColor}`
  return `${defaultClasses} ${colorClasses} ${current ? 'ring-opacity-[.3]' : 'ring-opacity-0'}`
}

export { default as default } from './Default.svelte';
export { default as Button } from './Button.svelte';
export { default as Div } from './Div.svelte';
export { default as Result } from './Result.svelte';