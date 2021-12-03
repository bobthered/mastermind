<script>
  // imports
  import { theme } from '$stores';
  import { generateClasses } from '$components/Button';

  // props (external)
  export let flavor = 'primary';
  export let href = '';

  // props (dynamic)
  $: classes = generateClasses($theme, flavor);
</script>

<a {href} on:click class="{classes}{$$props.class !== undefined ? ` ${$$props.class}` : ''}">
  <slot />
</a>
