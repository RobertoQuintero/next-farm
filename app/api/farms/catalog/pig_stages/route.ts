import { getRequestQuery } from "@/utils/getRequest";

export const GET = async(req:Request) =>await getRequestQuery(`select * from CAT.Pig_stages where id_pig_type<4`)