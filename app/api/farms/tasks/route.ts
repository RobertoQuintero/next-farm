import db from "@/database/connection";
import {  ITask } from "@/interfaces";
import { getRequestQuery, postRequest } from "@/utils/getRequest";

const query=`
SELECT 
id_task,
  MT.id_pig,
  MT.id_pig_task,
  MT.id_user,
  start_date,
  end_date,
  MT.created_at,
  done,
  comment,
  MT.status,
  PT.description,
  ML.id_lot_piglets,
  RU.name,
  PT.change_to_stage,
  PT.is_movement_task,
  PT.end_stage,
  CU.description pig_ubication,
	CP.description piglets_ubication
FROM MOD.Tasks MT
left join CAT.Pig_tasks PT
on PT.id_pig_task=MT.id_pig_task
left join RH.Users RU
on RU.id_user=MT.id_user
left join MOD.Pigs MP
on MP.id_pig=MT.id_pig
left join MOD.Lot_Piglets ML
on ML.id_lot_piglets=MT.id_lot_piglets
left join CAT.Ubications CU
on CU.id_ubication=MP.id_ubication
left join CAT.Ubications CP
on CP.id_ubication=ML.id_ubication
`

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id=searchParams.get('id')
  const pig=searchParams.get('pig')
  return await getRequestQuery(`${query} WHERE  ${pig==='pig'?`MP.id_pig=${id}`:`ML.id_lot_piglets=${id}`} order by start_date asc`)
}

export const POST = async(req:Request) =>{
  const body = await req.json();
  const {id_task,id_pig,id_pig_task,comment,created_at,done,end_date,id_user,start_date,status,id_lot_piglets,id_birth }= body as ITask;

  if(id_pig_task===3&&!status){
   await db.query(`
   declare @birth int=(select top 1 id_birth from MOD.Births where id_pig=${id_pig} order by crossing_date desc)
   update MOD.Births set id_birth_type=2 where id_birth=@birth
   update MOD.Pigs set id_pig_stage=2 where id_pig=${id_pig}
   `)
  //  await db.query(`update MOD.Pigs set id_pig_stage=2 where id_pig=${id_pig}`)
  }
  
  return await postRequest(`
  declare @const int 
  set @const=(SELECT isNull(max(id_task),0)+1  FROM MOD.Tasks)
  if ${id_task} > 0
  begin
    UPDATE MOD.Tasks
    SET ${id_pig===null?'id_pig=NULL':`id_pig=${id_pig}`},
        id_pig_task='${id_pig_task}',
        comment='${comment}',
        done='${done}',
        end_date='${end_date}',
        id_user='${id_user}',
        start_date='${start_date}',
        ${id_lot_piglets===null?'id_lot_piglets=NULL':`id_lot_piglets=${id_lot_piglets}`},
        status='${status}'
    WHERE id_task=${id_task}
    ${query} WHERE id_task=${id_task}
  end
  else
  begin
    INSERT MOD.Tasks(
      id_task,
      id_pig,
      id_pig_task,
      comment,
      created_at,
      done,
      end_date,
      id_user,
      start_date,
      id_lot_piglets,
      status 
    )
    VALUES(
      @const,
      ${id_pig||'NULL' },
      '${id_pig_task}',
      '${comment}',
      '${created_at}',
      '${done}',
      '${end_date}',
      '${id_user}',
      '${start_date}',
      ${id_lot_piglets || 'NULL'},
      '${status}' 
    )
    ${query} WHERE id_task=@const
  end
  `)
};