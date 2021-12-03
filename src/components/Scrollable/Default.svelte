<script>
  // props (external)
  export let direction = 'horizontal';
  export let style = '';

  // props (dynamic)
  $: classes = direction === 'horizontal' ? 'overflow-x-auto' : 
               direction === 'vertical' ? 'overflow-y-auto' :
               direction === 'both' ? 'overflow-auto' : ''
</script>

<div class="{classes} {$$props.class !== undefined ? $$props.class : ''}" {style}>
  <slot/>
</div>