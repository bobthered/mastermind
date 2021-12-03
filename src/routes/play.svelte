<script>
  // imports
  import { page } from '$app/stores';
  import { onMount } from 'svelte';

  // components
  import { Button, Icon } from '$components';

  // props (internal)
  let attempt = 0;
  let attempts = [];
  let color = '';
  const colorList = {
    'bg-pink-500': 'text-white',
    'bg-blue-500': 'text-white',
    'bg-orange-500': 'text-white',
    'bg-white': 'text-gray-900',
    'bg-green-500': 'text-white',
    'bg-red-500': 'text-white',
    'bg-purple-500': 'text-white',
    'bg-yellow-500': 'text-gray-900'
  };
  const gridColClasses = [
    '',
    'grid-cols-1',
    'grid-cols-2',
    'grid-cols-3',
    'grid-cols-4',
    'grid-cols-5',
    'grid-cols-6',
    'grid-cols-7',
    'grid-cols-8'
  ];
  const options = {
    attempts: 10,
    colors: 6,
    pegs: 4
  };

  // props (dynamic)
  $: colors = [...Object.keys(colorList)].slice(0, options.colors).reduce((obj, current) => {
    obj[current] = colorList[current];
    return obj;
  }, {});

  // lifecycle
  onMount(() => {
    // destructure page
    const { query } = $page;

    // check for custom query parameters
    if (query.get('attempt')) options.attempts = +query.get('attempt');
    if (query.get('color')) options.colors = +query.get('color');
    if (query.get('peg')) options.pegs = +query.get('peg');

    // initiate guesses
    attempts = Array(options.attempts)
      .fill(0)
      .map((_) => {
        // initiate
        const pegs = Array(options.pegs)
          .fill(0)
          .map((_) => '');
        const indicators = Array(options.pegs).map((_) => 'blank');
        return { pegs, indicators };
      });
  });
</script>

<div class="flex flex-col flex-grow overflow-hidden">
  <!-- top area -->
  <div class="flex flex-col-reverse flex-grow overflow-y-auto p-[1rem] py-[.5rem]">
    {#each attempts as { pegs, indicators }, i}
      <div class="flex space-x-[.5rem] items-center py-[.5rem]">
        <div class="w-[2rem] text-center">{i + 1}</div>
        {#each pegs as classes, j}
          <button
            on:click={() => {
              if (i === attempt) {
                pegs[j] = color;
              }
            }}
            class="w-[3rem] h-[3rem] rounded-full {classes === ''
              ? 'ring-1 ring-white ring-opacity-[.1]'
              : classes}"
          />
        {/each}
      </div>
    {/each}
  </div>
  <!-- bottom -->
  <div class="flex flex-col border-t border-white border-opacity-[.1]">
    <div class="flex w-full overflow-x-auto">
      <div class="grid {gridColClasses[options.colors]} gap-[.5rem] flex-grow p-[1rem]">
        <!-- <div class="flex space-x-[1rem] p-[1rem]"> -->
        {#each Object.keys(colors) as bgColor}
          <div class="aspect-w-1 aspect-h-1 max-h-[3rem] max-w-[3rem]">
            <button
              on:click={() => (color = bgColor)}
              type="button"
              class="w-full h-full  max-h-[3rem] max-w-[3rem] rounded-full flex items-center justify-center {bgColor} {colors[
                bgColor
              ]}"
            >
              {#if bgColor === color}
                <Icon src="/icons/icon=check.svg" />
              {/if}
            </button>
          </div>
        {/each}
      </div>
    </div>
    <div class="px-[1rem] pb-[1rem] flex">
      <Button type="submit" class="flex-grow">Submit</Button>
    </div>
  </div>
</div>
<slot />
