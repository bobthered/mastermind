<script>
  // import
  import { browser } from '$app/env';
  import { goto } from '$app/navigation';
  import store from './store.js';

  // components
  import { Button, Layout, Modal, Peg } from '$components';

  // props (internal)
  const buttons = {
    again : {
      clickHandler : () => {
        store.hide();
        if ( browser ) window.history.back();
      },
      flavor : 'primary',
      ref : undefined,
      text: 'Again',
    },
    quit : {
      clickHandler : () => {
        store.hide();
        goto('/sign-in')
      },
      flavor : 'secondary',
      ref : undefined,
      text: 'Quit',
    },
  };

  // props (dynamic)
  // $: if ($store) buttons.again.ref.focus();
</script>

<Modal bind:show={$store.show}>
  <Layout type="twoRows" bottomClasses="overflow-hidden" mainClasses="justify-center items-center space-y-[1rem]">
    <!-- main -->
    <svelte:fragment slot="main">
      <div class="relative text-center font-semibold text-[1.5rem]">You Win!</div>
      <div class="text-center max-w-[21.4375rem] opacity-[.5]">
        Congratulations you earned
      </div>
      <div class="text-center font-semibold text-[2rem]">
        {$store.score} points
      </div>
      <div class="flex flex-wrap justify-center">
        {#each $store.code as color}
          <div class="p-[.25rem]">
            <Peg {color} />
          </div>
        {/each}
      </div>
    </svelte:fragment>

    <!-- bottom -->
    <svelte:fragment slot="bottom">
      <div class="flex flex-grow space-x-[1rem] transition duration-200 transform delay-700 {$store.show ? 'translate-y-0' : 'translate-y-[200%]'}">
        {#each Object.values(buttons) as {clickHandler, flavor, ref, text}}
          <Button 
            bind:ref
            {flavor}
            class="flex-grow"
            on:click={clickHandler}
          >
            {text}
          </Button>
        {/each}
      </div>
    </svelte:fragment>
  </Layout>
</Modal>