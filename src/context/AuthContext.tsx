import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";

interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    role?: "admin" | "customer";
}

interface AuthContextType {
    user: User | null;
    login: (email: string, name: string, role?: "admin" | "customer") => void;
    register: (email: string, name: string) => void;
    logout: () => void;
    updateProfile: (name: string, email: string, phone: string) => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
        setLoading(false);
    }, []);

    const login = (email: string, name: string, role: "admin" | "customer" = "customer") => {
        const newUser: User = { id: Date.now().toString(), name, email, role };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        router.push(role === "admin" ? "/admin" : "/");
    };

    const register = (email: string, name: string) => {
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
                loading,
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
