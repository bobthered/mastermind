<script>
  // components
  import Email from './Email.svelte';
  import Number from './Number.svelte';
  import Password from './Password.svelte';
  import Text from './Text.svelte';

  // props (external)
  export let name = '';
  export let placeholder = '';
  export let type = 'text';
  export let value = '';
</script>

{#if type === 'email'}
  <Email {name} {placeholder} bind:value />
{:else if type === 'number'}
  <Number {name} {placeholder} bind:value />
{:else if type === 'password'}
  <Password {name} {placeholder} bind:value />
{:else if type === 'text'}
  <Text {name} {placeholder} bind:value />
{/if}
