import { IGrowingPigs } from "@/interfaces/growing_pigs";
import { getRequestQuery, postRequest } from "@/utils/getRequest";

const query=`
SELECT 
id_growing_lot,
GP.id_pig_stage,
GP.id_ubication,
GP.quantity,
GP.created_at,
GP.exit_date,
GP.id_user,
GP.closed,
GP.status,
GP.average_weight,
GP.id_farm,
GP.start_date,
PS.description pig_stage,
CU.description ubication
FROM MOD.Growing_pigs GP
inner join CAT.Pig_stages PS
on PS.id_pig_stage=GP.id_pig_stage
inner join CAT.Ubications CU
on CU.id_ubication=GP.id_ubication
`

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id_farm=searchParams.get('id_farm')
  return   await getRequestQuery(`${query} where GP.status='true' and GP.id_farm=${id_farm}`)
}

export const POST = async(req:Request) =>{
  const body = await req.json();
  const { id_growing_lot,average_weight,closed,created_at,exit_date,id_farm,id_pig_stage,id_ubication,id_user,quantity,start_date,status}= body as IGrowingPigs;
    
  return await postRequest(`
  declare @const int 
  set @const=(SELECT isNull(max(id_growing_lot),0)+1  FROM MOD.Growing_pigs)
  if ${id_growing_lot} > 0
  begin
    UPDATE MOD.Growing_pigs
    SET average_weight='${average_weight}',
        closed='${closed}',
        exit_date='${exit_date}',
        id_farm='${id_farm}',
        id_pig_stage='${id_pig_stage}',
        id_ubication='${id_ubication}',
        id_user='${id_user}',
        quantity='${quantity}',
        start_date='${start_date}',
        status='${status}'
    WHERE id_growing_lot=${id_growing_lot}
    ${query} WHERE id_growing_lot=${id_growing_lot}
  end
  else
  begin
    INSERT MOD.Growing_pigs(
      id_growing_lot,
      average_weight,
      closed,
      created_at,
      exit_date,
      id_farm,
      id_pig_stage,
      id_ubication,
      id_user,
      quantity,
      start_date,
      status
    )
    VALUES(
      @const,
      '${average_weight}',
      '${closed}',
      '${created_at}',
      '${exit_date}',
      '${id_farm}',
      '${id_pig_stage}',
      '${id_ubication}',
      '${id_user}',
      '${quantity}',
      '${start_date}',
      '${status}'
    )
    ${query} WHERE id_growing_lot=@const
  end
  `)
};
