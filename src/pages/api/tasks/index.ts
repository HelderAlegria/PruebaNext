import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../utils/database";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const query = "SELECT * FROM EMPLEADO";
        const response = await conn.query(query);

        // console.log(response);

        return res.status(200).json(response.rows);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }

    case "POST":
      try {
        const { nombre, direccion } = body;

        const query =
          "INSERT INTO EMPLEADO(NOMBRE, DIRECCION) VALUES($1, $2) RETURNING *";
        const values = [nombre, direccion];

        const response = await conn.query(query, values);

        return res.status(200).json(response.rows[0]);
      } catch (error: any) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json("metodo invalido");
  }
};
