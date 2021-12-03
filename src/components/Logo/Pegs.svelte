<script>
  // import
  import { onDestroy, onMount } from 'svelte';
  import { theme } from '$stores';

  // utilties
  const updateDuration = () => {
    duration = Math.floor(Math.random() * 1000) + 500;
  }
  const updatePegColor = () => {
    // get new color index
    const colorIndex = Math.floor(Math.random() * colors.length);

    // get peg index
    const pegIndex = Math.floor(Math.random() * pegs.length);

    // update peg
    pegs[pegIndex] = colors[colorIndex]

    // update duration
    updateDuration();

    // run timeout
    if ( exists ) setTimeout(updatePegColor, duration);
  }

  // props ( internal )
  const colors = ['bg-pink-500', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500', 'bg-purple-500', $theme.contrastBgColor]
  let pegs = ['bg-pink-500', 'bg-green-500', $theme.contrastBgColor, 'bg-purple-500'];
  let duration = 0;
  let exists = true;

  // lifecycle
  onDestroy(() => exists = false)
  onMount(() => {
    updateDuration();
    setTimeout(updatePegColor, duration);
  })
</script>

<div class="flex space-x-[1rem]">
  {#each pegs as bgColor}
    <div class="rounded-full w-[2rem] h-[2rem] transition duration-[3000ms] {bgColor}" />
  {/each}
</div>
