import db from "@/database/connection";
import bcrypt from "bcrypt";
import { IUser } from "@/interfaces/user";

const query =`
        id_user,
        name,
        email,
        id_role,
        status,
        img_url,
        phone,
        is_active,
        address,
        id_farm,
        id_state,
        is_company,
        zip
`

export const POST = async (req: Request) => {
  const body = await req.json();
  const {id_user, name, email, password, id_role,created_at,status,updated_at,img_url,phone,is_active,address,id_farm,id_state,zip} =
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
            id_role='${id_role}',
            status='${status}',
            updated_at='${updated_at}',
            img_url='${img_url}',
            phone='${phone}',
            is_active='${is_active}',
            address='${address}',
            id_farm='${id_farm}',
            id_state='${id_state}',
            zip='${zip}'
          WHERE id_user='${id_user}'
          SELECT ${query} FROM RH.Users WHERE id_user='${id_user}' and status='true'
      END
      ELSE
      BEGIN
    INSERT RH.Users (
      id_user,
      name,
      email,
      password,
      id_role,
      created_at,
      status,
      updated_at,
      img_url,
      phone,
      is_active,
      address,
      id_farm,
      id_state,
      is_company,
      zip
    )
    VALUES (
      @const,
      '${name}',
      '${email}',
      '${passwordHash}',
      '${id_role}',
      '${created_at}',
      '${status}',
      '${updated_at}',
      '${img_url}',
      '${phone}',
      '${is_active}',
      '${address}',
      '${id_farm}',
      '${id_state}',
      '${false}',
      '${zip}'
    )
    SELECT ${query} FROM RH.Users WHERE id_user=@const
    END
    `)) ;

    // const user = (res as IUser[]).map((user) => {
    //   const {
    //     password,
    //     created_at,
    //     updated_at,
    //     ...rest
    //   } = user;
    //   return rest;
    // });

    return Response.json(
      {
        ok: true,
        data: res[0],
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
