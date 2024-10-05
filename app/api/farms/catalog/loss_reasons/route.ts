import { ILossReason } from "@/interfaces";
import { getRequestQuery, postRequest } from "@/utils/getRequest";

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
    const id_farm=searchParams.get('id_farm')
  return await getRequestQuery(`SELECT * FROM CAT.Loss_reasons where status=1 and id_farm=${id_farm}`)
}

export const POST = async(req:Request) =>{
  const body = await req.json();
  const {id_loss_reason,created_at,description,id_farm,status,updated_at }= body as ILossReason;
    
  return await postRequest(`
  declare @const int 
  set @const=(SELECT isNull(max(id_loss_reason),0)+1  FROM CAT.Loss_reasons)
  if ${id_loss_reason} > 0
  begin
    UPDATE CAT.Loss_reasons
    SET description='${description}',
        id_farm='${id_farm}',
        status='${status}',
        updated_at='${updated_at}'
    WHERE id_loss_reason=${id_loss_reason}
    SELECT * FROM CAT.Loss_reasons WHERE id_loss_reason=${id_loss_reason}
  end
  else
  begin
    INSERT CAT.Loss_reasons(
      id_loss_reason,
      created_at,
      description,
      id_farm,
      status,
      updated_at
    )
    VALUES(
      @const,
      '${created_at}',
      '${description}',
      '${id_farm}',
      '${status}',
      '${updated_at}'
    )
    SELECT * FROM CAT.Loss_reasons WHERE id_loss_reason=@const
  end
  `)
};