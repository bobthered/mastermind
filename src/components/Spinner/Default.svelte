<script>
  // props (external)
  export let height = 'h-[100px]';
  export let width = 'w-[100px]';
</script>

<style>
  @keyframes spinner-dash {
    0% {
      stroke-dasharray : 1, 200;
      stroke-dashoffset: 0
    }
    50% {
      stroke-dasharray : 89, 200;
      stroke-dashoffset: -35px
    }
    100% {
      stroke-dasharray : 89, 200;
      stroke-dashoffset: -124px
    }
  }
  @keyframes spinner-rotate {
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
  }

  .spinner-dash {
    animation: spinner-dash 1.5s ease-in-out infinite;
  }
  .spinner-rotate {
    animation: spinner-rotate 2s linear infinite;
  }
</style>

<svg class="{height} {width} spinner-rotate" viewBox="25 25 50 50">
  <circle class="spinner-dash" cx="50" cy="50" r="20" stroke="currentColor" fill="none" stroke-width="2" stroke-miterlimit="10"/>
</svg>