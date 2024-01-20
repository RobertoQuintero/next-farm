import { IPig } from "@/interfaces";
import {  getRequestQuery, postRequest } from "@/utils/getRequest";

export const GET = async(req:Request) =>{

  return await getRequestQuery(`SELECT * FROM MOD.Pigs`)
}

export const POST = async(req:Request) =>{
  const body = await req.json();
  const {id_pig,code,id_farm,id_pig_type,id_race,id_stage,id_ubication,start_date,status,visible }= body as IPig;

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
          start_date='${start_date}',
          status='${status}',
          visible='${visible}'
      WHERE id_pig=${id_pig}
      SELECT * FROM MOD.Pigs WHERE id_pig=${id_pig}
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
        start_date,
        status,
        visible
      )
      VALUES(
        @const,
        '${code}',
        '${id_farm}',
        '${id_pig_type}',
        '${id_race}',
        '${id_stage}',
        '${id_ubication}',
        '${start_date}',
        '${status}',
        '${visible}'
      )
      SELECT * FROM MOD.Pigs WHERE id_pig=@const
    end
  `)
};