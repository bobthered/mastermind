<script>
  // imports
  import { theme } from '$stores';

  // props (external)
  export let href = '';
</script>

<a 
  {href} 
  on:click
  class="font-medium outline-none relative group {$theme.primaryTextColor}{$$props.class !== undefined ? ` ${$$props.class}`: ''}">
  <slot/>
  <div class="absolute bottom-0 left-0 transition duration-200 w-full h-[2px] rounded-full pointer-events-none bg-opacity-0 group-hover:bg-opacity-100 group-focus:bg-opacity-100 {$theme.primaryBgColor}" />
</a>