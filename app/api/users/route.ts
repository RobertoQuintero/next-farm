import db from "@/database/connection";

export const GET = async(req:Request) =>{


  try {

    const resp= db.query(`select * from Usuarios`)

    return Response.json({
      ok:true,
      data:resp
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