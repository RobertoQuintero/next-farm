import { IPig } from "@/interfaces";
import {  getRequestQuery, postRequest } from "@/utils/getRequest";

const query=`
    SELECT 
    id_pig,
    MP.id_pig_type,
    MP.id_ubication,
    MP.id_race,
    code,
    MP.start_date,
    visible,
    MP.id_farm,
    MP.id_stage,
    MP.status, 
    PT.description pig_type,
    CU.description pig_ubication,
    CR.description pig_race,
    Cs.description pig_stage
    FROM MOD.Pigs MP
    inner join CAT.Pig_types PT
    on PT.id_pig_type=MP.id_pig_type
    inner join CAT.Ubications CU
    on CU.id_ubication=MP.id_ubication
    inner join CAT.Races CR
    on CR.id_race=MP.id_race
    inner join CAT.Stages CS
    on CS.id_stage=MP.id_stage
`

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const idFarm=searchParams.get('idFarm')

  return await getRequestQuery(`${query} WHERE MP.id_farm=${idFarm}`)
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
      ${query} WHERE MP.id_pig=${id_pig}
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
      ${query} WHERE MP.id_pig=@const
    end
  `)
};