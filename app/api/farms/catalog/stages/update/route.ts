import db from "@/database/connection";

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id_farm=searchParams.get('id_farm')

  try {

    const farm=await db.query(`select id_farm FROM MOD.Stages where id_farm=${id_farm}`)

    if(farm.length){
      return Response.json({
        ok:true,
        data:'ya se cargaron las etapas'
      })
    }
    const stages = await db.query(`SELECT * FROM CAT.Stage_types WHERE status='true' `)

    for (const stage of stages) {
      await db.query(`
      declare @const int 
      set @const=(SELECT isNull(max(id_stage),0)+1  FROM MOD.Stages)
      INSERT MOD.Stages(
        id_stage,
        id_stage_type,
        description,
        food_amount,
        id_farm,
        id_pig_type,
        max_weight,
        min_weight,
        [order],
        status
      )
      VALUES(
        @const,
        '${stage.id_stage_type}',
        '${stage.description}',
        '${stage.food_amount}',
        '${id_farm}',
        '${stage.id_pig_type}',
        '${stage.max_weight}',
        '${stage.min_weight}',
        '${stage.order}',
        '${stage.status}'
      )
      `)
    }
    const data= await db.query(`SELECT * FROM MOD.Stages WHERE id_farm=${id_farm}`)

    return Response.json({
      ok:true,
      data
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