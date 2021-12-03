<script>
  // import
  import { theme } from '$stores';
  import { generateClasses } from '../Button';

  // props (external)
  export let group = undefined;
  export let value = undefined;

  // props (dynamic)
  $: classes = generateClasses($theme, group === value ? 'primary' : 'secondary');
</script>

<label class="relative">
  <input type="radio" bind:group {value} class="absolute top-0 left-0 w-[0px] h-[0px] opacity-0" />
  <div class="{classes} {$$props.class !== undefined ? $$props.class : ''}">
    <slot />
  </div>
</label>
