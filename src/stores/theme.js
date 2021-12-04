// imports
import { writable } from 'svelte/store';

// initiate default store
const defaults = {
  bgColor: 'bg-gray-900',
  contrastBgColor: 'bg-white',
  contrastTextColor: 'text-gray-900',
  color: 'blue',
  darkMode: true,
  fontSize: 16,
  primaryBgColor: 'bg-blue-500',
  primaryContrastTextColor: 'text-white',
  primaryRingColor: 'ring-blue-500',
  primaryTextColor: 'text-blue-500',
  ringColor: 'ring-white',
  textColor: 'text-white',
}

const createStore = () => {
  const store = writable(defaults);

  // methods
  const reset = () => {
    store.update(() => {
      return {
        bgColor: 'bg-gray-900',
        contrastBgColor: 'bg-white',
        contrastTextColor: 'text-gray-900',
        color: 'blue',
        darkMode: true,
        fontSize: 16,
        primaryBgColor: 'bg-blue-500',
        primaryContrastTextColor: 'text-white',
        primaryRingColor: 'ring-blue-500',
        primaryTextColor: 'text-blue-500',
        ringColor: 'ring-white',
        textColor: 'text-white',
      }
    });
  }
  const set = ({ color, darkMode, fontSize }) => {
    store.update(state => updateState({ color, darkMode, fontSize, state }))
  }
  const update = ({ color, darkMode, fontSize }) => {
    store.update(state => updateState({ color, darkMode, fontSize, state }))
  }
  const updateState = ({ color, darkMode, fontSize, state }) => {
    // update color
    state.color = color;

    // update darkMode
    state.darkMode = darkMode;

    // update fontSize
    state.fontSize = fontSize;

    // update color settings
    if (color === 'pink') {
      state.primaryBgColor = 'bg-pink-500';
      state.primaryRingColor = 'ring-pink-500';
      state.primaryTextColor = 'text-pink-500';
      state.primaryContrastTextColor = 'text-white';
    }
    if (color === 'red') {
      state.primaryBgColor = 'bg-red-500';
      state.primaryRingColor = 'ring-red-500';
      state.primaryTextColor = 'text-red-500';
      state.primaryContrastTextColor = 'text-white';
    }
    if (color === 'orange') {
      state.primaryBgColor = 'bg-orange-500';
      state.primaryRingColor = 'ring-orange-500';
      state.primaryTextColor = 'text-orange-500';
      state.primaryContrastTextColor = 'text-white';
    }
    if (color === 'yellow') {
      state.primaryBgColor = 'bg-yellow-500';
      state.primaryRingColor = 'ring-yellow-500';
      state.primaryTextColor = 'text-yellow-500';
      state.primaryContrastTextColor = 'text-gray-900';
    }
    if (color === 'green') {
      state.primaryBgColor = 'bg-green-500';
      state.primaryRingColor = 'ring-green-500';
      state.primaryTextColor = 'text-green-500';
      state.primaryContrastTextColor = 'text-white';
    }
    if (color === 'blue') {
      state.primaryBgColor = 'bg-blue-500';
      state.primaryRingColor = 'ring-blue-500';
      state.primaryTextColor = 'text-blue-500';
      state.primaryContrastTextColor = 'text-white';
    }
    if (color === 'purple') {
      state.primaryBgColor = 'bg-purple-500';
      state.primaryRingColor = 'ring-purple-500';
      state.primaryTextColor = 'text-purple-500';
      state.primaryContrastTextColor = 'text-white';
    }

    // update darkMode settings
    if (darkMode) {
      state.bgColor = 'bg-gray-900';
      state.contrastBgColor = 'bg-white';
      state.contrastTextColor = 'text-gray-900';
      state.ringColor = 'ring-white';
      state.textColor = 'text-white';
    }
    if (!darkMode) {
      state.bgColor = 'bg-gray-50';
      state.contrastBgColor = 'bg-gray-900';
      state.contrastTextColor = 'text-white';
      state.ringColor = 'ring-gray-900';
      state.textColor = 'text-gray-900';
    }
    return state;
  }

  return { reset, set, subscribe: store.subscribe, update }
}

export default createStore();