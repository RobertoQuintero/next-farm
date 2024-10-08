import db from "@/database/connection";
import { IUser } from "@/interfaces/user";
import { createJWT, serverError } from "@/utils";
import bcrypt from "bcrypt";
import { cookies } from 'next/headers'

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
  const { password, email } = body as IUser;
  try {
    const user = await db.query(`
      SELECT * FROM RH.Users WHERE email='${email||''}' and status='true' 
    `);

    if (!user.length) {
      return Response.json({
        ok: false,
        data: "No existe un usuario con ese correo",
      },
      { status: 400 }
      );
    }

    const validaPassword = bcrypt.compareSync(password||'', user[0].password);

    if (!validaPassword) {
      return Response.json(
        {
          ok: false,
          data: "Email o Password inválidos",
        },
        { status: 401 }
      );
    }

    const token = await createJWT(user[0].id_role, email);

    const {
      created_at,
      updated_at,
      password: pass,
      ...rest
    } = user[0] as  IUser;

    cookies().set('id_role', `${user[0].id_role}`)
    cookies().set('jwt', `${token}`)
    return Response.json(
      {
        ok: true,
        data: rest
      },
      {
        headers: {
          "content-type": "application/json; charset=utf-8",
          // "Set-Cookie": `jwt=${token}; Max-Age=8640; Path=/;`,
        },
      }
    );
  } catch (error) {
    console.log({ error });
    return Response.json(
      {
        ok: false,
        data: serverError,
      },
      { status: 500 }
    );
  }
};
