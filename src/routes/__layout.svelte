<script>
  // imports
  import { io } from 'socket.io-client';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { socket } from '$stores';
  import '../app.css';

  // components
  import { Modals, NetworkGuarding, RouteGuarding, Theme } from '$components';

  // props (dynamic)
  $: title = [
    'Mastermind',
    ...$page.path
      .split('/')
      .filter((address) => address !== '')
      .map((address) =>
        address
          .split('-')
          .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
          .join(' ')
      )
  ]
    .reverse()
    .join(' | ');

  // lifecycle
  onMount(() => {
    $socket = io();
  });
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Theme>
  <div
    class="min-w-screen max-h-screen max-w-screen overflow-hidden flex justify-center ios-safearea"
  >
    <NetworkGuarding>
      <RouteGuarding>
        <slot />
      </RouteGuarding>
    </NetworkGuarding>
  </div>

  <Modals.Error />
  <Modals.Lost />
  <Modals.Spinner />
  <Modals.Win />
</Theme>
