import { validationResult } from 'express-validator';
import { Event } from '@models/Event';
import { StatusCodes } from 'http-status-codes';
export async function createEvent(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    const { title, description, date, time, venue, venueDescription, club, formLink } = req.body;
    const image = req.file?.buffer;
    const event = await Event.create({ title, description, date, time, venue, venueDescription, club, formLink, image });
    return res.status(StatusCodes.CREATED).json(event);
}
export async function updateEvent(req, res) {
    const { id } = req.params;
    const update = { ...req.body };
    const uploaded = req.file?.buffer;
    if (uploaded) {
        update.image = uploaded;
    }
    const event = await Event.findByIdAndUpdate(id, update, { new: true });
    return res.json(event);
}
export async function deleteEvent(req, res) {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    return res.status(StatusCodes.NO_CONTENT).send();
}
export async function viewEvents(_req, res) {
    const events = await Event.find().lean();
    return res.json(events.map((e) => ({ ...e, id: e._id })));
}
export async function ongoingEvents(_req, res) {
    const events = await Event.find().lean();
    return res.json(events.map((e) => ({ ...e, id: e._id })));
}
