import { useState } from 'react';
import { Paper, Container } from '@mantine/core';
import { Login } from './Login';
import { Register } from './Register';

interface AuthContainerProps {
  onAuthSuccess: () => void;
}

export function AuthContainer({ onAuthSuccess }: AuthContainerProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <Container size={420} my={40}>
      <Paper radius="md" p="xl" withBorder>
        {activeTab === 'login' ? (
          <Login
            onSuccess={onAuthSuccess}
            onRegisterClick={() => setActiveTab('register')}
          />
        ) : (
          <Register
            onSuccess={onAuthSuccess}
            onLoginClick={() => setActiveTab('login')}
          />
        )}
      </Paper>
    </Container>
  );
}