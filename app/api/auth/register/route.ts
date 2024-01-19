import db from "@/database/connection";
import { createJWT } from "../../../../utils";
import bcrypt from "bcrypt";
import { IUser } from "@/interfaces/user";


export const POST = async (req: Request) => {
  const body = await req.json();
  const { name, email, password, phone, address, zip,id_role,created_at,id_state,is_active,status,updated_at,id_user,img_url,is_company,id_farm } =
    body as IUser;

  try {
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

    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(password!, salt);
    

    const res = (await db.query(`
    DECLARE @const int 
      SET @const=(SELECT isNull(max(id_user),0)+1  FROM RH.Users)
      if ${id_user} > 0
      BEGIN
        UPDATE RH.Users
        SET name='${name}',
            phone='${phone}',
            address='${address}',
            zip='${zip}',
            id_role='${id_role}',
            id_state='${id_state}',
            is_active='${is_active}',
            status='${status}',
            updated_at='${updated_at}',
            img_url='${img_url}',
            id_farm='${id_farm}',
            is_company='${is_company}'
          WHERE id_user='${id_user}'
          SELECT * FROM RH.Users WHERE id_user='${id_user}'
      END
      ELSE
      BEGIN
    INSERT RH.Users (
      id_user,
      name,
      email,
      password,
      phone,
      address,
      zip,
      id_role,
      created_at,
      id_state,
      is_active,
      status,
      updated_at,
      img_url,
      is_company,
      id_farm
    )
    VALUES (
      @const,
      '${name}',
      '${email}',
      '${passwordHash}',
      '${phone}',
      '${address}',
      '${zip}',
      '${id_role}',
      '${created_at}',
      '${id_state}',
      '${is_active}',
      '${status}',
      '${updated_at}',
      '${img_url}',
      '${is_company}',
      '${id_farm}'
    )
    SELECT * FROM RH.Users WHERE id_user=@const
    END
    `)) as unknown;

    const token = await createJWT((res as IUser[])[0].id_role, email);
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
      {
        status: 201,
        headers: {
          "content-type": "application/json; charset=utf-8",
          "Set-Cookie": `jwt=${token}; Max-Age=8640; Path=/`,
        },
      }
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
