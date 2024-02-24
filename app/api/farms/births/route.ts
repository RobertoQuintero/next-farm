import { IBirth } from "@/interfaces";
import { getRequestQuery, postRequest } from "@/utils/getRequest";
import { queryBirth } from "@/utils/queries";

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id_pig=searchParams.get('id_pig')
  return await getRequestQuery(`${queryBirth} WHERE MB.status='true' and id_pig=${id_pig} order by id_birth asc`)
}

export const POST = async(req:Request) =>{
  const body = await req.json();
  const { id_birth,alive,birth_date,confirm_date,created_at,crossing_date,dead,description,id_pig,id_stallion,id_user,id_user_birth,id_user_confirm,is_positive,status,id_fertilization_type,id_birth_type,comment,closed}= body as IBirth;
    
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
        comment='${comment}',
        is_positive='${is_positive}',
        id_birth_type='${id_birth_type}',
        closed='${closed}',
        status='${status}'
    WHERE id_birth=${id_birth}
    ${queryBirth} WHERE id_birth=${id_birth}
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
      status,
      id_fertilization_type,
      id_birth_type,
      comment,
      closed
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
      '${status}',
      '${id_fertilization_type}',
      '${id_birth_type}',
      '${comment}',
      '${closed}'
    )
    ${queryBirth} WHERE id_birth=@const
  end
  `)
};