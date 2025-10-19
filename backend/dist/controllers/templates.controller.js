import { validationResult } from 'express-validator';
import { EventTemplate } from '@models/EventTemplate';
import { StatusCodes } from 'http-status-codes';
export async function createTemplate(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    const { name, fields } = req.body;
    const template = await EventTemplate.create({ name, fields, createdBy: req.user.userId });
    return res.status(StatusCodes.CREATED).json(template);
}
export async function listTemplates(req, res) {
    const templates = await EventTemplate.find({ createdBy: req.user.userId }).lean();
    return res.json(templates);
}
