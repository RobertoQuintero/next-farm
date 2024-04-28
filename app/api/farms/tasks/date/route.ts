import { getRequest, getRequestQuery } from "@/utils/getRequest";

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const startDate=searchParams.get('startDate')
  const endDate=searchParams.get('endDate')

  return await getRequestQuery(`
  SELECT 
  id_task,
    MT.id_pig,
    MT.id_pig_task,
    MT.id_user,
    start_date,
    end_date,
    MT.created_at,
    done,
    comment,
    MT.status,
    PT.description,
    ML.id_lot_piglets,
    RU.name 
  FROM MOD.Tasks MT
  left join CAT.Pig_tasks PT
  on PT.id_pig_task=MT.id_pig_task
  left join RH.Users RU
  on RU.id_user=MT.id_user
  left join MOD.Pigs MP
  on MP.id_pig=MT.id_pig
  left join MOD.Lot_Piglets ML
  on ML.id_lot_piglets=MT.id_lot_piglets
  where MT.start_date>='${startDate}' and MT.start_date<'${endDate}' and MP.status=1 and ML.status=1 and MT.status=1
  
  `)
}
