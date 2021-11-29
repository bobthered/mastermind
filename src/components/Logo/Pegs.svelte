<script>
  // props ( internal )
  const colors = ['bg-pink-500', 'bg-green-500', 'bg-white', 'bg-purple-500'];
</script>

<div class="flex space-x-[1rem]">
  {#each colors as bgColor}
    <div class="rounded-full w-[2rem] h-[2rem] {bgColor}" />
  {/each}
</div>
