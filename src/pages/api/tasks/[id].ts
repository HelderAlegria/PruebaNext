import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../utils/database";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query, body } = req;

  switch (method) {
    //-*-*-*-*-*-*-*-*-*-*-*-*-*- CONSULTA *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

    case "GET":
      try {
        const text = "SELECT * FROM EMPLEADO WHERE id_empleado = $1";
        const values = [query.id];
        const results = await conn.query(text, values);

        if (results.rows.length === 0)
          return res.status(404).json({ message: "Empleado no existe" });

        return res.json(results.rows[0]);
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }
    //-*-*-*-*-*-*-*-*-*-*-*-*-*- ACTUALIZA *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
    case "PUT":
      try {
        const { nombre, direccion } = body;

        const text =
          "UPDATE EMPLEADO SET NOMBRE = $1, DIRECCION = $2 WHERE id_empleado = $3 RETURNING *";
        const values = [nombre, direccion, query.id];
        const results = await conn.query(text, values);

        if (results.rows.length === 0)
          return res.status(404).json({ message: "Empleado no existe" });

        return res.json(results.rows[0]);
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }

    //-*-*-*-*-*-*-*-*-*-*-*-*-*- ELIMINA *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-

    case "DELETE":
      try {
        const text = "DELETE FROM EMPLEADO WHERE id_empleado = $1 RETURNING *";
        const values = [query.id];
        const results = await conn.query(text, values);

        if (results.rowCount === 0)
          return res.status(404).json({ message: "Empleado no existe" });

        return res.json(results.rows[0]);
      } catch (error: any) {
        return res.status(500).json({ error: error.message });
      }

    default:
      return res.status(400).json("Metho not allowed");
  }
};
