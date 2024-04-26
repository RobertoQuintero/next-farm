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
RU.name,
MC.id_lot_piglets
from MOD.Comments MC
left join RH.Users RU
ON RU.id_user=MC.id_user
`


export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id_pig=searchParams.get('id_pig')
  const id_lot_piglets=searchParams.get('id_lot_piglets')
  console.log({id_lot_piglets})

  return await getRequestQuery(`${queryComment} where MC.status='true' and ${Number(id_pig)?`MC.id_pig=${id_pig}`:`MC.id_lot_piglets=${id_lot_piglets}`}`)
}

export const POST = async(req:Request) =>{
  const body = await req.json();
  const { id_comment,created_at,description,id_pig,id_user,status,updated_at,id_lot_piglets}= body as IComment;
    
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
        id_lot_piglets='${id_lot_piglets}',
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
      id_lot_piglets,
      updated_at
    )
    VALUES(
      @const,
      '${created_at}',
      '${description}',
      '${id_pig}',
      '${id_user}',
      '${status}',
      '${id_lot_piglets}',
      '${updated_at}'
    )
    ${queryComment} WHERE id_comment=@const
  end
  `)
};