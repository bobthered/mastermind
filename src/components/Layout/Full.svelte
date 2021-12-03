<script>
  // props (external)
  export let alignItems = 'items-center';
  export let flexGrow = 'flex-grow';
  export let justifyContent = 'justify-center';
</script>

<div class="flex overflow-hidden {alignItems} {flexGrow} {justifyContent} {$$props.class !== undefined ? $$props.class : ''}">
  <slot/>
</div>