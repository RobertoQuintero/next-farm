import { IStallion } from "@/interfaces";
import {  getRequestQuery, postRequest } from "@/utils/getRequest";

export const GET = async(req:Request) =>{
    const {searchParams}= new URL(req.url)
    const id_farm=searchParams.get('id_farm')
  return await getRequestQuery(`SELECT * FROM MOD.Stallions WHERE id_farm=${id_farm} and status='true'`)
}

export const POST = async(req:Request) =>{
  const body = await req.json();
  const { id_stallion,created_at,id_farm,id_race,id_ubication,name,status}= body as IStallion;
    
  return await postRequest(`
  declare @const int 
  set @const=(SELECT isNull(max(id_stallion),0)+1  FROM MOD.Stallions)
  if ${id_stallion} > 0
  begin
    UPDATE MOD.Stallions
    SET id_farm='${id_farm}',
        id_race='${id_race}',
        id_ubication='${id_ubication}',
        name='${name}',
        status='${status}'
    WHERE id_stallion=${id_stallion}
    SELECT * FROM MOD.Stallions WHERE id_stallion=${id_stallion}
  end
  else
  begin
    INSERT MOD.Stallions(
      id_stallion,
      created_at,
      id_farm,
      id_race,
      id_ubication,
      name,
      status
    )
    VALUES(
      @const,
      '${created_at}',
      '${id_farm}',
      '${id_race}',
      '${id_ubication}',
      '${name}',
      '${status}'
    )
    SELECT * FROM MOD.Stallions WHERE id_stallion=@const
  end
  `)
};