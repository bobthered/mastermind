<script>
  // components
  import { Button, Input, Link } from '$components';

  // handlers
  const submitHandler = () => {}

  // props (internal)
  let email = '';
</script>

<form
  on:submit|preventDefault={submitHandler}
  class="flex flex-col space-y-[2rem] px-[1rem] w-full"
>
  <div class="flex flex-col space-y-[1rem] items-center">
    <div class="text-center font-semibold text-[1.3125rem]">Forgot your password?</div>
    <div class="text-center max-w-[250px] opacity-[.5] text-[.875rem]">Enter your email below to receive password reset instructions</div>
  </div>
  <Input name="email" placeholder="Enter email address" type="email" bind:value={email} />
  <Button>Reset Password</Button>
  <div class="flex space-x-[.5rem] justify-center">
    <div>Remember password?</div>
    <Link href="./sign-in">Sign In</Link>
  </div>
  <slot/>
</form>
