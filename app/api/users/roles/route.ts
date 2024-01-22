import { getRequestQuery } from "@/utils/getRequest";

export const GET = async(req:Request) =>await getRequestQuery(`SELECT * FROM RH.Roles where status='true'and id_role > 1`)