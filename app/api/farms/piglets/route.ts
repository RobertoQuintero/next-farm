import { IPiglets } from "@/interfaces";
import {  getRequestQuery, postRequest } from "@/utils/getRequest";

const query=`
select 
LP.id_lot_piglets,
LP.id_birth,
LP.quantity,
LP.created_at,
LP.close_date,
LP.id_user,
LP.id_ubication,
LP.id_pig_stage,
LP.code,
LP.status,
LP.closed,
LP.id_farm,
RU.name [user],
CU.description ubication,
PS.description stage,
MS.name stallion,
DATEDIFF(DAY,LP.created_at,GETUTCDATE()) [days]
from MOD.Lot_Piglets LP
INNER JOIN RH.Users RU
on RU.id_user=LP.id_user
INNER JOIN CAT.Ubications CU
on CU.id_ubication=LP.id_ubication
INNER JOIN CAT.Pig_stages PS
on PS.id_pig_stage=LP.id_pig_stage
INNER JOIN MOD.Births MB
on MB.id_birth=LP.id_birth
INNER JOIN MOD.Stallions MS
on MS.id_stallion=MB.id_stallion
`

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id_farm=searchParams.get('id_farm')
  return await getRequestQuery(` ${query} WHERE LP.status='true' and LP.id_farm=${id_farm}`)
}

export const POST = async(req:Request) =>{
  const body = await req.json();
  const {id_lot_piglets,closed,code,created_at,id_birth,id_farm,id_pig_stage,id_ubication,id_user,quantity,status,close_date }= body as IPiglets;
    
  return await postRequest(`
  declare @const int 
  set @const=(SELECT isNull(max(id_lot_piglets),0)+1  FROM MOD.Lot_piglets)
  if ${id_lot_piglets} > 0
  begin
    UPDATE MOD.Lot_piglets
    SET closed='${closed}',
        code='${code}',
        id_birth='${id_birth}',
        id_farm='${id_farm}',
        id_pig_stage='${id_pig_stage}',
        id_ubication='${id_ubication}',
        id_user='${id_user}',
        quantity='${quantity}',
        close_date='${close_date}',
        status='${status}'
    WHERE id_lot_piglets=${id_lot_piglets}
    ${query} WHERE LP.id_lot_piglets=${id_lot_piglets}
  end
  else
  begin
    INSERT MOD.Lot_piglets(
      id_lot_piglets,
      closed,
      code,
      created_at,
      close_date,
      id_birth,
      id_farm,
      id_pig_stage,
      id_ubication,
      id_user,
      quantity,
      status 
    )
    VALUES(
      @const,
      '${closed}',
      '${code}',
      '${created_at}',
      '${close_date}',
      '${id_birth}',
      '${id_farm}',
      '${id_pig_stage}',
      '${id_ubication}',
      '${id_user}',
      '${quantity}',
      '${status}' 
    )
    ${query} WHERE LP.id_lot_piglets=@const
  end
  `)
};