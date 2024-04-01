import db from "@/database/connection";

export interface IQuantity {
  piglets:      number;
  growing_pigs: number;
  pigs:         number;
}

export const POST = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id_farm=searchParams.get('id_farm')

  try {
    const quantity= await db.query(`
    create table #quantity(piglets int,growing_pigs int, pigs int)
    insert into #quantity(piglets,growing_pigs,pigs) values(
    (select SUM(quantity) from MOD.Lot_Piglets where closed='false' and status='true' and id_farm=${id_farm}),
    (select SUM(quantity) from MOD.Growing_pigs where closed='false' and status='true' and id_farm=${id_farm}),
    (select COUNT(*) from MOD.Pigs where status='true' and id_farm=${id_farm}))
    select * from #quantity
    drop table #quantity
    `) as unknown as IQuantity[]
    const arr=[
      {
        name:'Gestantes',
        quantity:quantity[0].pigs
      },
      {
        name:'Lechones',
        quantity:quantity[0].piglets
      },
      {
        name:'Crecimiento',
        quantity:quantity[0].growing_pigs
      },
    ]

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