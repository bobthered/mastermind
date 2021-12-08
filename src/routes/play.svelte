<script>
  // components
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import { Button, Icon, Layout, Modal, Peg, Timer } from '$components';
  import { game, modal } from '$stores';

  // handlers
  const pegAttemptClickHandler = (i,j) => {
    // deconstruct attempt
    const { results } = attempts[i];

    // check if results are undefined
    if ( results === undefined ) {
      // update peg color to current color
      attempts[i].pegs[j] = color;
    }
  }
  const pegChoiceClickHandler = i => {
    // update current color to color choice
    color = options.choices[i].color;

    // set all choices' current key to false
    options.choices = [...options.choices].map(choice=>{choice.current = false; return choice});

    // update current choice current key to true
    options.choices[i].current = true;
  };
  const submitAttemptClickHandler = i => {
    // get current attempt
    const attempt = [...attempts[i].pegs];    

    // copy code to temp code
    const tempCode = [...code];

    // calculate results
    let results = [...Array(options.pegs)].map(_=>'blank');

    // find all black results
    for( let j = attempt.length - 1; j >= 0; j--) {
      // check if color and position matches
      if ( tempCode[j] === attempt[j] ) {
        results = [...results, 'black'];
        attempt.splice(j,1);
        tempCode.splice(j,1);
      }
    }

    // find all white results
    for( let j = attempt.length - 1; j >= 0; j--) {
      // get index of color in code
      const index = tempCode.indexOf(attempt[j]);

      // check if index is greater than -1
      if ( index > -1 ) {
        results = [...results, 'white'];
        attempt.splice(j,1);
        tempCode.splice(index,1);
      }
    }

    // remove extra results
    results.splice(0, results.length-options.pegs)

    // sort result
    results = results.sort((a,b)=>b === 'black' ? 1 : b === 'blank' ? -1 : 0);

    // update results
    attempts[i].results = results;

    // check if player has won
    if ( results.filter(color=>color === 'black').length === options.pegs) {
      pause = true;
      const score = calculateScore();
      modal.win.show({code, score});
      return
    }

    // check if out of attempts
    if ( attempts.length === options.attempts ) {
      pause = true;
      return modal.lost.show(code);
    }

    // add next attempt
    addAttempt();
  }

  // utilities
  const addAttempt = () => attempts = [...attempts, {
        pegs : [...Array(options.pegs)].map(_ => 'blank'), 
        results: undefined,
      }]
  const calculateScore = () => {
    // initiate score
    let score = 1;

    // initiate factors
    const factors = {
      attempts : [...$game].filter(({label})=>label==='Attempts')[0].max / options.attempts,
      colors : Math.pow(1.73, options.colors * .7) - 1.15,
      pegs : Math.pow(1.653, options.pegs * .6) -.349,
      time : Math.max(1, 23.4 * Math.pow(.9896, options.time) )
    }

    // calculate score
    return Math.floor(Object.values(factors).reduce((score, factor)=>score*=factor, score));
  }

  // props (internal)
  let attempts = [];
  let code = [];
  let color = 'blank';
  const colorOptionsClasses = [
    { container: '', peg: 'p-[.25rem]'},
    { container: '', peg: 'p-[.25rem]'},
    { container: '', peg: 'p-[.25rem]'},
    { container: '', peg: 'p-[.25rem]'},
    { container: '', peg: 'p-[.25rem]'},
    { container: '', peg: 'p-[.25rem]'},
    { container: '', peg: 'p-[.25rem]'},
    { container: 'max-w-[14rem] md:max-w-none py-[.25rem]', peg: 'px-[.25rem]'},
    { container: 'max-w-[14rem] md:max-w-none', peg: 'p-[.25rem]'},
  ]
  const options = {
    attempts: 10,
    colors: 6,
    pegs: 4,
    time: 300
  };
  let pause = false;
  const pegColors = [
    'pink', 'blue', 'orange', 'contrast', 'green', 'red', 'purple', 'yellow'
  ]
  const pegOptionsClasses = [
    { container: '', peg: 'p-[.25rem]'},
  ]
  let query;
  let remaining;

  // props (external)
  export const init = () =>{
    // update settings from query parameters
    ({ query } = $page);
    if (query.get('attempts')) options.attempts = +query.get('attempts');
    if (query.get('colors')) options.colors = +query.get('colors');
    if (query.get('pegs')) options.pegs = +query.get('pegs');
    if (query.get('time')) options.time = +query.get('time');

    // initialize code
    code = [...Array(options.pegs)].map(_ => {
      // get random index
      const index = Math.floor(Math.random() * options.colors);

      // return color
      return pegColors[index];
    });

    // initialize choices
    options.choices = [...Array(options.colors)].map((_,i)=>{
      return { color: pegColors[i], current: false }
    })

    // initialize attempts
    addAttempt();
  }

  // props (dynamic)
  $: if ( remaining < 1 ) {
    console.log(remaining)
    modal.lost.show(code);
  }

  // lifecycle
  init();
</script>

<Layout 
  type="threeRows"
  mainClasses="px-[1rem] py-[.75rem] flex-col-reverse"
  bottomClasses="px-[1rem] py-[.75rem] border-t border-white border-opacity-[.1]"
>
  <!-- top -->
  <svelte:fragment slot="top">
    <div class="flex flex-grow justify-center">
      <Timer {pause} bind:remaining time={options.time} />
    </div>
  </svelte:fragment>

  <!-- main -->
  <svelte:fragment slot="main">
    <div class="flex flex-col justify-end">
      {#each attempts as {pegs, results}, i}
        <div class="flex items-center space-x-[.5rem]">
          <div class="text-right w-[1.5rem] text-[1.5rem] leading-[1.5rem] font-semibold">{i+1}</div>
          <div class="flex flex-grow flex-wrap justify-center">
            {#each pegs as color, j}
              <div class="p-[.25rem]">
                <Peg on:click={()=>pegAttemptClickHandler(i,j)} type="button" bind:color />
              </div>
            {/each}
          </div>
          <div class="min-w-[4.5rem] flex flex-wrap justify-center items-center">
            {#if results === undefined}
              <Button 
                on:click={() => submitAttemptClickHandler(i)}
                type="icon" 
                class="{[...pegs].filter(peg=>peg === 'blank').length === 0 ? 'opacity-[1] pointer-events-auto' : 'opacity-0 pointer-events-none'}"
              >
                <Icon src="/icons/icon=check.svg" />
              </Button>
            {:else}
              {#each results as color}
                <div class="p-[.125rem]">
                  <Peg type="result" {color} />
                </div>
              {/each}
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </svelte:fragment>

  <!-- bottom -->
  <svelte:fragment slot="bottom">
    <div class="flex flex-grow justify-center">
      <div class="flex flex-wrap justify-center {colorOptionsClasses[options.colors].container}">
        {#each options.choices as {color, current}, i}
          <div class="{colorOptionsClasses[options.colors].peg}">
            <Peg on:click={()=> pegChoiceClickHandler(i)} type="button" {color} {current}>
              {#if current}
                <Icon src="/icons/icon=check.svg" />
              {/if}
            </Peg>
          </div>
        {/each}
      </div>
    </div>
  </svelte:fragment>
</Layout>
<slot/>