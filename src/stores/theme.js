// imports
import { writable } from 'svelte/store';

// initiate default store
const defaults = {
  bgColor: 'bg-gray-900',
  textColor: 'text-white',
  primaryBgColor: 'bg-blue-500',
  primaryContrastTextColor: 'text-white',
  primaryRingColor: 'ring-blue-500',
  primaryTextColor: 'text-blue-500',
}

const createStore = () => {
  const { set, subscribe, update } = writable(defaults);

  return { set, subscribe, update }
}

export default createStore();