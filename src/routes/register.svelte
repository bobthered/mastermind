<script>
  // import
  import { goto } from '$app/navigation';
  import { auth, modal, socket, theme } from '$stores';

  // components
  import { Button, Input, Layout, Link, Spinner } from '$components';

  // handlers
  const submitHandler = async () => {
    if (!submitted)
      $socket.emit('register', { email, password }, ({ error, token }) => {
        if (error) modal.error.show(error);
        if (!error) goto(`/verify?email=${email}`);
        submitted = false;
      });
    submitted = true;
  };

  // props (internal)
  let email = '';
  let password = '';
  let submitted = false;
</script>

<Layout>
  <form
    on:submit|preventDefault={submitHandler}
    class="flex flex-col space-y-[2rem] px-[1rem] w-full"
  >
    <div class="flex flex-col space-y-[1rem] items-center">
      <div class="text-center font-semibold text-[1.5rem]">Register an account</div>
      <div class="text-center max-w-[21.4375rem] opacity-[.5]">
        Enter your email and password below to setup an account
      </div>
    </div>
    <div class="flex flex-col space-y-[1rem]">
      <Input name="email" placeholder="Enter email address" type="email" bind:value={email} />
      <Input name="password" placeholder="Enter password" type="password" bind:value={password} />
    </div>
    <Button bind:submitted type="submit">Register</Button>
    <div class="flex space-x-[.5rem] justify-center">
      <div>Already have an account?</div>
      <Link href="./sign-in">Sign In</Link>
    </div>
    <slot />
  </form>
</Layout>
