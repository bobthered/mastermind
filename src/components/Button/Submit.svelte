<script>
  // imports
  import { theme } from '$stores';
  import { generateClasses } from './index.js';

  // components
  import { Spinner } from '$components';

  // props (external)
  export let flavor = 'primary';
  export let ref = undefined;
  export let submitted = false;

  // props (dynamic)
  $: classes = generateClasses($theme, flavor);
</script>

<button
  bind:this={ref}
  on:click
  type="submit"
  class="{classes}{$$props.class !== undefined ? ` ${$$props.class}` : ''}"
>
  {#if submitted}
    <Spinner height="h-[24px]" width="w-[24px]" />
  {:else}
    <slot />
  {/if}
</button>
