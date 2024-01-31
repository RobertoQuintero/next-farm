import { IRoleAccess } from "@/interfaces";
import {  getRequestQuery, postRequest } from "@/utils/getRequest";

const query=`
        SELECT 
        id_role_access,
        id_role,
        AR.status,
        AR.id_access,
        id_farm,
        RR.description name
        FROM MOD.Role_access_routes AR
        inner join CAT.Access_routes RR
        on RR.id_access=AR.id_access
`

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
    const id_role=searchParams.get('id_role')
    const id_farm=searchParams.get('id_farm')
  return await getRequestQuery(`${query} where AR.id_role=${id_role} and AR.status='true' and AR.id_farm=${id_farm}`)
}

export const POST = async(req:Request) =>{
  const body = await req.json();
  const { id_access,id_role,id_role_access,id_farm,status}= body as IRoleAccess;

  return await postRequest(`
        declare @const int 
        set @const=(SELECT isNull(max(id_role_access),0)+1  FROM MOD.Role_access_routes)
        if ${id_role_access} > 0
        begin
          UPDATE MOD.Role_access_routes
          SET id_role='${id_role}',
              id_access='${id_access}',
              id_farm='${id_farm}',
              status='${status}'
          WHERE id_role_access=${id_role_access}
          ${query} WHERE id_role_access=${id_role_access}
        end
        else
        begin
          INSERT MOD.Role_access_routes(
            id_role_access,
            id_role,
            id_access,
            id_farm,
            status
          )
          VALUES(
            @const,
            '${id_role}',
            '${id_access}',
            '${id_farm}',
            '${status}'
          )
          ${query} WHERE id_role_access=@const
        end
  
  `)
};