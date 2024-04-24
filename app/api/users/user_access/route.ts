import {getRequestQuery } from "@/utils/getRequest";

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
    const id_role=searchParams.get('id_role')
    const id_farm=searchParams.get('id_farm')
  return await getRequestQuery(`
    select 
      id_role_access,
      --RR.id_role,
      RR.id_access,
      --RR.status,
      AR.description
    from MOD.Role_access_routes RR
    left join CAT.Access_routes AR
    on AR.id_access=RR.id_access
    where id_role=${id_role} and id_farm=${id_farm} and RR.status='true'
  `)
}