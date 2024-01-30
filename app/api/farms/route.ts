import { IFarm } from "@/interfaces/farm";
import { getRequestQuery, postRequest } from "@/utils/getRequest";

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
    const id_user=searchParams.get('id_user')
    console.log({id_user})
  return await getRequestQuery(`SELECT * FROM RH.Farms where id_user=${id_user} and status='true'`)
}

export const POST = async(req:Request) =>{
  const body = await req.json();
  const {address,id_user,id_farm,name,phone,status,zip,created_at }= body as IFarm;

  return await postRequest(`
  DECLARE @const int 
  SET @const=(SELECT isNull(max(id_farm),0)+1  FROM RH.Farms)
  if ${id_farm} > 0
  BEGIN
    UPDATE RH.Farms
    SET name='${name}',
        phone='${phone}',
        address='${address}',
        status='${status}',
        zip='${zip}',
        id_user='${id_user}'
    WHERE id_farm='${id_farm}'
    SELECT * FROM RH.Farms WHERE id_farm='${id_farm}'
  END
  ELSE
  BEGIN
    INSERT RH.Farms (
      id_farm,
      id_user,
      name,
      address,
      phone,
      status,
      zip,
      created_at
    )
    VALUES (
      @const,
      '${id_user}',
      '${name}',
      '${address}',
      '${phone}',
      '${status}',
      '${zip}' ,
      '${created_at}' 
    )
    SELECT * FROM RH.Farms WHERE id_farm=@const
  END
  `)
};