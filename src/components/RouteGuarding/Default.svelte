<script>
  // imports
  import { afterUpdate } from 'svelte';
  import { unguardedRoutes } from './routes';
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { auth, socket } from '$stores';

  // utilities
  const guardRoute = async() => {
    // destructure $page
    const { path } = $page;

    if ($socket !== undefined && !unguardedRoutes.includes(path)) {
      // verify token
      const verified = await auth.verify();

      // reroute if not verified
      if (!verified) goto('/sign-in', { replaceState: true });
    }
  }

  // props (dynamic)
  $: if ( $socket !== undefined ) guardRoute();

  // lifecycle
  afterUpdate(guardRoute)
</script>

<slot/>