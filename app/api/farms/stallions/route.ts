import { IStallion } from "@/interfaces";
import {  getRequestQuery, postRequest } from "@/utils/getRequest";
const query=`
select 
id_stallion,
name,
status,
id_ubication,
id_race,
created_at,
id_farm,
ISNULL((select sum(alive) from MOD.Births where id_stallion=MD.id_stallion and status=1),0) total_alive,
ISNULL((select sum(dead) from MOD.Births where id_stallion=MD.id_stallion and status=1),0) total_dead,
ISNULL((select count(*) from MOD.Births where id_stallion=MD.id_stallion and status=1 and id_birth_type=2),0) false_charge,
ISNULL((select count(*) from MOD.Births where id_stallion=MD.id_stallion and status=1 and id_birth_type=1 and alive>0),0) total_effective
from MOD.Stallions MD
`

export const GET = async(req:Request) =>{
    const {searchParams}= new URL(req.url)
    const id_farm=searchParams.get('id_farm')
  return await getRequestQuery(`${query} WHERE MD.id_farm=${id_farm} and MD.status='true'`)
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
    ${query} WHERE id_stallion=${id_stallion}
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
    ${query} WHERE id_stallion=@const
  end
  `)
};