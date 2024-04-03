import db from "@/database/connection";
import { IStaticPig } from "@/interfaces";


export const POST = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id_farm=searchParams.get('id_farm')

  try {
    const data= await db.query(`
    create table #pigs(inicio int,crecimiento_1 int,crecimiento_2 int,sin_mineral int)
    insert into #pigs(inicio,crecimiento_1,crecimiento_2,sin_mineral) values(
    ISNULL((select SUM(quantity) from MOD.Growing_pigs where id_pig_stage=10  and status='true' and id_farm=${id_farm}),0),
    ISNULL((select SUM(quantity) from MOD.Growing_pigs where id_pig_stage=11  and status='true' and id_farm=${id_farm}),0),
    ISNULL((select SUM(quantity) from MOD.Growing_pigs where id_pig_stage=12  and status='true' and id_farm=${id_farm}),0),
    ISNULL((select SUM(quantity) from MOD.Growing_pigs where id_pig_stage=13  and status='true' and id_farm=${id_farm}),0)
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