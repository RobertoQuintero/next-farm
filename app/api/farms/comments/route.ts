import { IComment } from "@/interfaces";
import { getRequestQuery, postRequest } from "@/utils/getRequest";
const queryComment=`
select 
id_comment,
id_pig,
description,
MC.created_at,
MC.updated_at,
MC.status,
MC.id_user,
RU.name
from MOD.Comments MC
left join RH.Users RU
ON RU.id_user=MC.id_user
`


export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id_pig=searchParams.get('id_pig')

  return await getRequestQuery(`${queryComment} where MC.status='true' and MC.id_pig=${id_pig}`)
}

export const POST = async(req:Request) =>{
  const body = await req.json();
  const { id_comment,created_at,description,id_pig,id_user,status,updated_at}= body as IComment;
    
  return await postRequest(`
  declare @const int 
  set @const=(SELECT isNull(max(id_comment),0)+1  FROM MOD.Comments)
  if ${id_comment} > 0
  begin
    UPDATE MOD.Comments
    SET description='${description}',
        id_pig='${id_pig}',
        id_user='${id_user}',
        status='${status}',
        updated_at='${updated_at}'
    WHERE id_comment=${id_comment}
    ${queryComment} WHERE id_comment=${id_comment}
  end
  else
  begin
    INSERT MOD.Comments(
      id_comment,
      created_at,
      description,
      id_pig,
      id_user,
      status,
      updated_at
    )
    VALUES(
      @const,
      '${created_at}',
      '${description}',
      '${id_pig}',
      '${id_user}',
      '${status}',
      '${updated_at}'
    )
    ${queryComment} WHERE id_comment=@const
  end
  `)
};