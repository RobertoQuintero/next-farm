import db from "@/database/connection";
import { serverError } from ".";

export const getRequest = async(query:string) =>{
  try {
    const data=await db.query(`SELECT * FROM ${query} WHERE status='true'`)
    return Response.json({ok:true, data})
  } catch (error) {
    console.log({error})
    return Response.json({
      ok:false,
      data:serverError
    },{ status:500})
  }
}
;
export const getRequestQuery = async(query:string) =>{
  try {
    const data=await db.query(query)
    return Response.json({ok:true, data})
  } catch (error) {
    console.log({error})
    return Response.json({
      ok:false,
      data:serverError
    },{ status:500})
  }
};

export const postRequest=async(query:string)=>{
  try {
    const resp= await db.query(query)

    return Response.json({
      ok:true,
      data:resp[0]
    })
  } catch (error) {
    console.log({error})
    return Response.json({
      ok:false,
      data:serverError
    },{
      status:500
    })
  }
}