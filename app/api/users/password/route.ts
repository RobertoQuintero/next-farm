import { IUser } from "@/interfaces";
import { postRequest } from "@/utils/getRequest";
import bcrypt from "bcrypt";

export const POST = async(req:Request) =>{
  const body = await req.json();
  const { password,id_user }= body as IUser;

  const salt = bcrypt.genSaltSync();
  const passwordHash = bcrypt.hashSync(password, salt);

  return await postRequest(`
  UPDATE RH.Users SET password='${passwordHash}' ,updated_at='${new Date().toISOString()}' WHERE id_user=${id_user}
  select id_user,name,updated_at from RH.Users where id_user=${id_user}
  `)
};