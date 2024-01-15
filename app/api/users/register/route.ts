import db from "@/database/connection";
import bcrypt from "bcrypt";
import { IUser } from "@/interfaces/user";

const query =`
      id_user,
      id_company,
      name,
      email,
      phone,
      img_url,
      password,
      id_role,
      id_job_position,
      status,
      user_is_active,
      status
`

export const POST = async (req: Request) => {
  const body = await req.json();
  const { name, email, password, id_role,created_at,id_user,status,updated_at,id_job_position,img_url,phone,id_company,is_active,user_is_active} =
    body as IUser;

  try {
    if(!id_user){
      const resp = await db.query(`
        SELECT email FROM RH.Users WHERE email='${email}'`);
  
      if (resp.length) {
        return Response.json(
          {
            ok: false,
            data: "Ya hay un usuario con ese email",
          },
          {
            status: 400,
          }
        );
      }

    }

    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(password||'', salt);
    
    const res = (await db.query(`
    DECLARE @const int 
      SET @const=(SELECT isNull(max(id_user),0)+1  FROM RH.Users)
      if ${id_user} > 0
      BEGIN
        UPDATE RH.Users
        SET name='${name}',
            phone='${phone}',
            id_job_position='${id_job_position}',
            img_url='${img_url}',
            id_role='${id_role}',
            status='${status}',
            user_is_active='${user_is_active}',
            updated_at='${updated_at}',
            id_company='${id_company}'
          WHERE id_user='${id_user}'
          SELECT ${query} FROM RH.Users WHERE id_user='${id_user}' and status='true'
      END
      ELSE
      BEGIN
    INSERT RH.Users (
      id_user,
      id_company,
      name,
      email,
      phone,
      img_url,
      password,
      id_role,
      id_job_position,
      created_at,
      updated_at,
      status,
      user_is_active
    )
    VALUES (
      @const,
      '${id_company}',
      '${name}',
      '${email}',
      '${phone}',
      '${img_url}',
      '${passwordHash}',
      '${id_role}',
      '${id_job_position}',
      '${created_at}',
      '${updated_at}',
      '${status}',
      '${user_is_active}'
    )
    SELECT ${query} FROM RH.Users WHERE id_user=@const and status='true'
    END
    `)) as unknown;

    const user = (res as IUser[]).map((user) => {
      const {
        password,
        created_at,
        updated_at,
        status,
        ...rest
      } = user;
      return rest;
    });

    return Response.json(
      {
        ok: true,
        data: user[0],
      },
      // {
      //   status: 201,
      //   headers: {
      //     "content-type": "application/json; charset=utf-8",
      //     "Set-Cookie": `jwt=${token}; Max-Age=8640; Path=/`,
      //   },
      // }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        ok: false,
        data: "Error en el servidor",
      },
      {
        status: 500,
      }
    );
  }
};
