import { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Title,
  Text,
  SimpleGrid,
  Card,
  Group,
  Badge,
  Timeline,
  Avatar,
  Skeleton
} from '@mantine/core';
import { dashboardService } from '../../services/dashboardService';
import { mockProjects, mockRecentActivity, mockUser } from '../../mock/mockData';

export function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const dashboardStats = await dashboardService.getStats();
        const userSummary = await dashboardService.getUserSummary();
        
        setStats({
          ...dashboardStats,
          ...userSummary
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        // Simulate loading delay for demonstration
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchData();
  }, []);

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
      <Title order={1} mb="lg">Dashboard</Title>
      
      {/* Key Metrics */}
      <SimpleGrid cols={4} spacing="md" mb="lg" breakpoints={[
        { maxWidth: 'md', cols: 2 },
        { maxWidth: 'xs', cols: 1 }
      ]}>
        <Paper p="md" radius="md" withBorder>
          {loading ? (
            <Skeleton height={60} />
          ) : (
            <>
              <Text size="xl" weight={700}>
                {stats?.projectsCount || 0}
              </Text>
              <Text size="sm" color="dimmed">
                Projects
              </Text>
            </>
          )}
        </Paper>
        
        <Paper p="md" radius="md" withBorder>
          {loading ? (
            <Skeleton height={60} />
          ) : (
            <>
              <Text size="xl" weight={700}>
                {stats?.areasCount || 0}
              </Text>
              <Text size="sm" color="dimmed">
                Areas
              </Text>
            </>
          )}
        </Paper>
        
        <Paper p="md" radius="md" withBorder>
          {loading ? (
            <Skeleton height={60} />
          ) : (
            <>
              <Text size="xl" weight={700}>
                {stats?.resourcesCount || 0}
              </Text>
              <Text size="sm" color="dimmed">
                Resources
              </Text>
            </>
          )}
        </Paper>
        
        <Paper p="md" radius="md" withBorder>
          {loading ? (
            <Skeleton height={60} />
          ) : (
            <>
              <Text size="xl" weight={700}>
                {stats?.completedProjectsCount || 0}
              </Text>
              <Text size="sm" color="dimmed">
                Completed
              </Text>
            </>
          )}
        </Paper>
      </SimpleGrid>
      
      <Grid mb="lg">
        {/* Active Projects */}
        <Grid.Col md={7}>
          <Paper p="md" radius="md" withBorder>
            <Title order={3} mb="md">Active Projects</Title>
            
            {loading ? (
              <>
                <Skeleton height={70} mb="sm" />
                <Skeleton height={70} mb="sm" />
                <Skeleton height={70} />
              </>
            ) : (
              mockProjects.map((project) => (
                <Card key={project.id} mb="sm" padding="sm" radius="md" withBorder>
                  <Group position="apart">
                    <div>
                      <Text weight={500}>{project.title}</Text>
                      <Text size="xs" color="dimmed">{project.description}</Text>
                    </div>
                    <Badge color={
                      project.status === 'In Progress' ? 'blue' :
                      project.status === 'Planning' ? 'orange' : 'gray'
                    }>
                      {project.status}
                    </Badge>
                  </Group>
                  
                  {/* Progress bar */}
                  <div style={{ marginTop: 10 }}>
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
                      {project.progress}% complete • Due {formatDate(project.deadline)}
                    </Text>
                  </div>
                </Card>
              ))
            )}
          </Paper>
        </Grid.Col>
        
        {/* Recent Activity */}
        <Grid.Col md={5}>
          <Paper p="md" radius="md" withBorder>
            <Title order={3} mb="md">Recent Activity</Title>
            
            {loading ? (
              <Skeleton height={200} />
            ) : (
              <Timeline active={0}>
                {mockRecentActivity.map((activity, index) => (
                  <Timeline.Item
                    key={activity.id}
                    bullet={<Avatar size={22} src={mockUser.avatar} radius="xl" />}
                    title={
                      <Text size="sm">
                        <Text span weight={500}>
                          {mockUser.name}
                        </Text>{' '}
                        {activity.action} a {activity.itemType}
                      </Text>
                    }
                  >
                    <Text size="xs" color="dimmed">
                      {activity.itemTitle}
                    </Text>
                  </Timeline.Item>
                ))}
              </Timeline>
            )}
          </Paper>
        </Grid.Col>
      </Grid>
    </>
  );
}