import db from "@/database/connection";
import { ILoss } from "@/interfaces";

export const POST = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id_farm=searchParams.get('id_farm')

  try {

    const resp= await db.query(`
        select 
        id_loss,
        ML.id_loss_reason,
        ML.status,
        ML.created_at,
        id_growing_lot,
        ML.id_pig_type,
        quantity,
        LR.description loss_reason,
        PT.description pig_type,
        MOD.setMonthNameAll(DATEPART(month,ML.created_at)) +' '+ CONVERT(varchar,DATEPART(YEAR,ML.created_at)) [month],
        LR.id_farm
        from MOD.Losses ML
        left join CAT.Loss_reasons LR
        on LR.id_loss_reason=ML.id_loss_reason
        left join CAT.pig_types PT
        on PT.id_pig_type=ML.id_pig_type
        where ML.status=1 and LR.id_farm=${id_farm}
        order by ML.created_at 
      `) as unknown as ILoss[]

      const types= [... new Set(resp.map(l=>l.pig_type))].map(t=>{
        return {
          pig_type:t,
          loss_reasons:[... new Set(resp.filter(l=>l.pig_type===t).map(l=>l.loss_reason))]
                        .map(a=>{
                          return {
                            loss_reason:a,
                            months:[...new Set(resp.filter(b=>b.pig_type===t&&b.loss_reason===a).map(c=>c.month))]
                                    .map(d=>{
                                      return {
                                        month:d,
                                        losses_quantity:resp.filter(e=>e.pig_type===t&&e.loss_reason===a&&e.month===d).reduce((acc,curr)=>acc+curr.quantity,0),
                                      }
                                    })
                          }
                        })
        }
      })

    return Response.json({
      ok:true,
      data:types
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