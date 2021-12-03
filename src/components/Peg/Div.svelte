<script>
  // imports
  import { theme } from '$stores';
  
  // props (external)
  export let color = 'blue';

  // props (dynamic)
  $: bgColor = color === 'pink' ? 'bg-pink-500' :
               color === 'red' ? 'bg-red-500' :
               color === 'orange' ? 'bg-orange-500' :
               color === 'yellow' ? 'bg-yellow-500' :
               color === 'green' ? 'bg-green-500' :
               color === 'blue' ? 'bg-blue-500' :
               color === 'purple' ? 'bg-purple-500' :
               color === 'contrast' ? $theme.contrastBgColor : ''

  $: textColor = color === 'pink' ? 'text-white' :
                 color === 'red' ? 'text-white' :
                 color === 'orange' ? 'text-white' :
                 color === 'yellow' ? 'text-gray-900' :
                 color === 'green' ? 'text-white' :
                 color === 'blue' ? 'text-white' :
                 color === 'purple' ? 'text-white' :
                 color === 'contrast' ? $theme.contrastTextColor : ''
</script>

<div
  class="w-[3rem] h-[3rem] flex items-center justify-center rounded-full {bgColor} {textColor}"
>
  <slot/>
</div>