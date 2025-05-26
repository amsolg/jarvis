import { useState, useEffect } from 'react';
import {
  Title,
  Text,
  Card,
  Button,
  Group,
  Badge,
  Skeleton,
  Grid,
  TextInput,
  ActionIcon,
  Menu
} from '@mantine/core';
import { projectsService } from '../../services/paraService';
import { mockProjects } from '../../mock/mockData';

export function Projects() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<typeof mockProjects>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        // In a real app, this would fetch from the backend
        const data = await projectsService.getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        // Simulate loading delay
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchProjects();
  }, []);

  // Filter projects based on search term
  const filteredProjects = projects.filter(
    project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <>
      <Group position="apart" mb="md">
        <Title order={1}>Projects</Title>
        <Button>New Project</Button>
      </Group>

      <TextInput
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb="lg"
      />

      <Grid>
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Grid.Col key={i} xs={12} md={6} lg={4}>
                <Card p="md" radius="md" withBorder>
                  <Skeleton height={20} mb="sm" width="70%" />
                  <Skeleton height={15} mb="lg" />
                  <Skeleton height={15} width="40%" mb="sm" />
                  <Skeleton height={8} width="100%" mb="sm" />
                  <Group position="apart" mt="md">
                    <Skeleton height={20} width={80} />
                    <Skeleton height={20} circle />
                  </Group>
                </Card>
              </Grid.Col>
            ))
          : filteredProjects.length > 0
          ? filteredProjects.map((project) => (
              <Grid.Col key={project.id} xs={12} md={6} lg={4}>
                <Card p="md" radius="md" withBorder>
                  <Card.Section inheritPadding py="xs">
                    <Group position="apart">
                      <Text weight={500}>{project.title}</Text>
                      <Menu position="bottom-end">
                        <Menu.Target>
                          <ActionIcon>⋮</ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item>Edit</Menu.Item>
                          <Menu.Item>Archive</Menu.Item>
                          <Menu.Item color="red">Delete</Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  </Card.Section>

                  <Text size="sm" color="dimmed" mb="md">
                    {project.description}
                  </Text>

                  <Group mb="xs">
                    <Text size="sm">
                      <Text span weight={500}>Status:</Text>{' '}
                      <Badge size="sm" color={
                        project.status === 'In Progress' ? 'blue' :
                        project.status === 'Planning' ? 'orange' : 'gray'
                      }>
                        {project.status}
                      </Badge>
                    </Text>
                  </Group>

                  <Text size="sm">
                    <Text span weight={500}>Due:</Text>{' '}
                    {formatDate(project.deadline)}
                  </Text>
                  
                  {/* Progress bar */}
                  <div style={{ marginTop: 15 }}>
                    <div style={{ 
                      height: 5, 
                      backgroundColor: '#f1f3f5', 
                      borderRadius: 5, 
                      overflow: 'hidden' 
                    }}>
                      <div style={{ 
                        height: '100%', 
                        width: `${project.progress}%`, 
                        backgroundColor: '#228be6', 
                        borderRadius: 5
                      }} />
                    </div>
                    <Text size="xs" mt={5} align="right">
                      {project.progress}% complete
                    </Text>
                  </div>
                  
                  <Group position="apart" mt="md">
                    <div>
                      {project.tags.map((tag) => (
                        <Badge key={tag} mr={5} size="xs" variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </Group>
                </Card>
              </Grid.Col>
            ))
          : (
              <Grid.Col span={12}>
                <Text align="center" color="dimmed">
                  No projects found matching your search criteria.
                </Text>
              </Grid.Col>
            )
        }
      </Grid>
    </>
  );
}