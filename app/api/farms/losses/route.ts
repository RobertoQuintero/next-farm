import { ILoss } from "@/interfaces";
import { getRequestQuery, postRequest } from "@/utils/getRequest";
const queryLosses=`
select 
id_loss,
ML.id_loss_reason,
id_pig,
id_growing_lot,
id_lot_piglets,
ML.id_pig_type,
ML.status,
ML.created_at,
comment,
ML.quantity,
PT.description pig_type,
LR.description loss_reason
from MOD.Losses ML
left join CAT.pig_types  PT
on PT.id_pig_type=ML.id_pig_type
left join CAT.Loss_reasons LR
on LR.id_loss_reason=ML.id_loss_reason
`

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id_pig=searchParams.get('id_pig')
  const id_growing_lot=searchParams.get('id_growing_lot')
  const id_lot_piglets=searchParams.get('id_lot_piglets')
  let query=''
  if(Number(id_pig)){
    query=`and id_pig=${id_pig}`
  }else if(Number(id_lot_piglets)){
    query=`and id_lot_piglets=${id_lot_piglets}`
  }else if(Number(id_growing_lot)){
    query=`and id_growing_lot=${id_growing_lot}`
  }
  return await getRequestQuery(`${queryLosses} where ML.status='true' ${query}`)
}

export const POST = async(req:Request) =>{
  const body = await req.json();
  const {id_loss,comment,created_at,id_growing_lot,id_loss_reason,id_lot_piglets,id_pig,id_pig_type,status,quantity}= body as ILoss;
    
  return await postRequest(`
  declare @const int 
  set @const=(SELECT isNull(max(id_loss),0)+1  FROM MOD.Losses)
  if ${id_loss} > 0
  begin
    UPDATE MOD.Losses
    SET comment='${comment}',
        id_growing_lot='${id_growing_lot}',
        id_lot_piglets='${id_lot_piglets}',
        id_loss_reason='${id_loss_reason}',
        id_pig=${id_pig},
        id_pig_type='${id_pig_type}',
        quantity='${quantity}',
        status='${status}'
    WHERE id_loss=${id_loss}
    ${queryLosses} WHERE id_loss=${id_loss}
  end
  else
  begin
    INSERT MOD.Losses(
      id_loss,
      comment,
      created_at,
      id_growing_lot,
      id_loss_reason,
      id_lot_piglets,
      id_pig,
      id_pig_type,
      quantity,
      status
    )
    VALUES(
      @const,
      '${comment}',
      '${created_at}',
      '${id_growing_lot}',
      '${id_loss_reason}',
      '${id_lot_piglets}',
      '${id_pig}',
      '${id_pig_type}',
      '${quantity}',
      '${status}'
    )
    ${queryLosses} WHERE id_loss=@const
  end
  `)
};