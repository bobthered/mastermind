<script>
  // props (external)
  export let bottomClasses = 'border-t border-white border-opacity-[.1]';
  export let mainClasses = 'p-[1rem]';
  export let topClasses = 'border-b border-white border-opacity-[.1]';
</script>

<form on:submit|preventDefault class="flex flex-col flex-grow overflow-hidden {$$props.class !== undefined ? $$props.class : ''}">
  <!-- top area -->
  <div class="flex p-[1rem] {topClasses}">
    <slot name="top" />
  </div>

  <!-- main area -->
  <div class="flex flex-col flex-grow overflow-y-auto {mainClasses}">
    <slot name="main" />
  </div>
  
  <!-- bottom area -->
  <div class="flex p-[1rem] {bottomClasses}">
    <slot name="bottom" />
  </div>
</form>