export interface AuthContextType {
    user: User | null;
    login: ({ email, password }: { email: string; password: string }) => Promise<any>;
    logout: () => Promise<void>;
    register: ({ username, email, password }: { username: string; email: string; password: string }) => Promise<any>;
    logoutIsPending: boolean;
    registerIsPending: boolean;
    loginIsPending: boolean;
    loginError: Error | null;
    registerError: Error | null;
    logoutError: Error | null;
    isInitialized: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isLoading: boolean;
}

export interface User {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    isAdmin?: boolean;
    createdAt: string;
    updatedAt?: string;
}


export interface Task {
    _id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'in-progress' | 'completed';
    category: string;
    createdAt: string;
    updatedAt: string;
    user: string;
  }
  
  export interface CreateTaskInput {
    title: string;
    description: string;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'in-progress' | 'completed';
    category: string;
  }
  
  export interface UpdateTaskStatusInput {
    taskId: string;
    status: 'pending' | 'in-progress' | 'completed';
  }
  
  export interface TaskResponse {
    success: boolean;
    data: Task;
  }
  
  export interface TasksResponse {
    success: boolean;
    data: Task[];
  }
  