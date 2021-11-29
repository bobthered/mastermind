<script>
  // imports
  import { classes } from './index.js';

  // props (external)
  export let name = '';
  export let placeholder = '';
  export let value = '';
</script>

<input
  type="password"
  {name}
  {placeholder}
  bind:value
  class={classes}
/>
