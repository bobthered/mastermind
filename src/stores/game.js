// imports
import { writable } from 'svelte/store';

// utilities
const timeTransform = (value) => {
  if (value > 1800) return '<div class="text-[2rem]">∞</div>';
  const minutes = Math.floor(value / 60);
  const seconds = value - minutes * 60;
  const time = [];
  if (minutes > 0) time.push(`${minutes}m`);
  if (seconds > 0) time.push(`${seconds}s`);
  return time.join(' ');
};

// initiate store value
let defaults = [
  { label: 'Attempts', min: 1, max: 100, step: 1, transform: (value) => value, value: 10 },
  { label: 'Colors', min: 2, max: 8, step: 1, transform: (value) => value, value: 6 },
  { label: 'Pegs', min: 1, max: 10, step: 1, transform: (value) => value, value: 4 },
  { label: 'Time', min: 15, max: 1815, step: 15, transform: timeTransform, value: 300 },
];

export default writable(defaults);