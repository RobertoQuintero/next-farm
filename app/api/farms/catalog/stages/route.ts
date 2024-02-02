import { IStage } from "@/interfaces";
import {  getRequestQuery, postRequest } from "@/utils/getRequest";

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
    const id_farm=searchParams.get('id_farm')

  return await getRequestQuery(`SELECT * FROM Cat.Stages WHERE status='true' and id_farm=${id_farm}`)
}

export const POST = async(req:Request) =>{
  const body = await req.json();
  const { id_stage,description,food_amount,id_farm,id_pig_type,max_weight,min_weight,order,status}= body as IStage;
    console.log(body)
  return await postRequest(`
  declare @const int 
  set @const=(SELECT isNull(max(id_stage),0)+1  FROM CAT.Stages)
  if ${id_stage} > 0
  begin
    UPDATE CAT.Stages
    SET description='${description}',
        food_amount='${food_amount}',
        id_farm='${id_farm}',
        id_pig_type='${id_pig_type}',
        max_weight='${max_weight}',
        min_weight='${min_weight}',
        [order]='${order}',
        status='${status}'
    WHERE id_stage=${id_stage}
    SELECT * FROM CAT.Stages WHERE id_stage=${id_stage}
  end
  else
  begin
    INSERT CAT.Stages(
      id_stage,
      description,
      food_amount,
      id_farm,
      id_pig_type,
      max_weight,
      min_weight,
      [order],
      status
    )
    VALUES(
      @const,
      '${description}',
      '${food_amount}',
      '${id_farm}',
      '${id_pig_type}',
      '${max_weight}',
      '${min_weight}',
      '${order}',
      '${status}'
    )
    SELECT * FROM CAT.Stages WHERE id_stage=@const
  end
  `)
};