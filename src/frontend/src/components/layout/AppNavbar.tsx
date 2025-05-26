import { Navbar, NavLink, ScrollArea } from '@mantine/core';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavItem {
  label: string;
  icon: string;
  link: string;
  description?: string;
}

// Navigation items
const mainNavItems: NavItem[] = [
  { label: 'Dashboard', icon: '📊', link: '/dashboard' },
  { label: 'Projects', icon: '📝', link: '/projects' },
  { label: 'Areas', icon: '🔄', link: '/areas' },
  { label: 'Resources', icon: '📚', link: '/resources' },
  { label: 'Archives', icon: '🗄️', link: '/archives' },
];

const otherNavItems: NavItem[] = [
  { label: 'Settings', icon: '⚙️', link: '/settings' },
  { label: 'Help', icon: '❓', link: '/help' },
];

interface AppNavbarProps {
  opened: boolean;
}

export function AppNavbar({ opened }: AppNavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Create nav links
  const links = (items: NavItem[]) => {
    return items.map((item) => (
      <NavLink
        key={item.label}
        label={item.label}
        icon={<span role="img" aria-label={item.label}>{item.icon}</span>}
        description={item.description}
        onClick={() => navigate(item.link)}
        active={location.pathname === item.link}
        variant="filled"
      />
    ));
  };

  return (
    <Navbar
      p="md"
      hiddenBreakpoint="sm"
      hidden={!opened}
      width={{ sm: 200, lg: 250 }}
    >
      <Navbar.Section grow component={ScrollArea}>
        {links(mainNavItems)}
      </Navbar.Section>
      
      <Navbar.Section>
        {/* Divider */}
        <div style={{
          borderTop: '1px solid #e9ecef',
          margin: '10px 0',
        }} />
        {links(otherNavItems)}
      </Navbar.Section>
    </Navbar>
  );
}