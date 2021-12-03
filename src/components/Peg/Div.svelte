<script>
  // imports
  import { theme } from '$stores';
  
  // props (external)
  export let color = 'blue';

  // props (dynamic)
  $: colorClasses = color === 'pink' ?    'bg-pink-500 text-white' :
                    color === 'red' ?     'bg-red-500 text-white' :
                    color === 'orange' ?  'bg-orange-500 text-white' :
                    color === 'yellow' ?  'bg-yellow-500 text-gray-900' :
                    color === 'green' ?   'bg-green-500 text-white' :
                    color === 'blue' ?    'bg-blue-500 text-white' :
                    color === 'purple' ?  'bg-purple-500 text-white' :
                    color === 'contrast' ? $theme.contrastBgColor : 
                                           `ring-1 ring-opacity-[.1] ${$theme.ringColor}`
</script>

<div
  class="w-[3rem] h-[3rem] flex items-center justify-center rounded-full {colorClasses}"
>
  <slot/>
</div>