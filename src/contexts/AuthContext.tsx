import React, { createContext, useState, useContext, ReactNode } from "react";

type User = {
    name: string;
    email: string;
    sector: string;
};

type AuthContextType = {
    user: User | null;
    signIn: (userData: User) => void;
    signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    const signIn = (userData: User) => {
        setUser(userData);
    };

    const signOut = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
