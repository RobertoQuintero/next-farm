import connection from "@/database/mysql";

export const GET = async(req:Request) =>{
  

  try {
    
    const data=await connection.query('select * from Users')
 
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