// src/createEmotionCache.ts
import createCache from '@emotion/cache';

export default function createEmotionCache() {
  return createCache({ key: 'mui', prepend: true });
}
