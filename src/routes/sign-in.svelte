<script>
  // imports
  import { goto } from '$app/navigation';
  import { auth, modal, socket, theme } from '$stores';

  // components
  import { Button, Icon, Input, Layout, Link, Logo } from '$components';

  // handlers
  const submitHandler = () => {
    if (!submitted)
      if (email === '' ) return modal.error.show('Please enter valid a valid email.')
      if (password === '' ) return modal.error.show('Please enter valid a valid password.')
      $socket.emit('signIn', { email, password }, ({ error, settings, token }) => {
        if (error) modal.error.show(error);
        if (!error) {
          auth.set(token);
          theme.update(settings);
          goto('/game-modes');
        }
        submitted = false;
      });
    submitted = true;
  };

  // props (internal)
  let email = '';
  const oAuthSrcs = ['google', 'apple', 'facebook'];
  let password = '';
  let submitted = false;
</script>

<Layout>
  <form
    on:submit|preventDefault={submitHandler}
    class="flex flex-col space-y-[2rem] px-[1rem] w-full"
  >
    <Logo />
    <div class="flex flex-col space-y-[1rem]">
      <Input name="email" placeholder="Enter email address" type="email" bind:value={email} />
      <Input name="password" placeholder="Enter password" type="password" bind:value={password} />
      <Link href="./reset-password" class="self-end">Reset Password</Link>
    </div>
    <Button bind:submitted type="submit">Sign In</Button>
    <div class="flex space-x-[.5rem] justify-center">
      <div>Not a member?</div>
      <Link href="./register">Register</Link>
    </div>
    <!-- <div class="text-center">or</div> -->
    <Link type="button" href="/quick-play" flavor="secondary">Quick Play</Link>
    <!-- <div class="flex space-x-[1rem] self-center">
      {#each oAuthSrcs as provider}
        <Button type="icon">
          <Icon src="/icons/icon={provider}.svg" />
        </Button>
      {/each}
    </div> -->
    <slot />
  </form>
</Layout>
