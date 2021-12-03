<script>
  // props (external)
  export let group = undefined;
  export let value = undefined;
</script>

<label class="relative">
  <input type="radio" bind:group value={value} class="absolute top-0 left-0 w-[0px] h-[0px] opacity-0" />
  <slot/>
</label>