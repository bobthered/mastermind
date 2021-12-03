<script>
  // import
  import { goto } from '$app/navigation';

  // components
  import { Button, Input, Layout, Link } from '$components';

  // handlers
  const submitHandler = () => {
    goto('/reset-password-confirmation');
  };

  // props (internal)
  let email = '';
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
    <Button type="submit">Reset Password</Button>
    <div class="flex space-x-[.5rem] justify-center">
      <div>Remember password?</div>
      <Link href="./sign-in">Sign In</Link>
    </div>
    <slot />
  </form>
</Layout>
