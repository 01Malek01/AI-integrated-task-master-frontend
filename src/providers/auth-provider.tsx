'use client'
import { createContext, useContext, useState, useEffect } from "react";
import { AuthContextType, User } from "../../types";
import useLogin from "@/app/hooks/api/auth/useLogin";
import useRegister from "@/app/hooks/api/auth/useRegister";
import useCheckAuth from "@/app/hooks/api/auth/useCheckAuth";



const  AuthContext = createContext<AuthContextType | null>(null);
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: authData, isLoading, error: checkAuthError } = useCheckAuth();
    const { login: loginMutation, error: loginError, isPending: loginIsPending } = useLogin();
    const { register: registerMutation, error: registerError, isPending: registerIsPending } = useRegister();
    const [user, setUser] = useState<User | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    // Update user state when auth data changes
    useEffect(() => {
        if (authData && !isInitialized) {
            setUser(authData.user);
            setIsInitialized(true);
        }
    }, [authData, isInitialized]);

    const login = async ({email , password }: {
        email: string;
        password: string;
    }) => {
        const user = await loginMutation({email , password });
        setUser(user);
        console.log(' success login',user);
        return user;
    };
    
    const logout = async () => {
        try {
            // You might want to call a logout API endpoint here
            // await axiosInstance.post('/auth/logout');
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    };

    const register = async ({username , email , password }: {
        username: string;
        email: string;
        password: string;
    }) => {
        const user = await registerMutation({username , email , password });
        setUser(user);
        console.log(' success register',user);
        return user;
    };

    // Show loading state while checking auth status
    if (isLoading && !isInitialized) {
        return <div>Loading...</div>;
    }
    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                login, 
                logout, 
                register,
                loginError,
                registerError,
                logoutError: checkAuthError,
                loginIsPending,
                registerIsPending,
                logoutIsPending: false, // Since we're not using the logout mutation anymore
                isInitialized
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};  
export const useAuth  = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthProvider;
