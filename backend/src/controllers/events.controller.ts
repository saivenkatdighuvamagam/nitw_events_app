import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { Event } from '@models/Event';
import { StatusCodes } from 'http-status-codes';

export async function createEvent(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });

  const { title, description, date, time, venue, venueDescription, club, formLink } = req.body as any;
  const image = (req.file as Express.Multer.File | undefined)?.buffer;
  const event = await Event.create({ title, description, date, time, venue, venueDescription, club, formLink, image });
  return res.status(StatusCodes.CREATED).json(event);
}

export async function updateEvent(req: Request, res: Response) {
  const { id } = req.params;
  const update: any = { ...req.body };
  if ((req.file as Express.Multer.File | undefined)?.buffer) {
    update.image = (req.file as Express.Multer.File).buffer;
  }
  const event = await Event.findByIdAndUpdate(id, update, { new: true });
  return res.json(event);
}

export async function deleteEvent(req: Request, res: Response) {
  const { id } = req.params;
  await Event.findByIdAndDelete(id);
  return res.status(StatusCodes.NO_CONTENT).send();
}

export async function viewEvents(_req: Request, res: Response) {
  const events = await Event.find().lean();
  return res.json(events.map((e) => ({ ...e, id: e._id })));
}

export async function ongoingEvents(_req: Request, res: Response) {
  const events = await Event.find().lean();
  return res.json(events.map((e) => ({ ...e, id: e._id })));
}
