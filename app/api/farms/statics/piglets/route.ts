import db from "@/database/connection";
import { IStaticPig } from "@/interfaces";


export const POST = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id_farm=searchParams.get('id_farm')

  try {
    const data= await db.query(`
    create table #pigs(calostro int,etapa_2 int,etapa_3 int)
    insert into #pigs(calostro,etapa_2,etapa_3) values(
    ISNULL((select SUM(quantity) from MOD.Lot_Piglets where id_pig_stage=7 and closed='false' and status='true' and id_farm=${id_farm}),0),
    ISNULL((select SUM(quantity) from MOD.Lot_Piglets where id_pig_stage=8 and closed='false' and status='true' and id_farm=${id_farm}),0),
    ISNULL((select SUM(quantity) from MOD.Lot_Piglets where id_pig_stage=9 and closed='false' and status='true' and id_farm=${id_farm}),0)
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