import db from "@/database/connection";
import { IStaticPig } from "@/interfaces";


export const POST = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id_farm=searchParams.get('id_farm')

  try {
    const data= await db.query(`
    create table #pigs(inactivas int,vacias int,montadas int, sin_confirmar int, cargadas int, destetando int)
    insert into #pigs(inactivas,vacias,montadas,sin_confirmar,cargadas,destetando) values(
    ISNULL((select Count(*) from MOD.Pigs where id_pig_stage=1  and status='true' and id_farm=${id_farm}),0),
    ISNULL((select Count(*) from MOD.Pigs where id_pig_stage=2  and status='true' and id_farm=${id_farm}),0),
    ISNULL((select Count(*) from MOD.Pigs where id_pig_stage=3  and status='true' and id_farm=${id_farm}),0),
    ISNULL((select Count(*) from MOD.Pigs where id_pig_stage=4  and status='true' and id_farm=${id_farm}),0),
    ISNULL((select Count(*) from MOD.Pigs where id_pig_stage=5  and status='true' and id_farm=${id_farm}),0),
    ISNULL((select Count(*) from MOD.Pigs where id_pig_stage=6  and status='true' and id_farm=${id_farm}),0)
    )
      select * from #pigs
      drop table #pigs
    `) as unknown as IStaticPig[]

    const arr = Object.keys(data[0]).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1).replace('_',' '),
      quantity: data[0][key as keyof IStaticPig]
    }));
    

    return Response.json({
      ok:true,
      data:arr
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