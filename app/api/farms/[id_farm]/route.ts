import { getRequest, getRequestQuery } from "@/utils/getRequest";

export const GET = async(req:Request,{params}:{params:{id_farm:number}}) =>
              await getRequestQuery(`SELECT * FROM RH.Farms where id_farm=${params.id_farm}`) 