import db from "@/database/connection";
import { IBirth, IPig } from "@/interfaces";
import { IGrowingPigs } from "@/interfaces/growing_pigs";

export const POST = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id_farm=searchParams.get('id_farm')

  try {

    const report= (await db.query(`
        declare @box int=isnull((select SUM(quantity) from MOD.Lot_Piglets where id_pig_stage=10 and status=1 and id_farm=${id_farm}),0)
        declare @piglets int =isnull((select SUM(quantity) from MOD.Lot_Piglets where id_pig_stage!=10 and status=1 and id_farm=${id_farm}),0)
        declare @weight_1 int=isnull((select SUM(quantity) from MOD.Growing_pigs where average_weight>=30 and average_weight<=50 and status=1 and id_farm=${id_farm}),0)
        declare @weight_2 int=isnull((select SUM(quantity) from MOD.Growing_pigs where average_weight>=51 and average_weight<=80 and status=1 and id_farm=${id_farm}),0)
        declare @others int=isnull((select sum(quantity) from MOD.Growing_pigs where status=1 and id_farm=${id_farm})-(@weight_1+@weight_2),0)
        declare @pigs int=isnull((select COUNT(*) from MOD.Pigs where status=1 and id_farm=${id_farm}),0)

        select 
        @piglets piglets,@box box,@weight_1 weight_1,@weight_2 weight_2,@others others,@pigs pigs,@piglets+@box+@weight_1+@weight_2+@others+@pigs total   
      `) as unknown as Array<any>)[0]


      const growing= await db.query(`
          select
          id_growing_lot,
          quantity,
          --exit_date,
          MOD.setMonthName(DATEPART(MONTH,exit_date),5)+' '+CONVERT(varchar,DATEPART(YEAR,exit_date)) month_name
          from MOD.Growing_pigs where status=1 and id_farm=${id_farm} and exit_date>= GETDATE() and closed=0
          order by exit_date asc
        `) as unknown  as IGrowingPigs[]

        const arr= [...new Set(growing.map(g=>g.month_name))].map(a=>{

          return {
            month:a,
            quantity:growing.filter(f=>f.month_name===a).reduce((acc,curr)=>acc+curr.quantity,0)
          }
        })

      // const pigs= await db.query(`
      //     select
      //     id_birth, 
      //     birth_date,
      //     crossing_date,
      //     confirm_date,
      //     MP.id_pig_stage,
      //     mp.id_pig,
      //     CP.description pig_stage,
      //     MOD.setMonthNameAll(DATEPART(MONTH,birth_date))+' '+CONVERT(varchar,DATEPART(YEAR,birth_date)) month_name
      //     from MOD.Births MB
      //     left join MOD.Pigs MP
      //     on MP.id_pig=MB.id_pig
      //     left join CAT.Pig_stages CP
      //     on CP.id_pig_stage=MP.id_pig_stage
      //     where MB.status=1 and birth_date>=GETDATE() and MP.id_farm=${id_farm} and id_birth_type=1
      //     and MP.status=1 and MB.closed=0 and MP.id_pig_stage>2 and MP.id_pig_stage<6
      //     order by birth_date
      //   `) as unknown as IPig[]

      const births= await db.query(`
          		  select 
		  convert(datetime,MOD.getBirthDay(MP.id_pig,MP.id_pig_stage)) next_birth,
		  MOD.setMonthNameAll(DATEPART(MONTH,convert(datetime,MOD.getBirthDay(MP.id_pig,MP.id_pig_stage))))+' '+CONVERT(varchar,DATEPART(YEAR,convert(datetime,MOD.getBirthDay(MP.id_pig,MP.id_pig_stage)))) month_name,
		  CP.description pig_stage
		  from MOD.Pigs MP
		  left join CAT.Pig_stages CP
          on CP.id_pig_stage=MP.id_pig_stage
		  where MP.id_farm=${id_farm} and MP.status=1 and MP.id_pig_stage>2 and MP.id_pig_stage<6 --and convert(datetime,MOD.getBirthDay(MP.id_pig,MP.id_pig_stage))>=GETDATE()
		  order by next_birth
        `) as unknown as IBirth[]
      // const births= await db.query(`
      //     select
      //     id_birth, 
      //     birth_date,
      //     crossing_date,
      //     confirm_date,
      //     MP.id_pig_stage,
      //     mp.id_pig,
      //     CP.description pig_stage,
      //     MOD.setMonthNameAll(DATEPART(MONTH,birth_date))+' '+CONVERT(varchar,DATEPART(YEAR,birth_date)) month_name
      //     from MOD.Births MB
      //     left join MOD.Pigs MP
      //     on MP.id_pig=MB.id_pig
      //     left join CAT.Pig_stages CP
      //     on CP.id_pig_stage=MP.id_pig_stage
      //     where MB.status=1 and birth_date>=GETDATE() and MP.id_farm=${id_farm} and id_birth_type=1
      //     and MP.status=1 and MB.closed=0 and MP.id_pig_stage>2 and MP.id_pig_stage<6
      //     order by birth_date
      //   `) as unknown as IBirth[]

        const pigs=[]
        const newBirths= [...new Set(births.map(g=>g.pig_stage))]

        for (const birth of newBirths) {
          const item={
            stage:birth,
            months:[...new Set(births.filter(f=>f.pig_stage===birth).map(g=>g.month_name))]
                      .map(m=>{
                        return{
                          month:m,
                          quantity:births.filter(b=>b.month_name===m&&birth===b.pig_stage).length
                        }
                      })
          }

          pigs.push(item)
          
        }



    return Response.json({
      ok:true,
      data:{report,growing:arr,pigs}
    
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


