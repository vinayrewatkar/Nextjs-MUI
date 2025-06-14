// src/components/ClientStyleRegistry.tsx
'use client';

import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from './../../types/createEmotionCache';
const clientEmotionCache = createEmotionCache();

export function ClientStyleRegistry({ children }: { children: React.ReactNode }) {
  return <CacheProvider value={clientEmotionCache}>{children}</CacheProvider>;
}
