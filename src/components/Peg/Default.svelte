<script>
  // components
  import { Button, Div } from './index.js';

  // props (external)
  export let type = 'div';
</script>

{#if type === 'div'}
  <Div {...$$props}><slot/></Div>
{:else if type === 'button'}
  <Button on:click {...$$props}><slot/></Button>
{/if}