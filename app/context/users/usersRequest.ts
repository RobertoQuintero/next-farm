import belisarioApi from "@/database/apis";
import { IJobPosition, IRole, IUser } from "@/interfaces/user";

interface UsersResponse{
  ok:boolean;
  data: IUser[]
      | IUser 
      | string 
      | IJobPosition[]
      | IRole[]
}

export const getUsersRequest = async (url: string): Promise<UsersResponse> => {
  let response = {} as UsersResponse;
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

export const postUsersRequest = async <T>(
  url: string,
  data:T
  ): Promise<UsersResponse> => {
  let response = {} as UsersResponse;
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