import db from "@/database/connection";
import { IStage } from "@/interfaces";

const stages=[
  {
    "id_stage":0,
    "id_pig_type": 1,
    "description": "Calostro",
    "order": 1,
    "status": true,
    "min_weight": 0,
    "max_weight": 0,
    "food_amount": 0,
    "id_farm": 1
},
{
    "id_stage":0,
    "id_pig_type": 1,
    "description": "Etapa 2",
    "order": 2,
    "status": true,
    "min_weight": 1,
    "max_weight": 7,
    "food_amount": 0.2,
    "id_farm": 1
},
{
    "id_stage":0,
    "id_pig_type": 1,
    "description": "Etapa 3",
    "order": 3,
    "status": true,
    "min_weight": 7,
    "max_weight": 15,
    "food_amount": 0.3,
    "id_farm": 1
},
{
    "id_stage":0,
    "id_pig_type": 1,
    "description": "Inicio y Etapa 3",
    "order": 4,
    "status": true,
    "min_weight": 0,
    "max_weight": 0,
    "food_amount": 0,
    "id_farm": 1
},
{
    "id_stage":0,
    "id_pig_type": 1,
    "description": "Inicio",
    "order": 5,
    "status": true,
    "min_weight": 15,
    "max_weight": 30,
    "food_amount": 1.8,
    "id_farm": 1
},
{
    "id_stage":0,
    "id_pig_type": 2,
    "description": "Crecimiento 1",
    "order": 1,
    "status": true,
    "min_weight": 30,
    "max_weight": 50,
    "food_amount": 2,
    "id_farm": 1
},
{
    "id_stage":0,
    "id_pig_type": 2,
    "description": "Crecimiento 2",
    "order": 2,
    "status": true,
    "min_weight": 50,
    "max_weight": 70,
    "food_amount": 3,
    "id_farm": 1
},
{
    "id_stage":0,
    "id_pig_type": 2,
    "description": "Engorda",
    "order": 3,
    "status": true,
    "min_weight": 70,
    "max_weight": 100,
    "food_amount": 5,
    "id_farm": 1
},
{
    "id_stage":0,
    "id_pig_type": 3,
    "description": "Sin Montar",
    "order": 1,
    "status": true,
    "min_weight": 0,
    "max_weight": 0,
    "food_amount": 0,
    "id_farm": 1
},
{
    "id_stage": 0,
    "id_pig_type": 3,
    "description": "Cargada",
    "order": 2,
    "status": true,
    "min_weight": 0,
    "max_weight": 0,
    "food_amount": 0,
    "id_farm": 1
},
{
    "id_stage": 0,
    "id_pig_type": 3,
    "description": "Gestación",
    "order": 3,
    "status": true,
    "min_weight": 0,
    "max_weight": 0,
    "food_amount": 1.8,
    "id_farm": 1
},
{
    "id_stage": 0,
    "id_pig_type": 3,
    "description": "Destetando",
    "order": 4,
    "status": true,
    "min_weight": 0,
    "max_weight": 0,
    "food_amount": 0,
    "id_farm": 1
},
{
    "id_stage": 0,
    "id_pig_type": 2,
    "description": "Crecimiento 3",
    "order": 4,
    "status": true,
    "min_weight": 70,
    "max_weight": 100,
    "food_amount": 3,
    "id_farm": 1
},
{
    "id_stage": 0,
    "id_pig_type": 3,
    "description": "Lactancia",
    "order": 5,
    "status": true,
    "min_weight": 0,
    "max_weight": 0,
    "food_amount": 3,
    "id_farm": 1
},
{
    "id_stage": 0,
    "id_pig_type": 3,
    "description": "Inactiva",
    "order": 6,
    "status": true,
    "min_weight": 0,
    "max_weight": 0,
    "food_amount": 0,
    "id_farm": 1
}
] as IStage[]




export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id_farm=searchParams.get('id_farm')

  try {

    const farm=await db.query(`select id_farm FROM CAT.Stages where id_farm=${id_farm}`)

    if(farm.length){
      return Response.json({
        ok:true,
        data:'ya se cargaron las etapas'
      })
    }


    for (const stage of stages) {
      await db.query(`
      declare @const int 
      set @const=(SELECT isNull(max(id_stage),0)+1  FROM CAT.Stages)
      INSERT CAT.Stages(
        id_stage,
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
    const data= await db.query(`SELECT * FROM CAT.Stages WHERE id_farm=${id_farm}`)

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