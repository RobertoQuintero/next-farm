import jwt from "jsonwebtoken";

export const createJWT = (id_role: number, email: string) => {
  return new Promise((resolve, reject) => {
    const payload = { id_role, email };

    jwt.sign(
      payload,
      process.env.JWT_SECRET_SEED!,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }
        resolve(token);
      }
    );
  });
};

export const isValidToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error("No hay semilla de JWT");
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_SEED || "", (err, payload) => {
        if (err) return reject("JWT no es válido");
        const { email, id_role } = payload as { email: string; id_role: number };
        resolve(JSON.stringify({ email, id_role }));
      });
    } catch (error) {
      reject("JWT no es válido");
    }
  });
};

export const serverError='Error en el servidor al intentar conectar con la base de datos'