import { getRequestQuery } from "@/utils/getRequest";

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
    const idFarm=searchParams.get('idFarm')
  return await getRequestQuery(`SELECT * FROM RH.Users WHERE status='true' and id_farm=${idFarm}`)
}