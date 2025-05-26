import { mockNotifications, mockRecentActivity } from '../mock/mockData';

// Simulated delay to mimic network request
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Dashboard service with mocked API calls
export const dashboardService = {
  // Get statistics
  async getStats() {
    await delay(700);
    
    return {
      projectsCount: 3,
      areasCount: 4,
      resourcesCount: 5,
      archivesCount: 3,
      completedProjectsCount: 2,
      recentActivitiesCount: 12
    };
  },
  
  // Get notifications
  async getNotifications() {
    await delay(500);
    return mockNotifications;
  },
  
  // Mark notification as read
  async markNotificationAsRead(id: string) {
    await delay(300);
    // In a real app, this would update the notification on the server
    return { success: true, id };
  },
  
  // Get recent activity
  async getRecentActivity() {
    await delay(600);
    return mockRecentActivity;
  },
  
  // Get user summary
  async getUserSummary() {
    await delay(800);
    
    return {
      projectsInProgress: 1,
      projectsCompleted: 2,
      projectsPlanned: 1,
      totalKnowledgeItems: 15
    };
  }
};