import db from "@/database/connection";
import { ICompany } from "@/interfaces";
import { IUser } from "@/interfaces/user";
import { createJWT, serverError } from "@/utils";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  const body = await req.json();
  const { password, email ,type} = body as { password: string; email: string;type:number };
  try {
    const user = await db.query(`
      SELECT * FROM RH.${type===2?'Companies':'Users'} WHERE email='${email}' and status='true' and is_active='true'
    `);

    if (!user.length) {
      return Response.json({
        ok: false,
        data: "No existe un usuario con ese correo",
      },
      { status: 400 }
      );
    }

    const validaPassword = bcrypt.compareSync(password, user[0].password);

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
      status,
      ...rest
    } = user[0] as ICompany | IUser;

    console.log(rest)

    return Response.json(
      {
        ok: true,
        data: rest
      },
      {
        headers: {
          "content-type": "application/json; charset=utf-8",
          "Set-Cookie": `jwt=${token}; Max-Age=8640; Path=/`,
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
