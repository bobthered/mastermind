<script>
  // imports
  import { goto } from '$app/navigation';

  // components
  import { Button, Input, Layout, Link } from '$components';

  // handlers
  const submitHandler = () => {
    goto('/sign-in');
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
      <div class="text-center font-semibold text-[1.5rem]">Register email sent!</div>
      <div class="text-center max-w-[21.4375rem] opacity-[.5]">
        Please check your inbox for instructions on completing your account
      </div>
    </div>
    <Button type="submit">Login</Button>
    <slot />
  </form>
</Layout>
