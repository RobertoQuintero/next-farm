import {  getRequestQuery } from "@/utils/getRequest";

export const GET = async(req:Request) =>await getRequestQuery(`
  SELECT * FROM MOD.Deaths
`)