<script>
  // imports
  import { theme } from '$stores';
  import { generateClasses } from './index.js';

  // props (external)
  export let color = 'blue';
  export let current = false;

  // props (dynamic)
  $: classes = generateClasses(color, $theme, current);
</script>

<div
  class={classes}
>
  <slot/>
</div>