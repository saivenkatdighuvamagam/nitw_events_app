import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { Event } from '@models/Event';

// Using Event model to represent recruitment posts as well
export async function postRecruitment(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });

  const { title, description, date, time, venue, venueDescription, club, formLink } = req.body as any;
  const image = (req.file as Express.Multer.File | undefined)?.buffer;
  const recruitment = await Event.create({ title, description, date, time, venue, venueDescription, club, formLink, image });
  return res.status(StatusCodes.CREATED).json(recruitment);
}

export async function getAllRecruitments(_req: Request, res: Response) {
  const recruitments = await Event.find().lean();
  return res.json(recruitments.map((r) => ({ ...r, id: r._id })));
}

export async function getRecruitment(req: Request, res: Response) {
  const { id } = req.params;
  const rec = await Event.findById(id).lean();
  if (!rec) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' });
  return res.json({ ...rec, id: rec._id });
}

export async function updateRecruitment(req: Request, res: Response) {
  const { id } = req.params;
  const update: any = { ...req.body };
  if ((req.file as Express.Multer.File | undefined)?.buffer) {
    update.image = (req.file as Express.Multer.File).buffer;
  }
  const rec = await Event.findByIdAndUpdate(id, update, { new: true }).lean();
  if (!rec) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' });
  return res.json({ ...rec, id: rec._id });
}

export async function deleteRecruitment(req: Request, res: Response) {
  const { id } = req.params;
  await Event.findByIdAndDelete(id);
  return res.status(StatusCodes.NO_CONTENT).send();
}
