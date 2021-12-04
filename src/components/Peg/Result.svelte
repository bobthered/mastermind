<script>
  // imports
  import { theme } from '$stores';

  // props (external)
  export let color = 'blank';

  // props (dynamic)
  $: containerClasses = 'w-[.75rem] h-[.75rem] flex items-center justify-center rounded-full';
  $: divClasses = color === 'blank' ? `w-[.25rem] h-[.25rem] rounded-full ${$theme.contrastBgColor}` :
                  color === 'black' ? `w-[.75rem] h-[.75rem] rounded-full ${$theme.contrastBgColor}` :
                  color === 'white' ? `w-[.75rem] h-[.75rem] rounded-full ring-inset ring-2 ${$theme.ringColor}` : ''
</script>

<div class={containerClasses}>
  <div class={divClasses}>
    <slot/>
  </div>
</div>