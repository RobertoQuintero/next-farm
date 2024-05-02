import db from "@/database/connection";
import { IQuestion } from "@/interfaces";
import { getRequestQuery, postRequest } from "@/utils/getRequest";

const query=`
select 
id_question,
MQ.description,
MQ.status,
MQ.id_farm,
MQ.id_user,
MQ.created_at,
MQ.updated_at,
RU.name [user_name]
from MOD.Questions MQ
left join RH.Users RU
on RU.id_user=MQ.id_user
`

export const GET = async(req:Request) =>{
  const {searchParams}= new URL(req.url)
  const id_farm=searchParams.get('id_farm')
  return await getRequestQuery(`${query} where MQ.status=1 and MQ.id_farm=${id_farm}`)
}


export const POST = async(req:Request) =>{
  const body = await req.json();
  const { id_question,description,id_farm,status,id_user,created_at,updated_at}= body as IQuestion;


  if(!status){
    await db.query(`UPDATE MOD.Answers set status=0 where id_question=${id_question}`)
  }
    
  return await postRequest(`
  declare @const int 
  set @const=(SELECT isNull(max(id_question),0)+1  FROM MOD.Questions)
  if ${id_question} > 0
  begin
    UPDATE MOD.Questions
    SET description='${description}',
        id_farm='${id_farm}',
        status='${status}',
        id_user='${id_user}',
        updated_at='${updated_at}'
    WHERE id_question='${id_question}'
    ${query} where id_question=${id_question}
  end
  else
  begin
    INSERT MOD.Questions(
      id_question,
      description,
      id_farm,
      status,
      id_user,
      created_at,
      updated_at
    )
    VALUES(
      @const,
      '${description}',
      '${id_farm}',
      '${status}',
      '${id_user}',
      '${created_at}',
      '${updated_at}'
    )
    ${query} where id_question=@const
  end
  `)
};