<script>
  // imports
  import { goto } from '$app/navigation';
  import { auth, socket } from '$stores';

  // utilities
  const verifyToken = async () => {
    // verify token
    const verified = await auth.verify();

    if (verified) goto('/game-modes', { replaceState: true });
    if (!verified) goto('/sign-in', { replaceState: true });
  };

  // components
  import { Layout, Logo } from '$components';

  // props (dynamic)
  $: if ($socket !== undefined) {
    verifyToken();
  }
</script>

<Layout>
  <div class="flex flex-col space-y-[2rem] px-[1rem] w-full">
    <Logo />
    <slot />
  </div>
</Layout>
