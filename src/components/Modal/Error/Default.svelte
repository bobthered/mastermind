<script>
  // import
  import store from './store.js';

  // components
  import { Button, Layout, Modal } from '$components';

  // handlers
  const clickHandler = () => {
    store.hide();
  };

  // props (internal)
  let buttonEl;

  // props (dynamic)
  $: if ($store.show) buttonEl.focus();
</script>

<Modal bind:show={$store.show}>
  <Layout type="twoRows" mainClasses="justify-center items-center space-y-[1rem]">
    <svelte:fragment slot="main">
      <div class="relative text-center font-semibold text-[1.5rem]">Error</div>
      <div class="text-center max-w-[21.4375rem] opacity-[.5]">
        {$store.message}
      </div>
    </svelte:fragment>
    <svelte:fragment slot="bottom">
      <Button 
        bind:ref={buttonEl} 
        on:click={clickHandler} 
        flavor="error" 
        class="relative w-full"
      >
        Try Again
      </Button>
    </svelte:fragment>
  </Layout>
</Modal>
