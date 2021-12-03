<script>
  // props (external)
  export let bottomClasses = 'border-t border-white border-opacity-[.1]';
  export let mainClasses = 'p-[1rem]';
</script>

<form on:submit|preventDefault class="flex flex-col flex-grow overflow-hidden {$$props.class !== undefined ? $$props.class : ''}">
  <!-- main area -->
  <div class="flex flex-col flex-grow overflow-y-auto {mainClasses}">
    <slot name="main" />
  </div>
  
  <!-- bottom area -->
  <div class="flex p-[1rem] {bottomClasses}">
    <slot name="bottom" />
  </div>
</form>