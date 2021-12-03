<script>
  // components
  import { goto } from '$app/navigation';
  import { Button, InputContainer, Layout, Range } from '$components';
  import { auth, modal, socket } from '$stores';

  // handlers
  const submitHandler = async () => {
    if (!submitted) {
      // initiate socket body
      const body = {
        settings: {
          attempts,
          colors,
          pegs,
          time
        },
        token: auth.token()
      };

      // emit socket event
      $socket.emit('createGame', body, ({ _id, error, token }) => {
        // reset submitted
        submitted = false;

        // check if error
        if (error) modal.error.show(error);

        // navigate to route
        if (!error) {
          auth.set(token);
          goto(`/play/${_id}`)
        }
      });
    }
    submitted = true;
  };

  // utilities
  const timeTransform = (value) => {
    const minutes = Math.floor(value / 60);
    const seconds = value - minutes * 60;
    const time = [];
    if (minutes > 0) time.push(`${minutes}m`);
    if (seconds > 0) time.push(`${seconds}s`);
    return time.join(' ');
  };

  // props (internal)
  const options = [
    { label: 'Attempts', min: 1, max: 100, step: 1, transform: (value) => value, value: 10 },
    { label: 'Colors', min: 1, max: 8, step: 1, transform: (value) => value, value: 6 },
    { label: 'Pegs', min: 1, max: 10, step: 1, transform: (value) => value, value: 4 },
    { label: 'Time', min: 30, max: 1800, step: 15, transform: timeTransform, value: 300 }
  ];
  let submitted = false;

  $: [attempts, colors, pegs, time] = [...options].map(({ value }) => value);
</script>

<Layout type="threeRows" mainClasses="p-[1rem] space-y-[2rem]" on:submit={submitHandler}>
  <!-- main area -->
  <svelte:fragment slot="main">
    {#each options as { label, min, max, step, transform, value }}
      <InputContainer {label}>
        <Range {min} {max} {step} {transform} bind:value />
      </InputContainer>
    {/each}
  </svelte:fragment>

  <!-- bottom -->
  <svelte:fragment slot="bottom">
    <Button bind:submitted type="submit" class="flex-grow">Start Game</Button>
  </svelte:fragment>
</Layout>
<slot />
