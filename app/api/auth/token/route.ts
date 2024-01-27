import db from "@/database/connection";
import { IUser } from "@/interfaces";
import { createJWT, isValidToken, serverError } from "@/utils";
import { cookies } from "next/headers";

export const GET = async (req: Request) => {
  const cookieStore = cookies();
  const token = cookieStore.get("jwt");
  if (!token) {
    return Response.json(
      {
        ok: false,
        data: "No hay token en la petición",
      },
      {
        status: 401,
      }
    );
  }
  let email = "";
  try {
    const jwtPayload = await isValidToken(token.value),
      jsonPayload = JSON.parse(jwtPayload) as { id_role: number; email: string };
    email = jsonPayload.email;
  } catch (error) {
    console.log({ error });
    return Response.json(
      {
        ok: false,
        data: error,
      },
      {
        status: 401,
      }
    );
  }

  try {
    const response = await db.query(`
      SELECT * FROM RH.Users WHERE email='${email}'
    `);

    if (!response.length) {
      return Response.json({
        ok: false,
        data: "No existe un usuario con ese correo",
      });
    }
    const token = await createJWT(response[0].id_role, email);
    const {
      password: pass,
      ...rest
    } = response[0] as IUser;

    return Response.json(
      {
        ok: true,
        data: rest,
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
        ok: true,
        data: serverError,
      },
      {
        status: 500,
      }
    );
  }
};
