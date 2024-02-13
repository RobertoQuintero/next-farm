import {  getRequestQuery } from "@/utils/getRequest";

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
    const id_farm=searchParams.get('id_farm')

  return await getRequestQuery(`
  SELECT  
    id_task_type,
    description,
    status,
    id_farm
  FROM CAT.task_types WHERE status='true' --and id_farm=${id_farm}
  `)
}