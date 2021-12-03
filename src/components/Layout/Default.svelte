<script>
  // components
  import { Button, Icon } from '$components';
  import { backButtonClickHandler, Full, ThreeRows, TwoRows } from './index.js';

  // props (external)
  export let type = 'full'
</script>

{#if type === 'full'}
  <Full {...$$props}><slot/></Full>
{:else if type === 'threeRows'}
  <ThreeRows on:submit {...$$props}>
    <slot slot="top" name="top">
      <Button on:click={backButtonClickHandler} type="icon"><Icon src="/icons/icon=chevronLeft.svg" /></Button>
    </slot>
    <slot slot="main" name="main" />
    <slot slot="bottom" name="bottom" />
  </ThreeRows>
{:else if type === 'twoRows'}
  <TwoRows on:submit {...$$props}>
    <slot slot="main" name="main" />
    <slot slot="bottom" name="bottom" />
  </TwoRows>
{/if}