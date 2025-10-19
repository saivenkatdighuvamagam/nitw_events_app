import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { EventTemplate } from '@models/EventTemplate';
import { StatusCodes } from 'http-status-codes';

export async function createTemplate(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });

  const { name, fields } = req.body as { name: string; fields: Array<{ key: string; label: string; required: boolean }> };
  const template = await EventTemplate.create({ name, fields, createdBy: req.user!.userId });
  return res.status(StatusCodes.CREATED).json(template);
}

export async function listTemplates(req: Request, res: Response) {
  const templates = await EventTemplate.find({ createdBy: req.user!.userId }).lean();
  return res.json(templates);
}
