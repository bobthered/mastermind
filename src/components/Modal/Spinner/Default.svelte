<script>
  // import
  import store from './store.js';

  // components
  import { Modal, Spinner } from '$components';
</script>

<Modal bind:show={$store}>
  <div class="flex flex-grow items-center justify-center">
    <Spinner />
  </div>
</Modal>