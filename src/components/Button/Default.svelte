<script>
  // components
  import Button from './Button.svelte';
  import Icon from './Icon.svelte';

  // props (external)
  export let type = 'button';
</script>

{#if type === 'button'}
  <Button on:click><slot/></Button>
{:else if type === 'icon'}
  <Icon on:click><slot/></Icon>
{/if}