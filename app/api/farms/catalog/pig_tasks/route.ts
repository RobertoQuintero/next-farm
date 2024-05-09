import db from "@/database/connection";
import { IPigTask } from "@/interfaces";
import { getRequestQuery, postRequest } from "@/utils/getRequest";

const query =`
SELECT 
id_pig_task,
PT.id_pig_stage,
PT.description,
PT.status,
PT.created_at,
PT.id_farm,
PT.days,
PT.while_days,
PT.id_stage_task_type,
CP.description pig_type,
PS.description stage,
change_to_stage,
is_movement_task,
end_stage,
CP.id_pig_type,
ST.description task_type
FROM CAT.Pig_tasks PT
left join CAT.Pig_stages PS
on PS.id_pig_stage=PT.id_pig_stage
left join CAT.pig_types CP
on CP.id_pig_type=PS.id_pig_type
left join CAT.Stage_task_types ST
on ST.id_stage_task_type=PT.id_stage_task_type
`

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
    const id_farm=searchParams.get('id_farm')

  return await getRequestQuery(`${query} where PT.status=1 and id_farm=${id_farm}`)
}

export const POST = async(req:Request) =>{
  const body = await req.json();
  const {id_pig_task, created_at,days,description,id_farm,status,id_pig_stage,while_days,id_stage_task_type,change_to_stage,end_stage,is_movement_task,days_diff}= body as IPigTask;

  if(days_diff!==0 && id_pig_task!==0){
    await db.query(`update MOD.Tasks set start_date=DATEADD(DAY,${days_diff},start_date) where status=1 and done=0 and id_pig_task=${id_pig_task}`)
  }

  return await postRequest(`
  declare @const int 
  set @const=(SELECT isNull(max(id_pig_task),0)+1  FROM CAT.Pig_tasks)
  if ${id_pig_task} > 0
  begin
    UPDATE CAT.Pig_tasks
    SET days='${days}',
        description='${description}',
        id_farm='${id_farm}',
        status='${status}',
        id_pig_stage='${id_pig_stage}',
        id_stage_task_type='${id_stage_task_type}',
        while_days='${while_days}',
        is_movement_task='${is_movement_task}',
        change_to_stage=${change_to_stage},
        end_stage='${end_stage}'
    WHERE id_pig_task=${id_pig_task}
    ${query} WHERE id_pig_task=${id_pig_task}
  end
  else
  begin
    INSERT CAT.Pig_tasks(
      id_pig_task,
      created_at,
      days,
      description,
      id_farm,
      status,
      id_pig_stage,
      id_stage_task_type,
      while_days,
      change_to_stage,
      is_movement_task,
      end_stage
    )
    VALUES(
      @const,
      '${created_at}',
      '${days}',
      '${description}',
      '${id_farm}',
      '${status}',
      '${id_pig_stage}',
      '${id_stage_task_type}',
      '${while_days}',
      '${change_to_stage}',
      '${is_movement_task}',
      '${end_stage}'
    )
    ${query} WHERE id_pig_task=@const
  end
  `)
};