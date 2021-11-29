<script>
  // imports
  import { classes } from './index.js'
</script>

<button on:click class={classes.replace(/bg-blue-500\s/g,'bg-white bg-opacity-[.05] ')}><slot/></button>