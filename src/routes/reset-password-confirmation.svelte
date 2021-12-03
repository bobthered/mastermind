<script>
  // imports
  import { goto } from '$app/navigation';

  // components
  import { Button, Layout } from '$components';

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
      <div class="text-center font-semibold text-[1.5rem]">Reset email sent!</div>
      <div class="text-center max-w-[21.4375rem] opacity-[.5]">
        Please check your inbox for instructions on resetting your password
      </div>
    </div>
    <Button type="submit">Login</Button>
    <slot />
  </form>
</Layout>
