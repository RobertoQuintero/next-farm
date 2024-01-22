import belisarioApi from "@/database/apis";
import { IAccess, IPig, IPigType, IRace, IRole, IRoleAccess, IStage, IUbication } from "@/interfaces";
import { IFarm } from "@/interfaces/farm";

interface FarmsResponse{
  ok:boolean;
  data: IFarm[]
      | IFarm
      | string
      | IUbication[]
      | IStage[]
      | IRace[]
      | IPigType[]
      | IPig[]
      | IPig
      | IRole[]
      | IRole
      | IAccess[]
      | IAccess
      | IRoleAccess[]
      | IRoleAccess
}

export const getFarmsRequest = async (url: string): Promise<FarmsResponse> => {
  let response = {} as FarmsResponse;
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

export const postFarmsRequest = async <T>(
  url: string,
  data:T
  ): Promise<FarmsResponse> => {
  let response = {} as FarmsResponse;
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


