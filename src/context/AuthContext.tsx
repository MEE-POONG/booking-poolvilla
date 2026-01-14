import { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/router";

interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, name: string) => void;
    register: (email: string, name: string) => void;
    logout: () => void;
    updateProfile: (name: string, email: string, phone: string) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        // Initialize from localStorage
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        }
        return null;
    });
    const router = useRouter();

    const login = (email: string, name: string) => {
        // Mock login logic
        const newUser = { id: "1", name, email };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        router.push("/");
    };

    const register = (email: string, name: string) => {
        // Mock register logic (same as login for now)
        login(email, name);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        router.push("/login");
    };

    const updateProfile = (name: string, email: string, phone: string) => {
        if (user) {
            const updatedUser = { ...user, name, email, phone };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                register,
                logout,
                updateProfile,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
