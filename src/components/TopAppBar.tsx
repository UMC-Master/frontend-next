'use client';

import AppHeader from './AppHeader';
import { useAppBar } from './AppBarContext';

export default function TopAppBar() {
  const { showBack, title } = useAppBar();
  console.log(useAppBar());

  return <AppHeader showBack={showBack} title={title} />;
}
