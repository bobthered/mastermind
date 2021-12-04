<script>
  // components
  import { Button, Div, Result } from './index.js';

  // props (external)
  export let type = 'div';
</script>

{#if type === 'div'}
  <Div {...$$props}><slot/></Div>
{:else if type === 'button'}
  <Button on:click {...$$props}><slot/></Button>
{:else if type === 'result'}
  <Result {...$$props}><slot/></Result>
{/if}