import type { RowDataPacket } from "mysql2";
import { connect } from "../db";
import type { IDocument } from "../interfaces";

export async function getDocuments(): Promise<Array<IDocument> | null> {
  const conn = connect();
  if (!conn) return null;
  const [rows] = await conn.query<Array<RowDataPacket>>(
    "SELECT * FROM Documents",
  );
  await conn.end();
  return rows as Array<IDocument>;
}
