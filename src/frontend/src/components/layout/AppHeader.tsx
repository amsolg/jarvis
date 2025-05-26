import { useState } from 'react';
import {
  Header,
  Group,
  ActionIcon,
  Title,
  Menu,
  UnstyledButton,
  Text,
  Avatar,
  Divider,
  Burger
} from '@mantine/core';
import { mockUser, mockNotifications } from '../../mock/mockData';

interface AppHeaderProps {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  onLogout: () => void;
}

export function AppHeader({ opened, setOpened, onLogout }: AppHeaderProps) {
  const [notificationOpened, setNotificationOpened] = useState(false);

  return (
    <Header height={60} p="md">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
        <Group>
          <Burger
            opened={opened}
            onClick={() => setOpened(!opened)}
            size="sm"
            mr="xl"
          />
          <Title order={3}>Jarvis</Title>
        </Group>

        <Group>
          {/* Notifications menu */}
          <Menu
            width={300}
            position="bottom-end"
            opened={notificationOpened}
            onChange={setNotificationOpened}
          >
            <Menu.Target>
              <ActionIcon size="lg">
                <div style={{ position: 'relative' }}>
                  🔔
                  {mockNotifications.filter(n => !n.read).length > 0 && (
                    <span style={{
                      position: 'absolute',
                      top: -5,
                      right: -5,
                      backgroundColor: 'red',
                      borderRadius: '50%',
                      width: 10,
                      height: 10,
                    }} />
                  )}
                </div>
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Notifications</Menu.Label>
              {mockNotifications.map(notification => (
                <Menu.Item key={notification.id}>
                  <div>
                    <Text size="sm" weight={500}>
                      {notification.title}
                    </Text>
                    <Text size="xs" color="dimmed">
                      {notification.message}
                    </Text>
                  </div>
                </Menu.Item>
              ))}
              <Divider />
              <Menu.Item>View all notifications</Menu.Item>
            </Menu.Dropdown>
          </Menu>
          
          {/* User menu */}
          <Menu position="bottom-end" width={200} withArrow>
            <Menu.Target>
              <UnstyledButton>
                <Group spacing="xs">
                  <Avatar src={mockUser.avatar} radius="xl" size={30} />
                  <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                    {mockUser.name}
                  </Text>
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Account</Menu.Label>
              <Menu.Item>Profile</Menu.Item>
              <Menu.Item>Settings</Menu.Item>
              <Divider />
              <Menu.Item onClick={onLogout} color="red">
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </div>
    </Header>
  );
}