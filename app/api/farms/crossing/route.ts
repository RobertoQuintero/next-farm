import db from "@/database/connection";
import { queryPig } from "../pigs/route";
import { queryBirth } from "../births/route";

export const POST = async(req:Request) =>{
  const body = await req.json();
  const { crossing_date,id_pig,id_stallion,id_user,id_fertilization_type}= body as 
                                                              {
                                                                id_stallion:number,
                                                                crossing_date:string,
                                                                id_pig:number,
                                                                id_user:number,
                                                                id_fertilization_type:number
                                                              };

    try {
      const pig=await db.query(`
        UPDATE MOD.Pigs SET id_stage=10 WHERE id_pig=${id_pig}
        ${queryPig} where id_pig=${id_pig}
      `)

      const resp= await db.query(`
      declare @const int 
      set @const=(SELECT isNull(max(id_birth),0)+1  FROM MOD.Births)

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
          0,
          DATEADD(DAY,114,'${crossing_date} 06:00:00.000'),
          DATEADD(DAY,91,'${crossing_date} 06:00:00.000'),
          GETUTCDATE(),
          '${crossing_date} 06:00:00.000',
          0,
          '',
          '${id_pig}',
          '${id_stallion}',
          '${id_user}',
          '${id_user}',
          '${id_user}',
          'false',
          'true',
          '${id_fertilization_type}'
        )
      ${queryBirth} WHERE id_birth=@const
      `)
      
      return Response.json({
        ok:true,
        data:{birth:resp[0],pig:pig[0]}
      })
    } catch (error) {
      console.log({error})
      return Response.json({
        ok:false,
        data:'Error en el servidor al intentar conectar con la base de datos'
      },{
        status:500
      })
    }
    
};

