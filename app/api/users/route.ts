import db from "@/database/connection";
import { IUser } from "@/interfaces";

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
    const idFarm=searchParams.get('idFarm')
    const id_user=searchParams.get('id_user')

  try {
    let newUsers=[] as IUser[]
    const users= await db.query(`SELECT * FROM RH.Users WHERE status='true' and id_farm=${idFarm}`) as unknown as IUser[]

    const user=await db.query(`SELECT * FROM RH.Users WHERE status='true' and id_user=${id_user}`) as unknown as IUser[]
    if(!user[0].id_farm){
      newUsers=[...users,user[0]]
    }else{
      newUsers=[...users]
    }
    
    return Response.json({
      ok:true,
      data:newUsers.map(u=>{
        const {password,...rest}=u
        return rest
      })
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