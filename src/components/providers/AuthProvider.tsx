"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session, User } from "@supabase/supabase-js";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

type AuthContextType = {
    user: User | null;
};

export const AuthContext = createContext<AuthContextType>({
    user: null,
});

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        async function getUserId() {
            const supabase = createClientComponentClient();
            const { data, error } = await supabase.auth.getSession();
            setUser(data.session?.user ?? null);
        }

        getUserId();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
}

export function useAuthProvider() {
    return useContext(AuthContext);
}
