import db from "@/database/connection";

export const GET = async(req:Request) =>{

  try {
    const data=await db.query(`SELECT * FROM RH.Users where status='true'`)
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