// Mock user data
export const mockUser = {
  id: '1',
  username: 'jsmith',
  email: 'john.smith@example.com',
  name: 'John Smith',
  avatar: 'https://i.pravatar.cc/300?u=jsmith',
};

// Mock projects data
export const mockProjects = [
  {
    id: '1',
    title: 'Jarvis Frontend Development',
    description: 'Implement the frontend UI for the Jarvis personal knowledge base.',
    status: 'In Progress',
    deadline: '2023-07-15',
    progress: 60,
    owner: 'jsmith',
    tags: ['frontend', 'development', 'react']
  },
  {
    id: '2',
    title: 'Backend API Design',
    description: 'Design and document the REST API structure for Jarvis.',
    status: 'Planning',
    deadline: '2023-08-01',
    progress: 20,
    owner: 'jsmith',
    tags: ['backend', 'api', 'design']
  },
  {
    id: '3',
    title: 'Mobile App Adaptation',
    description: 'Adapt Jarvis interface for mobile devices.',
    status: 'Not Started',
    deadline: '2023-09-15',
    progress: 0,
    owner: 'jsmith',
    tags: ['mobile', 'ui', 'responsive']
  },
];

// Mock areas data
export const mockAreas = [
  {
    id: '1',
    name: 'Personal Development',
    description: 'Activities and resources related to personal growth.',
    icon: '📚',
    items: 12
  },
  {
    id: '2',
    name: 'Finance',
    description: 'Financial planning and management.',
    icon: '💰',
    items: 8
  },
  {
    id: '3',
    name: 'Health',
    description: 'Health tracking and wellness activities.',
    icon: '🏃‍♂️',
    items: 15
  },
  {
    id: '4',
    name: 'Work',
    description: 'Professional development and work-related items.',
    icon: '💼',
    items: 23
  }
];

// Mock resources data
export const mockResources = [
  {
    id: '1',
    title: 'React Documentation',
    type: 'Documentation',
    url: 'https://reactjs.org/docs',
    description: 'Official React documentation',
    tags: ['react', 'frontend', 'javascript']
  },
  {
    id: '2',
    title: 'TypeScript Handbook',
    type: 'Documentation',
    url: 'https://www.typescriptlang.org/docs/',
    description: 'Official TypeScript documentation',
    tags: ['typescript', 'javascript', 'programming']
  },
  {
    id: '3',
    title: 'Building a Second Brain',
    type: 'Book',
    author: 'Tiago Forte',
    description: 'A methodology for saving and systematizing the knowledge you gain from reading.',
    tags: ['productivity', 'knowledge-management', 'books']
  },
  {
    id: '4',
    title: 'PARA Method Overview',
    type: 'Article',
    url: 'https://fortelabs.com/blog/para/',
    description: 'An introduction to the PARA method for personal knowledge management',
    tags: ['para', 'productivity', 'organization']
  },
  {
    id: '5',
    title: 'Modern JavaScript Tutorial',
    type: 'Course',
    url: 'https://javascript.info/',
    description: 'From the basics to advanced topics with simple explanations',
    tags: ['javascript', 'programming', 'tutorial']
  }
];

// Mock archives data
export const mockArchives = [
  {
    id: '1',
    title: 'Legacy Application Migration',
    type: 'Project',
    completedDate: '2023-01-15',
    description: 'Migration of legacy application to modern architecture',
    tags: ['migration', 'legacy', 'completed']
  },
  {
    id: '2',
    title: 'Website Redesign',
    type: 'Project',
    completedDate: '2023-03-22',
    description: 'Company website redesign project',
    tags: ['design', 'website', 'ui/ux']
  },
  {
    id: '3',
    title: 'Annual Marketing Report 2022',
    type: 'Resource',
    archivedDate: '2023-02-10',
    description: 'Marketing performance report for 2022',
    tags: ['marketing', 'report', 'annual']
  }
];

// Mock notifications data
export const mockNotifications = [
  {
    id: '1',
    type: 'reminder',
    title: 'Project Deadline Approaching',
    message: 'Jarvis Frontend Development is due in 3 days',
    date: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    read: false
  },
  {
    id: '2',
    type: 'update',
    title: 'Resource Updated',
    message: 'TypeScript Handbook has been updated',
    date: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    read: true
  },
  {
    id: '3',
    type: 'system',
    title: 'System Maintenance',
    message: 'Scheduled maintenance in 24 hours',
    date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    read: false
  }
];

// Mock Recent Activity
export const mockRecentActivity = [
  {
    id: '1',
    action: 'created',
    itemType: 'project',
    itemTitle: 'Mobile App Adaptation',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
    user: 'jsmith'
  },
  {
    id: '2',
    action: 'updated',
    itemType: 'resource',
    itemTitle: 'React Documentation',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    user: 'jsmith'
  },
  {
    id: '3',
    action: 'archived',
    itemType: 'project',
    itemTitle: 'Website Redesign',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    user: 'jsmith'
  }
];