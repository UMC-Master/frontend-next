'use client';

import { createContext, useContext } from 'react';

export interface AppBarConfig {
  showBack?: boolean;
  title?: string;
}

export const AppBarContext = createContext<AppBarConfig>({});

export const useAppBar = () => useContext(AppBarContext);
console.log('AppBarContext loaded');
