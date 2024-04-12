import {  ITask } from "@/interfaces";
import { getRequestQuery, postRequest } from "@/utils/getRequest";

const query=`
SELECT 
id_task,
  id_pig,
  MT.id_pig_task,
  MT.id_user,
  start_date,
  end_date,
  MT.created_at,
  done,
  comment,
  MT.status,
  PT.description,
  id_lot_piglets,
  RU.name,
  PT.change_to_stage,
  PT.end_stage 
FROM MOD.Tasks MT
inner join CAT.Pig_tasks PT
on PT.id_pig_task=MT.id_pig_task
inner join RH.Users RU
on RU.id_user=MT.id_user
`

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id=searchParams.get('id')
  const pig=searchParams.get('pig')
  return await getRequestQuery(`${query} WHERE MT.status='true' AND ${pig==='pig'?`id_pig=${id}`:`id_lot_piglets=${id}`} order by id_task asc`)
}

export const POST = async(req:Request) =>{
  const body = await req.json();
  const {id_task,id_pig,id_pig_task,comment,created_at,done,end_date,id_user,start_date,status,id_lot_piglets }= body as ITask;
    
  return await postRequest(`
  declare @const int 
  set @const=(SELECT isNull(max(id_task),0)+1  FROM MOD.Tasks)
  if ${id_task} > 0
  begin
    UPDATE MOD.Tasks
    SET id_pig=${id_pig===null?'NULL':id_pig},
        id_pig_task='${id_pig_task}',
        comment='${comment}',
        done='${done}',
        end_date='${end_date}',
        id_user='${id_user}',
        start_date='${start_date}',
        id_lot_piglets=${id_lot_piglets===null?'NULL':id_lot_piglets},
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
      '${id_pig}',
      '${id_pig_task}',
      '${comment}',
      '${created_at}',
      '${done}',
      '${end_date}',
      '${id_user}',
      '${start_date}',
      '${id_lot_piglets}',
      '${status}' 
    )
    ${query} WHERE id_task=@const
  end
  `)
};