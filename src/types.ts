export interface Task {
    id?: number;
    title: string;
    description: string;
    dueDate: string;
    priority: string;
    status?: 'completed' | 'in progress';
  }
  