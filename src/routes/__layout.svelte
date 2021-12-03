<script>
  // imports
  import { io } from 'socket.io-client';
  import { afterUpdate, onMount } from 'svelte';
  import { page } from '$app/stores';
  import { auth, socket, theme } from '$stores';
  import '../app.css';

  // components
  import { goto } from '$app/navigation';
  import { Modals, Theme } from '$components';

  // props (internal)
  const unguardedPaths = [
    '/',
    '/quick-play',
    '/register',
    '/register-confirmation',
    '/reset-password',
    '/reset-password-confirmation',
    '/sign-in'
  ];

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
  afterUpdate(async () => {
    // destructure $page
    const { path } = $page;

    if ($socket !== undefined && !unguardedPaths.includes(path)) {
      // verify token
      const verified = await auth.verify();

      // reroute if not verified
      if (!verified) goto('/sign-in', { replaceState: true });
    }
  });
  onMount(() => {
    $socket = io();
  });
</script>

<svelte:head>
  <title>{title}</title>
</svelte:head>

<Theme>
  <div
    class="min-h-screen min-w-screen max-h-screen max-w-screen overflow-hidden flex justify-center ios-safearea"
  >
    <slot />
  </div>

  {#each Object.values(Modals) as Modal}
    <Modal />
  {/each}
</Theme>
