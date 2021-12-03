<script>
  // imports
  import { goto } from '$app/navigation';
  import { auth, theme } from '$stores';

  // components
  import { Button, Icon, Layout, Logo } from '$components';

  // props (internal)
  const icons = [
    {
      icon: 'cog',
      clickHandler: () => {
        goto('/settings');
      }
    },
    {
      icon: 'signOut',
      clickHandler: () => {
        auth.signOut();
        theme.reset();
        goto('/sign-in');
      }
    }
  ];
</script>

<Layout>
  <div class="flex flex-col space-y-[3rem] px-[1rem] w-full">
    <Logo />
    <div class="flex flex-col space-y-[1rem]">
      <Button on:click={() => goto('/single-player')} type="button">Single Player</Button>
      <!-- <Button flavor="secondary" on:click type="button">Pass and Play</Button>
      <Button flavor="secondary" on:click type="button">Online Multiplayer</Button>
      <Button flavor="secondary" on:click type="button">Campaign</Button> -->
    </div>
    <div class="flex space-x-[1rem] justify-center">
      {#each icons as { icon, clickHandler }}
        <Button type="icon" on:click={clickHandler}><Icon src="/icons/icon={icon}.svg" /></Button>
      {/each}
    </div>
    <slot />
  </div>
</Layout>
