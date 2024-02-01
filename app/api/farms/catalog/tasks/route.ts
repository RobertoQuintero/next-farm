import { ITask } from "@/interfaces";
import {  getRequestQuery, postRequest } from "@/utils/getRequest";

const query=`
    SELECT 
      id_task,
      CT.id_task_type,
      CT.id_stage,
      CT.description,
      CT.status,
      created_at,
      updated_at,
      days,
      CT.id_pig_type,
      CS.description stage,
      PT.description pig_type,
      CT.id_farm,
      TT.description task_type
    FROM Cat.Tasks CT
    inner join CAT.Stages CS
    on CS.id_stage=CT.id_stage
    inner join CAT.pig_types PT
    on PT.id_pig_type=CT.id_pig_type
    inner join CAT.task_types TT
    on TT.id_task_type=CT.id_task_type
`

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
    const id_farm=searchParams.get('id_farm')
  return await getRequestQuery(`${query} where CT.status='true' and CT.id_farm=${id_farm}`)
}

export const POST = async(req:Request) =>{
  const body = await req.json();
  const { id_task,created_at,days,description,id_farm,id_pig_type,id_stage,id_task_type,status,updated_at}= body as ITask;
    
  return await postRequest(`
  declare @const int 
  set @const=(SELECT isNull(max(id_task),0)+1  FROM CAT.Tasks)
  if ${id_task} > 0
  begin
    UPDATE CAT.Tasks
    SET days='${days}',
        description='${description}',
        id_farm='${id_farm}',
        id_pig_type='${id_pig_type}',
        id_stage='${id_stage}',
        id_task_type='${id_task_type}',
        status='${status}',
        updated_at='${updated_at}'
    WHERE id_task=${id_task}
    ${query} WHERE CT.id_task=${id_task}
  end
  else
  begin
    INSERT CAT.Tasks(
      id_task,
      created_at,
      days,
      description,
      id_farm,
      id_pig_type,
      id_stage,
      id_task_type,
      status,
      updated_at
    )
    VALUES(
      @const,
      '${created_at}',
      '${days}',
      '${description}',
      '${id_farm}',
      '${id_pig_type}',
      '${id_stage}',
      '${id_task_type}',
      '${status}',
      '${updated_at}'
    )
    ${query} WHERE CT.id_task=@const
  end
  `)
};