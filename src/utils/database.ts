import { Pool } from "pg";

let conn: any;

if (!conn) {
  conn = new Pool({
    user: "postgres",
    password: "!nf0rm4t!k",
    host: "localhost",
    port: 5433,
    database: "nextjs",
  });
}

export { conn };

// "postgresql://postgres:!nf0rm4t!k@localhost:5433/Prisma?schema=public"
