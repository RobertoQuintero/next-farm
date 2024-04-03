import belisarioApi from "@/database/apis";
import { IAccess, IBirth, IBirthType, ICrossing, ILossReason, IPig, IPigStage, IPigTask, IPigType, IPigWeight, IPiglets, IQuantity, IRace, IRole, IRoleAccess, IStage, IStageTaskType, IStallion, IStaticPig, ITask, ITaskType, IUbication, IfertilizationType } from "@/interfaces";
import { IFarm } from "@/interfaces/farm";
import { IGrowingPigs } from "@/interfaces/growing_pigs";


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
      | ITaskType[]
      | ILossReason[]
      | IfertilizationType[]
      | IStallion[]
      | IBirth[]
      | IBirth
      | ICrossing
      | IPigWeight[]
      | IPigStage[]
      | IPigTask[]
      | IStageTaskType[]
      | IBirthType[]
      | ITask[]
      | IPiglets
      | IPiglets[]
      | IGrowingPigs[]
      | IGrowingPigs
      | IQuantity[]
      | IStaticPig[]
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


