import { useState, useEffect } from 'react';
import {
  Title,
  Text,
  Card,
  Button,
  Group,
  Skeleton,
  Grid,
  TextInput,
  ActionIcon,
  Menu
} from '@mantine/core';
import { areasService } from '../../services/paraService';
import { mockAreas } from '../../mock/mockData';

export function Areas() {
  const [loading, setLoading] = useState(true);
  const [areas, setAreas] = useState<typeof mockAreas>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAreas = async () => {
      setLoading(true);
      try {
        // In a real app, this would fetch from the backend
        const data = await areasService.getAreas();
        setAreas(data);
      } catch (error) {
        console.error('Error fetching areas:', error);
      } finally {
        // Simulate loading delay
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchAreas();
  }, []);

  // Filter areas based on search term
  const filteredAreas = areas.filter(
    area =>
      area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      area.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Group position="apart" mb="md">
        <Title order={1}>Areas</Title>
        <Button>New Area</Button>
      </Group>

      <TextInput
        placeholder="Search areas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        mb="lg"
      />

      <Grid>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Grid.Col key={i} xs={12} md={6} lg={3}>
                <Card p="md" radius="md" withBorder>
                  <Skeleton height={30} mb="sm" />
                  <Skeleton height={15} mb="lg" />
                  <Skeleton height={15} width="40%" />
                </Card>
              </Grid.Col>
            ))
          : filteredAreas.length > 0
          ? filteredAreas.map((area) => (
              <Grid.Col key={area.id} xs={12} md={6} lg={3}>
                <Card p="md" radius="md" withBorder>
                  <Card.Section inheritPadding py="xs">
                    <Group position="apart">
                      <Group>
                        <Text size="xl">{area.icon}</Text>
                        <Text weight={500}>{area.name}</Text>
                      </Group>
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
                    {area.description}
                  </Text>

                  <Group position="apart" mt="md">
                    <Text size="sm">
                      <Text span weight={500}>{area.items}</Text> items
                    </Text>
                    <Button compact variant="subtle">View</Button>
                  </Group>
                </Card>
              </Grid.Col>
            ))
          : (
              <Grid.Col span={12}>
                <Text align="center" color="dimmed">
                  No areas found matching your search criteria.
                </Text>
              </Grid.Col>
            )
        }
      </Grid>
    </>
  );
}