import db from "@/database/connection";

export interface IQuantity {
  piglets:      number;
  growing_pigs: number;
  pigs:         number;
}

export const POST = async(req:Request) =>{
  // const body = await req.json();
  // const { }= body;

  try {
    const quantity= await db.query(`
    create table #quantity(piglets int,growing_pigs int, pigs int)
    insert into #quantity(piglets,growing_pigs,pigs) values(
    (select SUM(quantity) from MOD.Lot_Piglets where closed='false' and status='true'),
    (select SUM(quantity) from MOD.Growing_pigs where closed='false' and status='true'),
    (select COUNT(*) from MOD.Pigs where status='true'))
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