<script>
  // imports
  import InlineSVG from 'svelte-inline-svg';

  // props (external)
  export let src = '';
</script>

{#if src !== ''}
  <InlineSVG {src} />
{/if}