import belisarioApi from "@/database/apis";
import { IFarm } from "@/interfaces/farm";

interface FarmsResponse{
  ok:boolean;
  data: IFarm[]
      | IFarm
      | string
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

export const postFarmsRequest = async (
  url: string,
  data:IFarm
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


