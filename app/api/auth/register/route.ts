import db from "@/database/connection";
import { ICompany } from "@/interfaces";
import { createJWT } from "../../../../utils";
import bcrypt from "bcrypt";

const query =`
    id_company,
    name,
    email,
    phone,
    address,
    zip,
    id_role,
    id_state,
    is_active,
    status
`

export const POST = async (req: Request) => {
  const body = await req.json();
  const { name, email, password, phone, address, zip,id_role,created_at,id_company,id_state,is_active,status,updated_at } =
    body as ICompany;

  try {
    const resp = await db.query(`
      SELECT email FROM RH.Companies WHERE email='${email}'`);

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
      SET @const=(SELECT isNull(max(id_company),0)+1  FROM RH.Companies)
      if ${id_company} > 0
      BEGIN
        UPDATE RH.Companies
        SET name='${name}',
            email='${email}',
            phone='${phone}',
            address='${address}',
            zip='${zip}',
            id_role='${id_role}',
            id_state='${id_state}',
            is_active='${is_active}',
            status='${status}',
            updated_at='${updated_at}'
          WHERE id_company='${id_company}'
          SELECT ${query} FROM RH.Companies WHERE id_company='${id_company}'
      END
      ELSE
      BEGIN
    INSERT RH.Companies (
      id_company,
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
      updated_at
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
      '${updated_at}'
    )
    SELECT ${query} FROM RH.Companies WHERE id_company=@const;
    END
    `)) as unknown;

    const token = await createJWT((res as ICompany[])[0].id_role, email);
    const user = (res as ICompany[]).map((user) => {
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
