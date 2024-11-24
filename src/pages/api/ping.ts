// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   name: string;
// };

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>,
// ) {
//   res.status(200).json({ name: "John Doe" });
// }

import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../utils/database";

type Data = {
  message: string;
  time: string;
};

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const response = await conn.query("SELECT NOW()");

  // console.log(response);

  return res.json({ message: "pong", time: response.rows[0].now });
};
