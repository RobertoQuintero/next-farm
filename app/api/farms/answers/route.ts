import { IAnswer } from "@/interfaces";
import { getRequestQuery, postRequest } from "@/utils/getRequest";
const query=`
select 
id_answer,
MA.id_question,
MA.description,
MA.status,
MA.created_at,
MA.updated_at,
MA.id_user,
RU.name [user_name],
MQ.id_farm
from MOD.Answers MA
left join RH.Users RU
on RU.id_user=MA.id_user
left join MOD.Questions MQ
on MQ.id_question=MA.id_question
`
export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id_farm=searchParams.get('id_farm')
  return await getRequestQuery(`${query} where MA.status=1 and MQ.id_farm=${id_farm}`)
}

export const POST = async(req:Request) =>{
  const body = await req.json();
  const {id_answer,id_question,description,created_at,updated_at,id_user,status }= body as IAnswer;
    
  return await postRequest(`
  declare @const int 
  set @const=(SELECT isNull(max(id_answer),0)+1  FROM MOD.Answers)
  if ${id_answer} > 0
  begin
    UPDATE MOD.Answers
    SET id_question='${id_question}',
        description='${description}',
        updated_at='${updated_at}',
        id_user='${id_user}',
        status='${status}'
    WHERE id_answer=${id_answer}
    ${query} where id_answer=${id_answer}
  end
  else
  begin
    INSERT MOD.Answers(
      id_answer,
      id_question,
      description,
      created_at,
      updated_at,
      id_user,
      status
    )
    VALUES(
      @const,
      '${id_question}',
      '${description}',
      '${created_at}',
      '${updated_at}',
      '${id_user}',
      '${status}'
    )
    ${query} where id_answer=@const
  end
  `)
};