import db from "@/database/connection";
import { IFarm } from "@/interfaces/farm";

export const GET = async(req:Request) =>{

  try {
    const data= await db.query(`SELECT * FROM RH.Farms`)
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

export const POST = async(req:Request) =>{
  const body = await req.json();
  const {address,id_user,id_farm,name,phone,status,zip,created_at }= body as IFarm;

  try {

    const resp=await db.query(`
    DECLARE @const int 
    SET @const=(SELECT isNull(max(id_farm),0)+1  FROM RH.Farms)
    if ${id_farm} > 0
    BEGIN
      UPDATE RH.Farms
      SET name='${name}',
          phone='${phone}',
          address='${address}',
          status='${status}',
          zip='${zip}',
          id_user='${id_user}'
      WHERE id_farm='${id_farm}'
      SELECT * FROM RH.Farms WHERE id_farm='${id_farm}'
    END
    ELSE
    BEGIN
      INSERT RH.Farms (
        id_farm,
        id_user,
        name,
        address,
        phone,
        status,
        zip,
        created_at
      )
      VALUES (
        @const,
        '${id_user}',
        '${name}',
        '${address}',
        '${phone}',
        '${status}',
        '${zip}' ,
        '${created_at}' 
      )
      SELECT * FROM RH.Farms WHERE id_farm=@const
    END
    `)

    return Response.json({
      ok:true,
      data:resp[0]
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