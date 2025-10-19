import { Request, Response } from 'express';
import { Event } from '@models/Event';
import { Club } from '@models/Club';

export async function getOverview(_req: Request, res: Response) {
  const [eventsCount, clubsCount] = await Promise.all([
    Event.countDocuments().exec(),
    Club.countDocuments().exec(),
  ]);
  return res.json({ eventsCount, clubsCount });
}
