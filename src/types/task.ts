import { Task } from "../../types";

export interface CreateTaskInput {
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in-progress' | 'completed';
  category?: string;
}

export interface UpdateTaskStatusInput {
  id: string;
  subtaskId?: string;
  status: 'todo' | 'in-progress' | 'completed';
}

export interface TaskResponse {
  success: boolean;
  data: Task;
}

export interface TasksResponse {
  success: boolean;
  data: Task[];
}
