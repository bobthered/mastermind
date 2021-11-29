<script>
  // components
  import { Button, Icon, Input, Link, Logo } from '$components';

  // handlers
  const submitHandler = () => {};

  // props (internal)
  let email = '';
  let password = '';
  const oAuthSrcs = [
    'google', 'apple', 'facebook'
  ]
</script>

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
  <Button>Sign In</Button>
  <div class="text-center">or continue with</div>
  <div class="flex space-x-[1rem] self-center">
    {#each oAuthSrcs as provider}
      <Button type="icon">
        <Icon src="/icons/icon={provider}.svg" />
      </Button>
    {/each}
  </div>
  <div class="flex space-x-[.5rem] justify-center">
    <div>Not a member?</div>
    <Link href="./register">Register</Link>
  </div>
  <slot/>
</form>
