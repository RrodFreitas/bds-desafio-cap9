import { createContext } from "react";
import { DadosToken } from "util/requests";

export type DadosAutContexto = {
    authenticated: boolean;
    dataToken?: DadosToken;
}

export type AuthContextType = {
    dadosAutContexto: DadosAutContexto;
    setDadosAutContexto: (dadosAutContexto: DadosAutContexto) => void;
  };
  
export const AuthContext = createContext<AuthContextType>({
    dadosAutContexto: {
    authenticated: false,
},
setDadosAutContexto: () => null,
});