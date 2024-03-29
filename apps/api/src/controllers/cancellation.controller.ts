import type { Request, Response } from "express";
import type { ICanceledAppointment } from "../interfaces";
import { CancellationService } from "../services";
import { cancellSchema } from "../validation/schemas";

export async function createCancellation(
  req: Request,
  res: Response,
): Promise<Response> {
  const { error, value } = cancellSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.message });

  const cancellationCreated = await CancellationService.createCancellation(
    value as ICanceledAppointment,
  );
  if (!cancellationCreated)
    return res.status(500).json({ error: "Error creating cancellation" });

  return res.status(200).json({
    ok: "Cancellation in progress. Sending email...",
    cancellationCreated,
  });
}
