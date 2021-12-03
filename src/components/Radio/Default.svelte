<script>
  // components
  import { Custom, Icon } from './index.js';

  // props (external)
  export let group = undefined;
  export let type = 'custom'
  export let value = undefined;
</script>

{#if type === 'custom'}
  <Custom bind:group {value} {...$$props}><slot/></Custom>
{:else if type === 'icon'}
  <Icon bind:group {value} {...$$props}><slot/></Icon>
{/if}