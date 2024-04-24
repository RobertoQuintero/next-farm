import db from "@/database/connection";
import { IBirth } from "@/interfaces";

export const POST = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id_farm=searchParams.get('id_farm')

  try {
    const births= await db.query(`
    select 
    MB.id_birth,
    MB.id_stallion,
    MS.name stallion,
    Mb.alive,
    MOD.setYearMonthStallion(datepart(month,crossing_date),datepart(year,crossing_date)) crossing_month,
    MOD.setYearMonthStallion(datepart(month,birth_date),datepart(year,birth_date)) birth_month,
    MP.id_farm
    from MOD.Births MB
    left join MOD.Pigs MP
    on MP.id_pig=MB.id_pig
    left join MOD.Stallions MS
    on MS.id_stallion=MB.id_stallion
    where MP.id_farm=${id_farm}
    order by crossing_date
    `) as unknown as IBirth[]

    const stallions=births.map(b=>b.stallion)

    const crossingArr=births.map(b=>b.crossing_month)
    const birthsArr=births.filter(a=>a.alive).map(b=>b.birth_month)

    const crossing_months=[...new Set(crossingArr)]
    const births_months=[...new Set(birthsArr)]
    const new_stallions=[...new Set(stallions)]

    const report_crossing= new_stallions.map(n=>{
      return{
        stallion:n,
        months:crossing_months.map(c=>{
          return {
            month:c,
            quantity:births.filter(f=>f.stallion===n&&f.crossing_month===c).length
          }
        }).filter(a=>a.quantity)
      }
    })
    const report_births= new_stallions.map(n=>{
      return{
        stallion:n,
        months:births_months.map(c=>{
          return {
            month:c,
            quantity:births.filter(f=>f.stallion===n&&f.crossing_month===c&&f.alive).length
          }
        }).filter(a=>a.quantity)
      }
    })

  
    return Response.json({
      ok:true,
      data:{
        report_crossing,
        report_births
      }
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