import { useState } from 'react';
import { TextInput, PasswordInput, Button, Group, Box, Title, Text, Anchor, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { authService, LoginCredentials } from '../../services/authService';

interface LoginProps {
  onSuccess: () => void;
  onRegisterClick: () => void;
}

export function Login({ onSuccess, onRegisterClick }: LoginProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<LoginCredentials>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (!value.includes('@') ? 'Invalid email address' : null),
      password: (value) => (value.length < 6 ? 'Password should be at least 6 characters' : null),
    },
  });

  const handleSubmit = async (values: LoginCredentials) => {
    setLoading(true);
    setError('');
    
    try {
      const result = await authService.login(values);
      // Store token in localStorage for demo purposes
      // In a real app, this would be handled with proper authentication state management
      localStorage.setItem('jarvis_auth_token', result.token);
      onSuccess();
    } catch (error) {
      setError('Invalid email or password');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400 }} mx="auto">
      <Title order={2} mb="md">Welcome to Jarvis</Title>
      <Text color="dimmed" size="sm" mb={20}>
        Your personal knowledge management assistant
      </Text>
      
      {error && (
        <Alert color="red" mb="md" title="Authentication Error">
          {error}
        </Alert>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        
        <PasswordInput
          required
          mt="md"
          label="Password"
          placeholder="Your password"
          {...form.getInputProps('password')}
        />
        
        <Group mt="lg" justify="space-between">
          <Anchor 
            component="button" 
            type="button" 
            color="dimmed" 
            size="sm"
            onClick={onRegisterClick}
          >
            Don't have an account? Register
          </Anchor>
          
          <Button type="submit" loading={loading}>
            Sign in
          </Button>
        </Group>
      </form>
    </Box>
  );
}