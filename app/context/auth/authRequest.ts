import belisarioApi from "@/database/apis";
import { IUser, IState,IUserAccess } from "@/interfaces";
import Cookies from "js-cookie";

interface AuthResponse {
  ok: boolean;
  data:  string
      | IState[]
      | IUser
      | IUser[]
      | IUserAccess[]
}

export const getAuthRequest = async (url: string): Promise<AuthResponse> => {
  let response = {} as AuthResponse;
  await belisarioApi
    .get(url)
    .then(({ data }) => {
      response = { ok: true, data: data.data };
    })
    .catch((error) => {
      if (error.response) {
        response = { ok: false, data: error.response.data.data };
      }
    });
  return response;
};

export const postAuthRequest = async <T>(
  url: string,
  data:T
  ): Promise<AuthResponse> => {
  let response = {} as AuthResponse;
  await belisarioApi
    .post(url,data)
    .then(({ data }) => {
      response = { ok: true, data: data.data };
    })
    .catch((error) => {
      if (error.response) {
        response = { ok: false, data: error.response.data.data };
      }
    });
  return response;
};

export const loginRequest = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  let response = {} as AuthResponse;
  await belisarioApi
    .post("/auth/login", { email, password })
    .then(({ data }) => {
      response = { ok: true, data: data.data };
    })
    .catch((error) => {
      if (error.response) {
        response = { ok: false, data: error.response.data.data };
      }
    });
  return response;
};

export const registerRequest = async (user: IUser): Promise<AuthResponse> => {
  let response = {} as AuthResponse;

  await belisarioApi
    .post("/auth/register", user)
    .then(({ data }) => {
      response = { ok: true, data: data.data };
    })
    .catch((error) => {
      if (error.response) {
        response = { ok: false, data: error.response.data.data };
      }
    });
  return response;
};

export const validateTokenRequest = async (): Promise<AuthResponse> => {
  let response = {} as AuthResponse;
  await belisarioApi
    .get(`/auth/token`)
    .then(({ data }) => {
      response = { ok: true, data: data.data };
    })
    .catch((error) => {
      if (error.response) {
        Cookies.remove("jwt");
        response = {
          ok: false,
          data: error.response.data.data,
        };
      }
    });
  return response;
};


export const returnArray = <T extends object,K extends keyof T>(payload:T,data:T,array:T[],id:K):T[]=>{
  let newArray=[]
  if(payload[id]){
    newArray=array.map(item=>{
      if(item[id]===payload[id]){
        return data
      }
      return item
    })
  }else{
    newArray=[...array,data]
  }
  return newArray
};