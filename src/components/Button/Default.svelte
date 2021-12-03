<script>
  // components
  import Button from './Button.svelte';
  import Icon from './Icon.svelte';
  import Submit from './Submit.svelte';

  // props (external)
  export let ref = undefined;
  export let type = 'button';
</script>

{#if type === 'button'}
  <Button bind:ref on:click {...$$props}><slot /></Button>
{:else if type === 'icon'}
  <Icon bind:ref on:click {...$$props}><slot /></Icon>
{:else if type === 'submit'}
  <Submit bind:ref on:click {...$$props}><slot /></Submit>
{/if}
