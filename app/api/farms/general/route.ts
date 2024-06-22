import { getRequestQuery } from "@/utils/getRequest";

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id_farm=searchParams.get('id_farm')
  return await getRequestQuery(`select * from CAT.Ubications where id_farm=${id_farm} and is_general=1 and status=1`)
}