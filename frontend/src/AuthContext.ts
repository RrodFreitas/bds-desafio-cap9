import { createContext } from "react";
import { TokenData } from "util/requests";

export type AuthContextData = {
    authenticated: boolean;
    dataToken?: TokenData;
}

export type AuthContextType = {
    dadosAutContexto: AuthContextData;
    setAuthContextData: (dadosAutContexto: AuthContextData) => void;
};

export const AuthContext = createContext<AuthContextType>({
    dadosAutContexto: {
        authenticated: false,
    },
    setAuthContextData: () => null,
});