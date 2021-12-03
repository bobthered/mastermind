<script>
  // props (external)
  export let label = '';
</script>

<div class="space-y-[1rem] {$$props.class !== undefined ? $$props.class : ''}">
  <div class="font-medium">{label}</div>
  <slot/>
</div>