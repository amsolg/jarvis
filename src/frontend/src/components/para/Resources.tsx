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
  Menu,
  Select
} from '@mantine/core';
import { resourcesService } from '../../services/paraService';
import { mockResources } from '../../mock/mockData';

export function Resources() {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<typeof mockResources>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        // In a real app, this would fetch from the backend
        const data = await resourcesService.getResources();
        setResources(data);
      } catch (error) {
        console.error('Error fetching resources:', error);
      } finally {
        // Simulate loading delay
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchResources();
  }, []);

  // Get unique resource types for filter
  const resourceTypes = [...new Set(mockResources.map(r => r.type))];

  // Filter resources based on search term and type filter
  const filteredResources = resources.filter(
    resource => {
      const matchesSearch = 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (resource.tags && resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
        
      const matchesType = !typeFilter || resource.type === typeFilter;
      
      return matchesSearch && matchesType;
    }
  );

  return (
    <>
      <Group position="apart" mb="md">
        <Title order={1}>Resources</Title>
        <Button>New Resource</Button>
      </Group>

      <Grid mb="lg">
        <Grid.Col xs={12} md={8}>
          <TextInput
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid.Col>
        <Grid.Col xs={12} md={4}>
          <Select
            placeholder="Filter by type"
            clearable
            data={resourceTypes.map(type => ({ value: type, label: type }))}
            value={typeFilter}
            onChange={setTypeFilter}
          />
        </Grid.Col>
      </Grid>

      <Grid>
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Grid.Col key={i} xs={12}>
                <Card p="md" radius="md" withBorder>
                  <Skeleton height={20} mb="sm" width="70%" />
                  <Skeleton height={15} mb="lg" />
                  <Group position="apart">
                    <Skeleton height={20} width={80} />
                    <Skeleton height={20} width={100} />
                  </Group>
                </Card>
              </Grid.Col>
            ))
          : filteredResources.length > 0
          ? filteredResources.map((resource) => (
              <Grid.Col key={resource.id} xs={12}>
                <Card p="md" radius="md" withBorder>
                  <Card.Section inheritPadding py="xs">
                    <Group position="apart">
                      <div>
                        <Group spacing={8}>
                          <Text weight={500}>{resource.title}</Text>
                          <Badge size="sm">{resource.type}</Badge>
                        </Group>
                      </div>
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

                  <Text size="sm" color="dimmed" my="md">
                    {resource.description}
                  </Text>
                  
                  <Group position="apart" mt="md">
                    <div>
                      {resource.tags && resource.tags.map((tag) => (
                        <Badge key={tag} mr={5} size="xs" variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Group>
                      {resource.url && (
                        <Button compact variant="subtle" component="a" href={resource.url} target="_blank" rel="noopener noreferrer">
                          Visit Link
                        </Button>
                      )}
                      <Button compact>View Details</Button>
                    </Group>
                  </Group>
                </Card>
              </Grid.Col>
            ))
          : (
              <Grid.Col span={12}>
                <Text align="center" color="dimmed">
                  No resources found matching your search criteria.
                </Text>
              </Grid.Col>
            )
        }
      </Grid>
    </>
  );
}