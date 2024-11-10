import db from "@/database/connection";
import { IGrowingPigs } from "@/interfaces/growing_pigs";

export const POST = async(req:Request) =>{
  const body = await req.json();
  const {id_farm,id_ubication,average_weight,closed,created_at,exit_date,id_pig_stage,id_user,quantity,start_date,status }= body as IGrowingPigs;
  
try {
    const lot= await db.query(`
      select * from MOD.Growing_pigs where id_farm=${id_farm} and status=1 and id_ubication=${id_ubication}
      `) as unknown as IGrowingPigs[]

      if(lot.length){
        await db.query(`
            UPDATE MOD.Growing_pigs
            SET quantity=${Number(lot[0].quantity)+Number(quantity)}
            WHERE id_growing_lot=${lot[0].id_growing_lot}
          `)
      }else{
        await db.query(`
          declare @const int 
          set @const=(SELECT isNull(max(id_growing_lot),0)+1  FROM MOD.Growing_pigs)
          INSERT MOD.Growing_pigs(
            id_growing_lot,
            id_farm,
            id_ubication,
            average_weight,
            closed,
            created_at,
            exit_date,
            id_pig_stage,
            id_user,
            quantity,
            start_date,
            status
          )
          VALUES(
            @const,
            '${id_farm}',
            '${id_ubication}',
            '${average_weight}',
            '${closed}',
            '${created_at}',
            '${exit_date}',
            '${id_pig_stage}',
            '${id_user}',
            '${quantity}',
            '${start_date}',
            '${status}'
          )
        `)
      }



    return Response.json({
      ok:true,
      data:lot
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
