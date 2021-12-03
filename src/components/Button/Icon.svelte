<script>
  // imports
  import { theme } from '$stores';
  import { generateClasses } from './index.js';

  // props (external)
  export let flavor = 'secondary';
  export let ref = undefined;

  // props (dynamic)
  $: classes = generateClasses($theme, flavor);
</script>

<button
  bind:this={ref}
  on:click
  type="button"
  class="{classes}{$$props.class !== undefined ? ` ${$$props.class}` : ''}"
>
  <slot />
</button>
