<script>
  // imports
  import { theme } from '$stores';
  import { classes } from './index.js';

  // props (external)
  export let name = '';
  export let placeholder = '';
  export let value = '';
</script>

<input
  type="email"
  {name}
  {placeholder}
  bind:value
  class="{classes} {$theme.contrastBgColor} {$theme.primaryRingColor} {$theme.textColor}"
/>
