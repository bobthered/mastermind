<script>
  // import
  import { goto } from '$app/navigation';
  import { modal, socket } from '$stores';

  // components
  import { Button, Input, Layout, Link } from '$components';

  // handlers
  const socketHandler = ({ error }) => {
    if (error) {
      console.log(error);
      modal.error.show(error);
    }
    if (!error) goto(`/reset-password-verify?email=${email}`);
    submitted = false;
  };
  const submitHandler = () => {
    if (!submitted) {
      // initiate socket body
      const body = {
        email
      };
      $socket.emit('requestPasswordReset', body, socketHandler);
      submitted = true;
    }
  };

  // props (internal)
  let email = '';
  let submitted = false;
</script>

<Layout>
  <form
    on:submit|preventDefault={submitHandler}
    class="flex flex-col space-y-[2rem] px-[1rem] w-full"
  >
    <div class="flex flex-col space-y-[1rem] items-center">
      <div class="text-center font-semibold text-[1.5rem]">Forgot your password?</div>
      <div class="text-center max-w-[21.4375rem] opacity-[.5]">
        Enter your email below to receive password reset instructions
      </div>
    </div>
    <Input name="email" placeholder="Enter email address" type="email" bind:value={email} />
    <Button bind:submitted type="submit">Reset Password</Button>
    <div class="flex space-x-[.5rem] justify-center">
      <div>Remember password?</div>
      <Link href="./sign-in">Sign In</Link>
    </div>
    <slot />
  </form>
</Layout>
