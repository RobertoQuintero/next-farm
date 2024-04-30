import db from "@/database/connection";
import { IRace } from "@/interfaces";
import {  getRequestQuery, postRequest } from "@/utils/getRequest";

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id_farm=searchParams.get('id_farm')

  return await getRequestQuery(`SELECT * FROM CAT.Races WHERE status='true' AND id_farm=${id_farm} `)
}

export const POST = async(req:Request) =>{
  const body = await req.json();
  const { id_race,description,id_farm,status,created_at,updated_at}= body as IRace;

  if(!id_race){
    try {
      const resp= await db.query(`select * from CAT.Races where status='true' and description='${description}'`)
      if(resp.length){
        return Response.json({ok:false,data:'Ya existe esa raza'},{status:401})
      }
    } catch (error) {
      console.log(error)
      return Response.json({ok:false,data:'Error el agregar registro'},{status:500})
    }  
  }
    
  return await postRequest(`
  declare @const int 
  set @const=(SELECT isNull(max(id_race),0)+1  FROM CAT.Races)
  if ${id_race} > 0
  begin
    UPDATE CAT.Races
    SET description='${description}',
        id_farm='${id_farm}',
        status='${status}',
        updated_at='${updated_at}'
    WHERE id_race=${id_race}
    SELECT * FROM CAT.Races WHERE id_race=${id_race}
  end
  else
  begin
    INSERT CAT.Races(
      id_race,
      description,
      id_farm,
      status,
      created_at,
      updated_at
    )
    VALUES(
      @const,
      '${description}',
      '${id_farm}',
      '${status}',
      '${created_at}',
      '${updated_at}'
    )
    SELECT * FROM CAT.Races WHERE id_race=@const
  end
  `)
};