'use client'
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { AuthContextType, User } from "../../types";
import useLogin from "@/app/hooks/api/auth/useLogin";
import useRegister from "@/app/hooks/api/auth/useRegister";
import useCheckAuth from "@/app/hooks/api/auth/useCheckAuth";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import useLogout from "@/app/hooks/api/auth/useLogout";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { data: authData, isLoading, error: checkAuthError, isError } = useCheckAuth();
    const { login: loginMutation, error: loginError, isPending: loginIsPending } = useLogin();
    const { register: registerMutation, error: registerError, isPending: registerIsPending } = useRegister();
    const { logout: logoutMutation, error: logoutError, isPending: logoutIsPending } = useLogout();
    
    const [user, setUser] = useState<User | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    // Handle initial auth check and updates
    useEffect(() => {
        if (isLoading) return; // Still loading, do nothing
        
        if (isError || !authData?.data?.user) {
            // If there was an error or no user data, consider user not authenticated
            setUser(null);
        } else if (authData?.data?.user) {
            // If we have user data, set the user
            setUser(authData.data.user);
        }
        
        // Mark as initialized after first check, regardless of auth status
        if (!isInitialized) {
            setIsInitialized(true);
        }
    }, [authData, isLoading, isError, isInitialized]);

    const login = useCallback(async ({ email, password }: { email: string; password: string }) => {
        const res = await loginMutation({ email, password });
        setUser(res?.data?.user || null);
        return res;
    }, [loginMutation]);
    
    const logout = useCallback(async () => {
        try {
            await logoutMutation();
            setUser(null);
            // Clear any cached queries or data here if needed
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    }, [logoutMutation]);

    const register = useCallback(async ({
        username,
        email,
        password
    }: {
        username: string;
        email: string;
        password: string;
    }) => {
        const res = await registerMutation({ username, email, password });
        setUser(res?.data?.user || null);
        return res;
    }, [registerMutation]);

    // Show loading state only for the initial check and only if we're not in an error state
    if (isLoading && !isInitialized && !isError) {
        return <LoadingSpinner size={14} color="var(--color-primary)" />;
    }

    const value: AuthContextType = {
        user,
        login,
        logout,
        register,
        loginIsPending,
        registerIsPending,
        logoutIsPending,
        loginError,
        registerError,
        logoutError,
        isInitialized,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false,
        isLoading: isLoading && !isInitialized
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthProvider;
