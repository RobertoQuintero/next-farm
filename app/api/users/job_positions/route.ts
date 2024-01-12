import db from "@/database/connection";

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id_company= searchParams.get('id_company')
  try {
    const data = await db.query(`SELECT * FROM RH.Job_positions where id_company=${id_company}`)
    return Response.json({
      ok:true,
      data
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