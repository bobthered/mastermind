<script context="module">
  export async function load({ page }) {
    // get game _id
    const _id = page.params.slug;
    return {
      props: {
        _id
      }
    };
  }
</script>

<script>
  // imports
  import { auth, modal, socket } from '$stores';

  // components
  import { Layout } from '$components';

  // handlers
  const initHandler = async () => {
    // initiate socket body
    const body = {
      _id,
      token: auth.token()
    };

    $socket.emit('getGame', body, ({ error, game: gameObj, token }) => {
      if (error) modal.error.show(error);
      if (!error) {
        auth.set(token);
        game = gameObj;
        updateSeconds();
      }
      loaded = true;
    });
  };

  // utilities
  const updateSeconds = () => {
    const start = new Date(game.date);
    const now = new Date(game.now);
    difference = Math.floor((now.getTime() - start.getTime()) / 1000);
    seconds = game.settings.time - difference - Math.floor()
    if (seconds > 0) updateTimer();
  };
  const updateTimer = () => {
    setTimeout(() => {
      seconds--;
      if (seconds > 0) updateTimer();
    }, 1000);
  };

  // props (internal)
  let difference;
  let game;
  let loaded = false;
  let seconds;
  let start = new Date().getTime();

  // props (external)
  export let _id;

  // props (dynamic)
  $: now = true ? new Date().getTime() : 0;
  $: seconds =
    difference === undefined
      ? undefined
      : Math.max(0, game.settings.time - difference - Math.floor((now - start) / 1000));
  $: if ($socket !== undefined && !loaded) initHandler();
  $: console.log(
    difference,
    now,
    start,
    now - start,
    game !== undefined ? game.settings.time : undefined,
    seconds
  );
</script>

<Layout>
  {seconds}
</Layout>
<slot />
