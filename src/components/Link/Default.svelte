<script>
  // imports
  import { theme } from '$stores';

  // components
  import Button from './Button.svelte';
  import Link from './Link.svelte';

  // props (external)
  export let href = '';
  export let type = 'link';
</script>

{#if type === 'button'}
  <Button on:click {href} {...$$props}><slot/></Button>
{:else if type === 'link'}
  <Link on:click {href} {...$$props}><slot/></Link>
{/if}