import { Request, Response } from "express";
import * as ResourceService from "../services/Resource.service";

export async function getCategories(
  req: Request,
  res: Response
): Promise<Response> {
  const categories = await ResourceService.getCategories();
  if (!categories)
    return res.status(500).json({ error: "Error getting categories" });

  return res.status(200).json(categories);
}

export async function getDocuments(
  req: Request,
  res: Response
): Promise<Response> {
  const documents = await ResourceService.getDocuments();
  if (!documents)
    return res.status(500).json({ error: "Error getting documents" });

  return res.status(200).json(documents);
}

export async function getFaculties(
  req: Request,
  res: Response
): Promise<Response> {
  const faculties = await ResourceService.getFaculties();
  if (!faculties)
    return res.status(500).json({ error: "Error getting faculties" });

  return res.status(200).json(faculties);
}
