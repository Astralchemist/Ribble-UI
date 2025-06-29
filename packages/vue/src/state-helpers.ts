import { computed } from 'vue';

// Pinia/Vuex state management integration helpers
// Usage: import { useStore } from 'pinia' or 'vuex'
// Example composable for Pinia:
export function usePiniaState(store: any, key: string) {
  return computed({
    get: () => store[key],
    set: (v) => (store[key] = v),
  });
}
