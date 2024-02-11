import { IBirth } from "@/interfaces";
import { getRequestQuery, postRequest } from "@/utils/getRequest";

export const queryBirth=`
    select 
    id_birth,
    id_pig,
    MB.id_stallion,
    birth_date,
    confirm_date,
    crossing_date,
    is_positive,
    alive,
    dead,
    MB.description,
    MB.status,
    MB.created_at,
    id_user,
    id_user_confirm,
    id_user_birth,
    MB.id_fertilization_type,
    MS.name stallion,
    FT.description fertilization_type
    from MOD.Births MB
    inner join MOD.Stallions MS
    on MS.id_stallion=MB.id_stallion
    inner join Cat.Fertilization_types FT
    on FT.id_fertilization_type=MB.id_fertilization_type
`

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id_pig=searchParams.get('id_pig')
  return await getRequestQuery(`${queryBirth} WHERE MB.status='true' and id_pig=${id_pig}`)
}

export const POST = async(req:Request) =>{
  const body = await req.json();
  const { id_birth,alive,birth_date,confirm_date,created_at,crossing_date,dead,description,id_pig,id_stallion,id_user,id_user_birth,id_user_confirm,is_positive,status,id_fertilization_type}= body as IBirth;
    
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
      status,
      id_fertilization_type
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
      '${id_fertilization_type}'
    )
    SELECT * FROM MOD.Births WHERE id_birth=@const
  end
  `)
};