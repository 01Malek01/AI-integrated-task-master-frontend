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
    status: 'todo' | 'in-progress' | 'completed';
    category: string;
    createdAt: string;
    updatedAt: string;
    user: string;
    subTasks : SubTask[];
  }
  export interface SubTask {
    _id: string;
    title: string;
    status: 'todo' | 'in-progress' | 'completed';
    createdAt: string;
    updatedAt: string;
   }
  
  export interface CreateTaskInput {
    title: string;
    description: string;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
    status: 'todo' | 'in-progress' | 'completed';
    category: string;
  }
  
  export interface UpdateTaskStatusInput {
    taskId: string;
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

export interface Note {
    _id?: string;
    title: string;
    content: string;
    category: string;
    createdAt?: string;
    updatedAt?: string;
    user?: string;
    lastEdited?: string;
}

export interface CreateNoteInput {
    title: string;
    content: string;
    category: string;
  }

export interface UpdateNoteInput extends Partial<CreateNoteInput> {
    _id?: string;
     
}

export interface NoteResponse {
    success: boolean;
    data: Note;
}

export interface NotesResponse {
    success: boolean;
    data: Note[];
}