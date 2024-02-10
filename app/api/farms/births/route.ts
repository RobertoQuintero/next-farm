import { IBirth } from "@/interfaces";
import { getRequestQuery, postRequest } from "@/utils/getRequest";

export const GET = async(req:Request) =>await getRequestQuery(`
  SELECT * FROM MOD.Births WHERE status='true'
`)

export const POST = async(req:Request) =>{
  const body = await req.json();
  const { id_birth,alive,birth_date,confirm_date,created_at,crossing_date,dead,description,id_pig,id_stallion,id_user,id_user_birth,id_user_confirm,is_positive,status}= body as IBirth;
    
  return await postRequest(`
  declare @const int 
  set @const=(SELECT isNull(max(id_birth),0)+1  FROM MOD.Births)
  if ${id_birth} > 0
  begin
    UPDATE MOD.Births
    SET alive='${alive}',
        birth_date='${birth_date}',
        confirm_date='${confirm_date}',
        crossing_date='${crossing_date}',
        dead='${dead}',
        description='${description}',
        id_pig='${id_pig}',
        id_stallion='${id_stallion}',
        id_user='${id_user}',
        id_user_birth='${id_user_birth}',
        id_user_confirm='${id_user_confirm}',
        is_positive='${is_positive}',
        status='${status}'
    WHERE id_birth=${id_birth}
    SELECT * FROM MOD.Births WHERE id_birth=${id_birth}
  end
  else
  begin
    INSERT MOD.Births(
      id_birth,
      alive,
      birth_date,
      confirm_date,
      created_at,
      crossing_date,
      dead,
      description,
      id_pig,
      id_stallion,
      id_user,
      id_user_birth,
      id_user_confirm,
      is_positive,
      status
    )
    VALUES(
      @const,
      '${alive}',
      '${birth_date}',
      '${confirm_date}',
      '${created_at}',
      '${crossing_date}',
      '${dead}',
      '${description}',
      '${id_pig}',
      '${id_stallion}',
      '${id_user}',
      '${id_user_birth}',
      '${id_user_confirm}',
      '${is_positive}',
      '${status}'
    )
    SELECT * FROM MOD.Births WHERE id_birth=@const
  end
  `)
};