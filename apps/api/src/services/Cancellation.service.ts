import type { ResultSetHeader } from "mysql2";
import { connect } from "../db";
import type { ICanceledAppointment } from "../interfaces";

export async function createCancellation(
  cancellation: ICanceledAppointment,
): Promise<ICanceledAppointment | null> {
  const conn = connect();
  if (!conn) return null;
  const [result] = await conn.query<ResultSetHeader>(
    "INSERT INTO CanceledAppointments SET ?",
    [cancellation],
  );
  await conn.end();
  return result.affectedRows > 0 ? cancellation : null;
}
