import db from "@/database/connection";
import { IPig, IPigTask, IPiglets } from "@/interfaces";
import { buildDate,  serverError } from "@/utils";
import { getRequestQuery } from "@/utils/getRequest";

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
  const {id_pig_task, created_at,days,description,id_farm,status,id_pig_stage,while_days,id_stage_task_type,change_to_stage,end_stage,is_movement_task,days_diff,id_pig_type,id_user}= body as IPigTask;
  let pigs=[] as IPig[]
  let piglets=[] as IPiglets[]
  console.log(body)
  try {

    if(days_diff!==0 && id_pig_task!==0){
      await db.query(`update MOD.Tasks set start_date=DATEADD(DAY,${days_diff},start_date) where status=1 and done=0 and id_pig_task=${id_pig_task}`)
    }

    if(!id_pig_task){
      if(id_pig_type===3){
        pigs= await db.query(`
        select 
        id_pig,
        (select top 1 crossing_date from MOD.Births MB where is_positive='true' and MB.id_pig=MP.id_pig order by birth_date desc) crossing_date,
        (select top 1 confirm_date from MOD.Births MB where is_positive='true' and MB.id_pig=MP.id_pig order by birth_date desc) confirm_date,
        (select top 1 birth_date from MOD.Births MB where is_positive='true' and MB.id_pig=MP.id_pig order by birth_date desc) birth_date
        from MOD.Pigs MP 
          where  status=1 and id_pig_stage=${id_pig_stage}
        `)
      }
      if(id_pig_type===1){
        piglets= await db.query(`select id_lot_piglets, created_at from MOD.Lot_Piglets where status=1 and id_pig_stage=${id_pig_stage}`)
      }
    }

    const resp= await db.query(`
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
    `)as unknown as IPigTask[]

    if(pigs.length){
      for (const pig of pigs) {
        let start_date=''
        if(id_pig_stage===3||id_pig_stage===2||id_pig_stage===1){
          start_date=buildDate(new Date(pig.crossing_date))
        }
        if(id_pig_stage===4 || id_pig_stage===5){
          start_date=buildDate(new Date(pig.confirm_date))
        }
        if(id_pig_stage===6){
          start_date=buildDate(new Date(pig.birth_date))
        }

        await db.query(`
        declare @const int 
        set @const=(SELECT isNull(max(id_task),0)+1  FROM MOD.Tasks)
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
          ${pig.id_pig },
          '${resp[0].id_pig_task}',
          '',
          GETDATE(),
          '${false}',
          dateadd(hour,24*${days}+6,convert(datetime,'${start_date}')),
          '${id_user}',
          dateadd(hour,24*${days}+6,convert(datetime,'${start_date}')),
          NULL,
          '${true}' 
        )
        `)
      }
    }

    if(piglets.length){
      for (const piglet of piglets) {    
        await db.query(`
        declare @const int 
        set @const=(SELECT isNull(max(id_task),0)+1  FROM MOD.Tasks)
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
          NULL,
          '${resp[0].id_pig_task}',
          '',
          GETDATE(),
          '${false}',
          dateadd(hour,24*${days}+6,'${buildDate(new Date(piglet.created_at))}'),
          '${id_user}',
          dateadd(hour,24*${days}+6,'${buildDate(new Date(piglet.created_at))}'),
          '${piglet.id_lot_piglets}',
          '${true}' 
        )
        `)
      }
    }



    return Response.json({
      ok:true,
      data:resp[0]
      // data:pigs
    })

    
  } catch (error) {
    console.log({error})
    return Response.json({
      ok:false,
      data:serverError
    },{
      status:500
    })
  }
};