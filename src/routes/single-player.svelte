<script>
  // imports
  import { auth, modal, socket } from '$stores';

  // components
  import Route from './quick-play.svelte';

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
          goto(`/play/${_id}`);
        }
      });
    }
    submitted = true;
  };

  // props (internal)
  let submitted = false;
</script>

<Route {submitHandler} />
