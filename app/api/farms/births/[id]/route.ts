import { IPiglets } from "@/interfaces";
import { postRequest } from "@/utils/getRequest";

export const POST = async(req:Request) =>{
  const body = await req.json();
  const {id_birth,quantity }= body as IPiglets;
  return await postRequest(`
    UPDATE MOD.Births
    SET alive=${quantity}
    WHERE id_birth=${id_birth}
    select * from MOD.Births WHERE id_birth=${id_birth}
  `)
};