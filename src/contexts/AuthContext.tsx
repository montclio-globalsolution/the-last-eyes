import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import apiBackend, { loginUser } from "../services/apiBackend";

type User = {
    id?: number;
    name: string;
    email: string;
    sector?: string;
    roleId?: number;
    token?: string;
};

type SignInCredentials = {
    email: string;
    password: string;
};

type AuthContextType = {
    signed: boolean;
    user: User | null;
    loading: boolean;
    signIn: (credentials: SignInCredentials) => Promise<void>;
    signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            try {
                const storedUser = await AsyncStorage.getItem("@App:user");
                const storedToken = await AsyncStorage.getItem("@App:token");

                if (storedUser && storedToken) {
                    apiBackend.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.log("Erro ao carregar storage:", error);
            } finally {
                setLoading(false);
            }
        }

        loadStorageData();
    }, []);

    const signIn = async ({ email, password }: SignInCredentials) => {
        try {
            const response = await loginUser({ email, password });

            const { token, ...userData } = response;

            if (token) {
                apiBackend.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                await AsyncStorage.setItem("@App:token", token);
            }

            await AsyncStorage.setItem("@App:user", JSON.stringify(userData));
            setUser(userData);

        } catch (error) {
            throw error;
        }
    };

    const signOut = async () => {
        await AsyncStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                signed: !!user,
                user,
                loading,
                signIn,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}