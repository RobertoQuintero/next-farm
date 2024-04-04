import { IProduct } from "@/interfaces";
import { getRequestQuery, postRequest } from "@/utils/getRequest";

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id_farm=searchParams.get('id_farm')
  return await getRequestQuery(`SELECT * FROM MOD.Products where status='true' and id_farm=${id_farm}`)
}

export const POST = async(req:Request) =>{
  const body = await req.json();
  const { id_product,code,created_at,description,id_farm,price,status,updated_at}= body as IProduct;
    
  return await postRequest(`
  declare @const int 
  set @const=(SELECT isNull(max(id_product),0)+1  FROM MOD.Products)
  if ${id_product} > 0
  begin
    UPDATE MOD.Products
    SET code='${code.trim()}',
        description='${description.trim()}',
        id_farm='${id_farm}',
        price='${price}',
        status='${status}',
        updated_at='${updated_at}'
    WHERE id_product=${id_product}
    SELECT * FROM MOD.Products WHERE id_product=${id_product}
  end
  else
  begin
    INSERT MOD.Products(
      id_product,
      code,
      created_at,
      description,
      id_farm,
      price,
      status,
      updated_at
    )
    VALUES(
      @const,
      '${code.trim()}',
      '${created_at}',
      '${description.trim()}',
      '${id_farm}',
      '${price}',
      '${status}',
      '${updated_at}'
    )
    SELECT * FROM MOD.Products WHERE id_product=@const
  end
  `)
};