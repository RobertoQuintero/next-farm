import { getRequest, getRequestQuery } from "@/utils/getRequest";

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const startDate=searchParams.get('startDate')
  const endDate=searchParams.get('endDate')

  return await getRequestQuery(`
  SELECT 
  id_task,
    id_pig,
    MT.id_pig_task,
    MT.id_user,
    start_date,
    end_date,
    MT.created_at,
    done,
    comment,
    MT.status,
    PT.description,
    id_lot_piglets,
    RU.name 
  FROM MOD.Tasks MT
  left join CAT.Pig_tasks PT
  on PT.id_pig_task=MT.id_pig_task
  left join RH.Users RU
  on RU.id_user=MT.id_user
  where MT.start_date>='${startDate}' and MT.start_date<'${endDate}'
  `)
}
