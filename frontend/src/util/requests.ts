import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import history from './history';
import jwtDecode from 'jwt-decode';

type LoginResponse = {
  access_token: string,
    token_type: string,
    refresh_token: string,
    expires_in: number,
    scope: string,
    userName: string,
    userId: number
}

type Role = 'ROLE_VISITOR' | 'ROLE_MEMBER';

export type TokenData = {
  exp: number,
  user_name: string,
  authorities: Role[]
}

export const BASE_URL = process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';
const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'myclientid';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'myclientsecret';

const chaveToken = 'dadosAut';

type LoginData = {
  username: string;
  password: string;
};

type DadosAvaliacao = {
  text : string,
  movieId : string
}

export const requestBackendLogin = (loginData: LoginData) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET),
  };

  const data = qs.stringify({
    ...loginData,
    grant_type: 'password',
  });

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/oauth/token',
    data,
    headers,
  });
};

export const requestBackendReview = (dataAval: DadosAvaliacao) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + obtemDadosAutenticacao().access_token,
  };

  const data = JSON.stringify(dataAval);

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/reviews',
    data,
    headers,
  });
};

export const saveLocalStorage = (obj: LoginResponse) => {
    localStorage.setItem(chaveToken,JSON.stringify(obj));
}

export const obtemDadosAutenticacao = () => {
  const str = localStorage.getItem(chaveToken) ?? "{}";
  return JSON.parse(str) as LoginResponse;
}

export const removeDataAutenticate = () => {
  localStorage.removeItem(chaveToken);
};

export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: 'Bearer ' + obtemDadosAutenticacao().access_token,
      }
    : config.headers;

  return axios({ ...config, baseURL: BASE_URL, headers });
};

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    if (error.response.status === 401) {
      history.push('/');
    }
    return Promise.reject(error);
  }
);

export const getTokenData = () : TokenData | undefined => {
  try {
    return jwtDecode(obtemDadosAutenticacao().access_token) as TokenData;
  } catch (error) {
    return undefined;
  }
}

export const isAuthenticated = () : boolean => {
  const DadosToken = getTokenData();
  return (DadosToken && DadosToken.exp * 1000 > Date.now()) ? true : false;
}

export const hasAnyRoles = (roles: Role[]) : boolean => {
   if (roles.length===0) {
     return false;
   }
   const dadosToken = getTokenData();
   if (dadosToken !== undefined) {
     return roles.some(role => dadosToken.authorities.includes(role));
   }
   return false;
}