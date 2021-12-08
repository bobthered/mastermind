import { writable } from 'svelte/store';

const { subscribe, update } = writable({ code: [], show: false });

export default {
  hide: () => update(({ code }) => { return { code, show: false } }),
  show: (code) => update(() => { return { code, show: true } }),
  subscribe
}