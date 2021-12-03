<script>
  // import
  import { onDestroy, onMount } from 'svelte';

  // utilities
  const updateNow = () => {
    now = new Date().getTime();
    if (exists) setTimeout(updateNow, 1000);
  };

  // props (internal)
  let now = new Date().getTime();
  const start = new Date().getTime();

  // props (external)
  export let delay = 0;
  export let exists = false;
  export let infinite = false;
  export let time = 0;

  // props (dynamic)
  $: timeDelta = Math.round((now - start) / 1000);
  $: remaining = time - delay - timeDelta;
  $: minutes = Math.floor(remaining / 60);
  $: seconds = remaining - minutes * 60;
  $: if ( time > 1800 ) infinite = true;

  // lifecycle
  onDestroy(()=>{
    exists = false;
  })
  onMount(() => {
    if (!infinite) setTimeout(updateNow, 1000);
    exists = true;
  });
</script>

<div class="flex font-semibold leading-[3rem] text-[3rem]">
  {#if infinite}
    ∞
  {:else}
    <div class="w-[3.75rem] text-right">{minutes}</div>
    <div>:</div>
    <div class="w-[3.75rem] text-left">{String(seconds).padStart(2, '0')}</div>
  {/if}
</div>
