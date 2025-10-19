import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Club } from '@models/Club';
import { StatusCodes } from 'http-status-codes';

export async function createClub(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });

  const { name, description } = req.body as { name: string; description?: string };
  const existing = await Club.findOne({ name });
  if (existing) return res.status(StatusCodes.CONFLICT).json({ message: 'Club already exists' });

  const club = await Club.create({ name, description, createdBy: req.user!.userId });
  return res.status(StatusCodes.CREATED).json(club);
}

export async function deleteClub(req: Request, res: Response) {
  const { clubId } = req.params;
  await Club.findByIdAndDelete(clubId);
  return res.status(StatusCodes.NO_CONTENT).send();
}

export async function listClubs(_req: Request, res: Response) {
  const clubs = await Club.find().lean();
  return res.json(clubs);
}
