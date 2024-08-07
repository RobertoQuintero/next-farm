import db from "@/database/connection";
import {  IPigTask } from "@/interfaces";
import {  buildDate } from "@/utils";

export const POST = async(req:Request) =>{
  const body = await req.json();
  const {id_pig,id_pig_stage,id_user,id_lot_piglets,id_farm ,added_date}= body as {id_pig:number,id_pig_stage:number,id_user:number,id_lot_piglets:number;id_farm:number;added_date:string};

  try {

    // const date = new Date(addZero(new Date()))
    // date.setHours(date.getHours()+6)

    const tasks= await db.query(`
      SELECT * FROM CAT.Pig_tasks WHERE id_pig_stage=${id_pig_stage} and id_farm=${id_farm} and status=1
    `) as unknown as IPigTask[]


    for (const task of tasks) {
      await db.query(`
      declare @const int 
      set @const=(SELECT isNull(max(id_task),0)+1  FROM MOD.Tasks)
      INSERT MOD.Tasks(
        id_task,
        id_pig,
        id_lot_piglets,
        id_pig_task,
        comment,
        created_at,
        done,
        end_date,
        id_user,
        start_date,
        status 
      )
      VALUES(
        @const,
        ${id_pig || 'NULL'},
        ${id_lot_piglets || 'NULL'},
        '${task.id_pig_task}',
        '',
        '${buildDate(new Date())}',
        'false',
        dateadd(hour,24*${task.days+task.while_days}+6,'${added_date}'),
        '${id_user}',
        dateadd(hour,24*${task.days}+6,'${added_date}'),
        'true' 
      )
      `)
    }

    const newTasks= await db.query(`
      select top ${tasks.length}
        id_task,
        id_pig,
        id_lot_piglets,
        MT.id_pig_task,
        MT.id_user,
        start_date,
        end_date,
        MT.created_at,
        done,
        comment,
        MT.status,
        PT.description,
        PT.is_movement_task,
        RU.name 
      FROM MOD.Tasks MT
      left join CAT.Pig_tasks PT
      on PT.id_pig_task=MT.id_pig_task
      left join RH.Users RU
      on RU.id_user=MT.id_user
      where MT.status=1
      order by id_task desc
    `) as unknown as []

    return Response.json({
      ok:true,
      // data:crossing,
      // data:addZero(new Date(birth[0].crossing_date ))
      data:newTasks.reverse()
    })
  } catch (error) {
    console.log({error})
    return Response.json({
      ok:false,
      data:'Error en el servidor al intentar conectar con la base de datos'
    },{
      status:500
    })
  }
};