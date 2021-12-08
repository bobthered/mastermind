<script>
  // components
  import { goto } from '$app/navigation';
  import { Button, InputContainer, Layout, Range } from '$components';
  import { objToQueryParams } from '$lib/utilities';
  import { auth, game, modal, socket } from '$stores';

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

  // props (dynamic)
  $: [attempts, colors, pegs, time] = [...$game].map(({ value }) => value);
</script>

<Layout 
  type="threeRows" 
  on:submit={submitHandler}
  mainClasses="p-[1rem] space-y-[2rem] flex-col"
  bottomClasses="px-[1rem] py-[.75rem] border-t border-white border-opacity-[.1]"
>
  <!-- main area -->
  <svelte:fragment slot="main">
    {#each $game as { label, min, max, step, transform, value }}
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
