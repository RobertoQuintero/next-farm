import { IUbication } from "@/interfaces";
import { getRequestQuery, postRequest } from "@/utils/getRequest";

const query=`
  SELECT
    id_ubication,
    CU.id_pig_type,
    CU.description,
    CU.status,
    CU.id_farm,
    CU.created_at,
    CU.updated_at,
    PT.description pig_type
  FROM CAT.Ubications CU
  inner join CAT.pig_types PT
  on PT.id_pig_type=CU.id_pig_type
`

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
    const id_farm=searchParams.get('id_farm')
  return await getRequestQuery(`${query} WHERE CU.id_farm=${id_farm}`)
}

export const POST = async(req:Request) =>{
  const body = await req.json();
  const { id_ubication,created_at,description,id_farm,id_pig_type,status,updated_at}= body as IUbication;

  return await postRequest(`  
    declare @const int 
    set @const=(SELECT isNull(max(id_ubication),0)+1  FROM CAT.Ubications)
    if ${id_ubication} > 0
    begin
      UPDATE CAT.Ubications
      SET description='${description}',
          id_farm='${id_farm}',
          id_pig_type='${id_pig_type}',
          status='${status}',
          updated_at='${updated_at}'
      WHERE id_ubication=${id_ubication}
      ${query} WHERE CU.id_ubication=${id_ubication}
    end
    else
    begin
      INSERT CAT.Ubications(
        id_ubication,
        created_at,
        description,
        id_farm,
        id_pig_type,
        status,
        updated_at
        )
        VALUES(
          @const,
          '${created_at}',
          '${description}',
          '${id_farm}',
          '${id_pig_type}',
          '${status}',
          '${updated_at}'
      )
      ${query} WHERE CU.id_ubication=@const
    end
  `)
};