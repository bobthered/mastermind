import { writable } from 'svelte/store';

const { subscribe, update } = writable({ show: false, message: '', handler: () => { } });

export default {
  hide: () => update(({ message }) => { return { show: false, message, handler: () => { } } }),
  show: (message, handler = () => { }) => update(() => { return { show: true, message, handler } }),
  subscribe
}