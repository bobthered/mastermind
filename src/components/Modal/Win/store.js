import { writable } from 'svelte/store';

const { subscribe, update } = writable({ code: [], score: 0, show: false });

export default {
  hide: () => update(({ code, score }) => { return { code, score, show: false } }),
  show: ({code, score}) => update(() => { return { code, score, show: true } }),
  subscribe
}