import db from "@/database/connection";

export const GET = async(req:Request) =>{

  const {searchParams}= new URL(req.url)
  const id_farm=searchParams.get('id_farm')

  try {
    let serial=''
    const resp=await db.query(`
    select top 1 p1.code from MOD.Pigs as p1
    where p1.status=0 and p1.id_farm=${id_farm}
    and not exists (select p2.code from mod.Pigs as p2
    where p2.status=1 and p2.id_farm=${id_farm} and p1.code=p2.code)
    order by p1.code
    `) as unknown as {code:string}[]
     
    if(!resp[0]?.code){
      const num= await db.query(` 
      SELECT isNull((
        SELECT COUNT(*)
        FROM MOD.Pigs WHERE id_farm=1 and status='true'
        ),0)+1 code
      `) as unknown  as {code:string}[]
      const id=Number(num[0].code)

      if(id<9){
        serial=`000${id + 1}`
      }
      else if(id<99){
        serial=`00${id + 1}`
      }
      else if(id<999){
        serial=`0${id + 1}`
      }
      else {
        serial=`${id + 1}`
      }

    }else{
      serial=resp[0]?.code
    }


    return Response.json({
      ok:true,
      data:serial      
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