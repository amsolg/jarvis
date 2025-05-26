import { useState, useEffect } from 'react';
import {
  Title,
  Text,
  Card,
  Group,
  Badge,
  Skeleton,
  Grid,
  TextInput,
  ActionIcon,
  Menu,
  Select,
  Button
} from '@mantine/core';
import { archivesService } from '../../services/paraService';
import { mockArchives } from '../../mock/mockData';

export function Archives() {
  const [loading, setLoading] = useState(true);
  const [archives, setArchives] = useState<typeof mockArchives>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchArchives = async () => {
      setLoading(true);
      try {
        // In a real app, this would fetch from the backend
        const data = await archivesService.getArchives();
        setArchives(data);
      } catch (error) {
        console.error('Error fetching archives:', error);
      } finally {
        // Simulate loading delay
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchArchives();
  }, []);
  
  // Get unique archive types for filter
  const archiveTypes = [...new Set(mockArchives.map(a => a.type))];

  // Filter archives based on search term and type filter
  const filteredArchives = archives.filter(
    archive => {
      const matchesSearch = 
        archive.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        archive.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        archive.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
      const matchesType = !typeFilter || archive.type === typeFilter;
      
      return matchesSearch && matchesType;
    }
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
      <Title order={1} mb="md">Archives</Title>

      <Grid mb="lg">
        <Grid.Col xs={12} md={8}>
          <TextInput
            placeholder="Search archives..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Grid.Col>
        <Grid.Col xs={12} md={4}>
          <Select
            placeholder="Filter by type"
            clearable
            data={archiveTypes.map(type => ({ value: type, label: type }))}
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
          : filteredArchives.length > 0
          ? filteredArchives.map((archive) => (
              <Grid.Col key={archive.id} xs={12}>
                <Card p="md" radius="md" withBorder>
                  <Card.Section inheritPadding py="xs">
                    <Group position="apart">
                      <div>
                        <Group spacing={8}>
                          <Text weight={500}>{archive.title}</Text>
                          <Badge size="sm">{archive.type}</Badge>
                        </Group>
                      </div>
                      <Menu position="bottom-end">
                        <Menu.Target>
                          <ActionIcon>⋮</ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                          <Menu.Item>Restore</Menu.Item>
                          <Menu.Item color="red">Delete Permanently</Menu.Item>
                        </Menu.Dropdown>
                      </Menu>
                    </Group>
                  </Card.Section>

                  <Text size="sm" color="dimmed" my="md">
                    {archive.description}
                  </Text>
                  
                  <Group position="apart">
                    <Text size="sm">
                      <Text span weight={500}>
                        {archive.completedDate ? 'Completed:' : 'Archived:'}
                      </Text>{' '}
                      {formatDate(archive.completedDate || archive.archivedDate || '')}
                    </Text>
                  </Group>
                  
                  <Group position="apart" mt="md">
                    <div>
                      {archive.tags.map((tag) => (
                        <Badge key={tag} mr={5} size="xs" variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="subtle" size="sm">View Details</Button>
                  </Group>
                </Card>
              </Grid.Col>
            ))
          : (
              <Grid.Col span={12}>
                <Text align="center" color="dimmed">
                  No archives found matching your search criteria.
                </Text>
              </Grid.Col>
            )
        }
      </Grid>
    </>
  );
}