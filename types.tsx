 export interface AuthContextType {
    user: User | null;
    login: ({ email, password }: { email: string; password: string }) => Promise<any>;
    logout: ( ) => Promise<void>;
    register: ({username , email , password }: {username: string; email: string; password: string}) => Promise<any>;
    logoutIsPending: boolean;
    registerIsPending: boolean;
    loginIsPending: boolean;
    loginError: Error | null;
    registerError: Error | null;
    logoutError: Error | null;
    isInitialized: boolean;
}

export interface User {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    createdAt: string;
}
