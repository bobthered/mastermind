<script>
  // components
  import { goto } from '$app/navigation';
  import { Button, InputContainer, Layout, Range } from '$components';
  import { objToQueryParams } from '$lib/utilities';
  import { auth, modal, socket } from '$stores';

  // handlers
  export const submitHandler = () => {
    // initiate query
    const query = {
      attempts,
      colors,
      pegs,
      time
    }
    goto(`/play?${objToQueryParams(query)}`)
  };

  // utilities
  const timeTransform = (value) => {
    if ( value > 1800 ) return '<div class="text-[2rem]">∞</div>';
    const minutes = Math.floor(value / 60);
    const seconds = value - minutes * 60;
    const time = [];
    if (minutes > 0) time.push(`${minutes}m`);
    if (seconds > 0) time.push(`${seconds}s`);
    return time.join(' ');
  };

  // props (internal)
  const options = [
    { label: 'Attempts', min: 1, max: 100, step: 1, transform: (value) => value, value: 10 },
    { label: 'Colors', min: 2, max: 8, step: 1, transform: (value) => value, value: 6 },
    { label: 'Pegs', min: 1, max: 10, step: 1, transform: (value) => value, value: 4 },
    { label: 'Time', min: 30, max: 1815, step: 15, transform: timeTransform, value: 300 }
  ];

  // props (dynamic)
  $: [attempts, colors, pegs, time] = [...options].map(({ value }) => value);
</script>

<Layout 
  type="threeRows" 
  on:submit={submitHandler}
  mainClasses="p-[1rem] space-y-[2rem]"
  bottomClasses="px-[1rem] py-[.75rem] border-t border-white border-opacity-[.1]"
>
  <!-- main area -->
  <svelte:fragment slot="main">
    {#each options as { label, min, max, step, transform, value }}
      <InputContainer {label}>
        <Range {min} {max} {step} {transform} bind:value />
      </InputContainer>
    {/each}
  </svelte:fragment>

  <!-- bottom -->
  <svelte:fragment slot="bottom">
    <Button type="submit" class="flex-grow">Start Game</Button>
  </svelte:fragment>
</Layout>
<slot />
