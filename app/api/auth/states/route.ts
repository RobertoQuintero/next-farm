import db from "@/database/connection";

export const GET = async(req:Request) =>{

  try {
    const data= await db.query(`
      SELECT id_state,description FROM RH.Cat_states 
    `)
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