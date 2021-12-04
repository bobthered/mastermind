<script>
  // imports
  import { goto } from '$app/navigation';
  import { auth, modal, socket, theme } from '$stores';

  // components
  import { Button, Icon, InputContainer, Layout, Peg, Radio, Range, Scrollable, Spinner } from '$components'

  // handlers
  const submitHandler = () => {
    if (!submitted) {
      // initiate socket body
      const body = {
        settings: {
          color,
          darkMode,
          fontSize,
        },
        token: auth.token()
      }

      $socket.emit('updateSettings', body, ({error, settings, token}) => {
        if (error) modal.error.show(error);
        if (!error) {
          auth.set(token);
          theme.update(settings);
          goto('/game-modes');
        }
        submitted = false;
      })
    }
    submitted = true;
  }
  
  // props (internal)
  let color = $theme.color
  const colors = [
    'pink', 'red', 'orange', 'yellow', 'green', 'blue', 'purple'
  ];
  let darkMode = $theme.darkMode;
  const darkModes = [
    { value: false, src: '/icons/icon=sun.svg' },
    { value: true, src: '/icons/icon=moon.svg' },
  ]
  let fontSize = $theme.fontSize;
  const fontSizeTransform = value => {
    // initiate text classes
    const classes = ['text-[14px]', 'text-[16px]', 'text-[18px]', 'text-[20px]', 'text-[22px]']

    // initate array index
    const index = (value / 2) - 7;

    return `<div class="${classes[index]}">A</div>`
  }
  let submitted = false;
</script>

<Layout type="threeRows" mainClasses="p-[1rem] space-y-[3rem] flex-col" on:submit={submitHandler}>
  <!-- main area -->
  <svelte:fragment slot="main">
    <InputContainer label="Color">
      <Scrollable class="flex ml-[-1rem]" style="width:calc(100% + 2rem)">
        <div class="flex space-x-[1rem] px-[1rem]">
          {#each colors as pegColor}
            <Radio bind:group={color} value={pegColor}>
              <Peg color={pegColor}>
                {#if color === pegColor}
                  <Icon src="/icons/icon=check.svg"/>
                {/if}
              </Peg>
            </Radio>
          {/each}
        </div>
      </Scrollable>
    </InputContainer>
    <InputContainer label="Dark Mode">
      <div class="flex space-x-[1rem]">
        {#each darkModes as {src, value}}
          <Radio type="icon" bind:group={darkMode} {value}>
            <Icon {src} />
          </Radio>
        {/each}
      </div>
    </InputContainer>
    <InputContainer label="Font Size">
      <Range min={14} max={22} step={2} transform={fontSizeTransform} bind:value={fontSize} />
    </InputContainer>
  </svelte:fragment>

  <!-- bottom area -->
  <svelte:fragment slot="bottom">
    <Button type="submit" class="flex-grow">
      {#if submitted}
        <Spinner height="h-[24px]" width="w-[24px]" />
      {:else}
        Save
      {/if}
    </Button>
  </svelte:fragment>
</Layout>
<slot/>