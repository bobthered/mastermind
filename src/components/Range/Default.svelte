<script>
  // imports
  import { theme } from '$stores';

  // props (external)
  export let max = 1;
  export let min = 1;
  export let step = 1;
  export let transform = value => value;
  export let value = 1;
</script>

<div class="relative">
  <input type="range" {min} {max} {step} bind:value class="w-full appearance-none h-[4px] my-[1.375rem] rounded-full {$theme.contrastBgColor} bg-opacity-[.1] slider-thumb {$$props.class !== undefined ? $$props.class : ''}" />
  <div class="pointer-events-none text-center flex items-center justify-center rounded-full absolute top-0 w-[3rem] h-[3rem] transform {$theme.primaryBgColor} {$theme.primaryContrastTextColor}" style='left:{(value-min) * 100 / (max - min)}%; --tw-translate-x:{(value-min) * -100 / (max - min)}%'>{@html transform(value)}</div>
</div>