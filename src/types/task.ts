export interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  category?: string;
  createdAt: string;
  updatedAt: string;
  user: string;
}

export interface CreateTaskInput {
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  category?: string;
}

export interface UpdateTaskStatusInput {
  taskId: string;
  status: ' todo' | 'in-progress' | 'completed';
}

export interface TaskResponse {
  success: boolean;
  data: Task;
}

export interface TasksResponse {
  success: boolean;
  data: Task[];
}
