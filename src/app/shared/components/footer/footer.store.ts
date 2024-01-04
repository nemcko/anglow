import { computed } from '@angular/core';
import { signalStore, patchState, withComputed, withMethods, withState } from '@ngrx/signals';

export const FooterStore = signalStore(
  withState({ count: 0 }),
  withComputed(({ count }) => ({
    numSec: computed(() => count()),
  })),
  withMethods(({ count, ...store }) => ({
    increment() {
      patchState(store, { count: count() + 1 });
    },
  }))
);
