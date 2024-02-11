import { IPig } from "@/interfaces";
import {  getRequestQuery, postRequest } from "@/utils/getRequest";
import { queryPig } from "@/utils/queries";


export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const idFarm=searchParams.get('idFarm')

  return await getRequestQuery(`${queryPig} WHERE MP.id_farm=${idFarm}`)
}

export const POST = async(req:Request) =>{
  const body = await req.json();
  const {id_pig,code,id_farm,id_pig_type,id_race,id_stage,id_ubication,added_date,status,visible,created_at,id_stallion }= body as IPig;

  return await postRequest(`
    declare @const int 
    set @const=(SELECT isNull(max(id_pig),0)+1  FROM MOD.Pigs)
    if ${id_pig} > 0
    begin
      UPDATE MOD.Pigs
      SET code='${code}',
          id_farm='${id_farm}',
          id_pig_type='${id_pig_type}',
          id_race='${id_race}',
          id_stage='${id_stage}',
          id_ubication='${id_ubication}',
          added_date='${added_date}',
          status='${status}',
          id_stallion='${id_stallion}',
          visible='${visible}'
      WHERE id_pig=${id_pig}
      ${queryPig} WHERE MP.id_pig=${id_pig}
    end
    else
    begin
      INSERT MOD.Pigs(
        id_pig,
        code,
        id_farm,
        id_pig_type,
        id_race,
        id_stage,
        id_ubication,
        added_date,
        status,
        visible,
        created_at,
        id_stallion
      )
      VALUES(
        @const,
        '${code}',
        '${id_farm}',
        '${id_pig_type}',
        '${id_race}',
        '${id_stage}',
        '${id_ubication}',
        '${added_date}',
        '${status}',
        '${visible}',
        '${created_at}',
        '${id_stallion}'
      )
      ${queryPig} WHERE MP.id_pig=@const
    end
  `)
};