import { useState } from 'react';
import { TextInput, PasswordInput, Button, Group, Box, Title, Text, Anchor, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { authService } from '../../services/authService';
import type { RegistrationData } from '../../services/authService';

interface RegisterProps {
  onSuccess: () => void;
  onLoginClick: () => void;
}

export function Register({ onSuccess, onLoginClick }: RegisterProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm<RegistrationData>({
    initialValues: {
      username: '',
      email: '',
      password: '',
      name: '',
    },
    validate: {
      email: (value) => (!value.includes('@') ? 'Invalid email address' : null),
      password: (value) => (value.length < 6 ? 'Password should be at least 6 characters' : null),
      username: (value) => (value.length < 3 ? 'Username should be at least 3 characters' : null),
      name: (value) => (value.length < 2 ? 'Name should be at least 2 characters' : null),
    },
  });

  const handleSubmit = async (values: RegistrationData) => {
    setLoading(true);
    setError('');
    
    try {
      const result = await authService.register(values);
      // Store token in localStorage for demo purposes
      localStorage.setItem('jarvis_auth_token', result.token);
      onSuccess();
    } catch (error) {
      setError('Registration failed. Please check your information and try again.');
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400 }} mx="auto">
      <Title order={2} mb="md">Create an account</Title>
      <Text color="dimmed" size="sm" mb={20}>
        Join Jarvis for personal knowledge management
      </Text>
      
      {error && (
        <Alert color="red" mb="md" title="Registration Error">
          {error}
        </Alert>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          required
          label="Name"
          placeholder="Your full name"
          {...form.getInputProps('name')}
        />
        
        <TextInput
          required
          mt="md"
          label="Username"
          placeholder="Choose a username"
          {...form.getInputProps('username')}
        />
        
        <TextInput
          required
          mt="md"
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
        />
        
        <PasswordInput
          required
          mt="md"
          label="Password"
          placeholder="Create a password"
          {...form.getInputProps('password')}
        />
        
        <Group mt="lg" position="apart">
          <Anchor 
            component="button" 
            type="button" 
            color="dimmed" 
            size="sm"
            onClick={onLoginClick}
          >
            Already have an account? Sign in
          </Anchor>
          
          <Button type="submit" loading={loading}>
            Register
          </Button>
        </Group>
      </form>
    </Box>
  );
}