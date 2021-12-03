<script>
  // imports
  import { browser } from '$app/env';
  import { theme } from '$stores';

  // props (internal)
  const html = {
    el: undefined,
    darkMode: {
      false: {
        add: ['bg-gray-50', 'text-gray-900'],
        remove: ['bg-gray-900', 'text-white']
      },
      true: {
        add: ['bg-gray-900', 'text-white'],
        remove: ['bg-gray-50', 'text-gray-900']
      }
    }
  };

  // props (dynamic)
  $: if (browser) html.el = document.querySelector('html');
  $: if ($theme && html.el !== undefined) {
    // update font size
    html.el.style.fontSize = `${$theme.fontSize}px`;

    // remove classes
    html.el.classList.remove(...html.darkMode[$theme.darkMode].remove);

    // add classes
    html.el.classList.add(...html.darkMode[$theme.darkMode].add);
  }
</script>

<div class="{$theme.bgColor} {$theme.textColor} font-light">
  <slot/>
</div>