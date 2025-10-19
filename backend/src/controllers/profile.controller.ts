import { Request, Response } from 'express';
import { Event } from '@models/Event';
import { StatusCodes } from 'http-status-codes';

export async function isLiked(req: Request, res: Response) {
  const { id } = req.params;
  const liked = false; // Placeholder: implement user-like storage
  return res.json(liked);
}

export async function addFavourite(req: Request, res: Response) {
  const { id } = req.params;
  await Event.findByIdAndUpdate(id, { $inc: { likes: 1 } });
  return res.status(StatusCodes.NO_CONTENT).send();
}

export async function removeFavourite(req: Request, res: Response) {
  const { id } = req.params;
  await Event.findByIdAndUpdate(id, { $inc: { likes: -1 } });
  return res.status(StatusCodes.NO_CONTENT).send();
}

export async function isSaved(_req: Request, res: Response) {
  const saved = false; // Placeholder
  return res.json(saved);
}

export async function saveEvent(req: Request, res: Response) {
  const { id } = req.params;
  await Event.findByIdAndUpdate(id, { $inc: { saves: 1 } });
  return res.status(StatusCodes.NO_CONTENT).send();
}

export async function unsaveEvent(req: Request, res: Response) {
  const { eventTitle } = req.query;
  await Event.findOneAndUpdate({ title: eventTitle }, { $inc: { saves: -1 } });
  return res.status(StatusCodes.NO_CONTENT).send();
}

export async function getFavouritesByUser(_req: Request, res: Response) {
  const events = await Event.find().lean();
  return res.json(events.map((e) => ({ ...e, id: e._id })));
}

export async function getAllSavedEvents(req: Request, res: Response) {
  const { userId } = req.query;
  const events = await Event.find().lean();
  return res.json(events.map((e) => ({ ...e, id: e._id })));
}

export async function getComments(req: Request, res: Response) {
  const { eventId } = req.params as any;
  const event = await Event.findById(eventId).lean();
  return res.json(event?.comments || []);
}

export async function postComment(req: Request, res: Response) {
  const { msg, user_id, event_id } = req.query as any;
  const username = (req as any).user?.name || 'User';
  const updated = await Event.findByIdAndUpdate(
    event_id,
    { $push: { comments: { userId: user_id, username, msg } } },
    { new: true }
  ).lean();
  return res.json(updated?.comments || []);
}
