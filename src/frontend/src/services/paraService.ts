import { mockProjects, mockAreas, mockResources, mockArchives } from '../mock/mockData';

// Simulated delay to mimic network request
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Projects Service
export const projectsService = {
  // Get all projects
  async getProjects() {
    await delay(600);
    return mockProjects;
  },
  
  // Get project by id
  async getProject(id: string) {
    await delay(300);
    const project = mockProjects.find(p => p.id === id);
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  },
  
  // Create new project (mock implementation)
  async createProject(projectData: Omit<typeof mockProjects[0], 'id'>) {
    await delay(800);
    // In a real app, the server would generate an ID and return the new project
    const newProject = {
      ...projectData,
      id: `new-${Date.now()}`, // Simulate a new ID
    };
    return newProject;
  },
  
  // Update project (mock implementation)
  async updateProject(id: string, projectData: Partial<typeof mockProjects[0]>) {
    await delay(700);
    const project = mockProjects.find(p => p.id === id);
    if (!project) {
      throw new Error('Project not found');
    }
    // In a real app, this would update the server data
    return {
      ...project,
      ...projectData
    };
  },
  
  // Delete project (mock implementation)
  async deleteProject(id: string) {
    await delay(500);
    // In a real app, this would delete from the server
    return { success: true };
  }
};

// Areas Service
export const areasService = {
  // Get all areas
  async getAreas() {
    await delay(600);
    return mockAreas;
  },
  
  // Get area by id
  async getArea(id: string) {
    await delay(300);
    const area = mockAreas.find(a => a.id === id);
    if (!area) {
      throw new Error('Area not found');
    }
    return area;
  },
  
  // Create new area (mock implementation)
  async createArea(areaData: Omit<typeof mockAreas[0], 'id'>) {
    await delay(800);
    const newArea = {
      ...areaData,
      id: `new-${Date.now()}`, 
    };
    return newArea;
  },
  
  // Update area (mock implementation)
  async updateArea(id: string, areaData: Partial<typeof mockAreas[0]>) {
    await delay(700);
    const area = mockAreas.find(a => a.id === id);
    if (!area) {
      throw new Error('Area not found');
    }
    return {
      ...area,
      ...areaData
    };
  },
  
  // Delete area (mock implementation)
  async deleteArea(id: string) {
    await delay(500);
    return { success: true };
  }
};

// Resources Service
export const resourcesService = {
  // Get all resources
  async getResources() {
    await delay(600);
    return mockResources;
  },
  
  // Get resource by id
  async getResource(id: string) {
    await delay(300);
    const resource = mockResources.find(r => r.id === id);
    if (!resource) {
      throw new Error('Resource not found');
    }
    return resource;
  },
  
  // Create new resource (mock implementation)
  async createResource(resourceData: Omit<typeof mockResources[0], 'id'>) {
    await delay(800);
    const newResource = {
      ...resourceData,
      id: `new-${Date.now()}`, 
    };
    return newResource;
  },
  
  // Update resource (mock implementation)
  async updateResource(id: string, resourceData: Partial<typeof mockResources[0]>) {
    await delay(700);
    const resource = mockResources.find(r => r.id === id);
    if (!resource) {
      throw new Error('Resource not found');
    }
    return {
      ...resource,
      ...resourceData
    };
  },
  
  // Delete resource (mock implementation)
  async deleteResource(id: string) {
    await delay(500);
    return { success: true };
  }
};

// Archives Service
export const archivesService = {
  // Get all archives
  async getArchives() {
    await delay(600);
    return mockArchives;
  },
  
  // Get archive by id
  async getArchive(id: string) {
    await delay(300);
    const archive = mockArchives.find(a => a.id === id);
    if (!archive) {
      throw new Error('Archive not found');
    }
    return archive;
  },
};