<script>
  // props (external)
  export let show = false;

  // props (dynamic)
  $: classes = show ? 'opacity-[1] pointer-events-auto' : 'opacity-[0] pointer-events-none';
</script>

<div class="min-w-screen w-full max-h-screen max-w-screen overflow-auto fixed top-0 left-0 flex flex-col transition duration-200 overflow-hidden ios-safearea {classes}">
  <div class="bg-gray-900 bg-opacity-[.85] absolute top-0 left-0 w-full h-full backdrop-blur-md" />
  <div class="flex flex-grow relative">
    <slot />
  </div>
</div>