<script>
  // imports
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { auth, modal, socket, theme } from '$stores';
  import { backButtonClickHandler } from '$components/Layout';

  // components
  import { Button, Icon, Input, Layout, Link } from '$components';

  // handlers
  const resendClickHandler = async () => {
    if (!submitted) {
      // initiate socket body
      const body = {
        email: $page?.query.get('email') || ''
      };
      $socket.emit('resendVerificationCode', body, resendSocketHandler);
      submitted = true;
    }
  };
  const resendSocketHandler = ({ error }) => {
    if (error) {
      console.error(error);
      modal.error.show(error);
    }
    if (!error) {
      description = 'Please check your inbox for your resent verification code';
      title = 'Verification code resent!';
    }
    submitted = false;
  };
  const submitHandler = async () => {
    if (!submitted) {
      // initiate socket body
      const body = {
        code,
        email: $page?.query.get('email') || ''
      };
      $socket.emit('verifyCode', body, verifySocketHandler);
      submitted = true;
    }
  };
  const verifySocketHandler = ({ error, settings, token }) => {
    if (error) modal.error.show(error);
    if (!error) {
      auth.set(token);
      theme.update(settings);
      goto('/game-modes');
    }
    submitted = false;
  };

  // props (internal)
  let code = '';
  let description = 'Please check your inbox for your verification code';
  let submitted = false;
  let title = 'Register email sent!';
</script>

<Layout alignItems="" class="flex-col overflow-hidden">
  <div class="flex p-[1rem] border-b border-white border-opacity-[.1]">
    <Button on:click={backButtonClickHandler} type="icon"
      ><Icon src="/icons/icon=chevronLeft.svg" /></Button
    >
  </div>
  <div class="flex flex-col flex-grow overflow-y-auto p-[1rem]">
    <form
      on:submit|preventDefault={submitHandler}
      class="flex flex-col space-y-[2rem] w-full flex-grow justify-center"
    >
      <div class="flex flex-col space-y-[1rem]">
        <div class="text-center font-semibold text-[1.5rem]">{title}</div>
        <div class="text-center max-w-[21.4375rem] opacity-[.5]">
          {description}
        </div>
        <Input type="number" placeholder="Verification Code" bind:value={code} class="flex-grow" />
      </div>
      <Button bind:submitted type="submit">Verify</Button>
      <Button flavor="secondary" on:click={resendClickHandler} type="button">Resend</Button>
    </form>
  </div>
</Layout>
<slot />
