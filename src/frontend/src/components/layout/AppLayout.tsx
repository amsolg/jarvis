import { useState } from 'react';
import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { AppHeader } from './AppHeader';
import { AppNavbar } from './AppNavbar';

interface AppLayoutProps {
  onLogout: () => void;
}

export function AppLayout({ onLogout }: AppLayoutProps) {
  const [opened, setOpened] = useState(false);
  
  return (
    <AppShell
      padding="md"
      navbar={<AppNavbar opened={opened} />}
      header={<AppHeader opened={opened} setOpened={setOpened} onLogout={onLogout} />}
      styles={(theme) => ({
        main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
      })}
    >
      <Outlet />
    </AppShell>
  );
}