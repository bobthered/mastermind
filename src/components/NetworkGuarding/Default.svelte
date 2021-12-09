<script>
  // imports
  import { io } from 'socket.io-client';
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import { network, socket } from '$stores';

  // handlers
  const offlineHandler = () => {
    $network = false;
    try {
      $socket.disconnect();
    } catch (error) {
      console.error(error)
    }
  };
  const onlineHandler = () => {
    $network = true;
    try {
      $socket.connect();
    } catch (error) {
      console.error(error)
    }
  };

  $: if (browser) console.log(`$network: ${$network}`);

  // lifecycle
  onMount(() => {
    if (browser) {
      $network = window.navigator.onLine ? true : false;
      window.addEventListener('offline', offlineHandler);
      window.addEventListener('online', onlineHandler);
    }
  });
</script>

<slot />
