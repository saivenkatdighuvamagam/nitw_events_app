import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { Event } from '@models/Event';
// Using Event model to represent recruitment posts as well
export async function postRecruitment(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    const { title, description, date, time, venue, venueDescription, club, formLink } = req.body;
    const image = req.file?.buffer;
    const recruitment = await Event.create({ title, description, date, time, venue, venueDescription, club, formLink, image });
    return res.status(StatusCodes.CREATED).json(recruitment);
}
export async function getAllRecruitments(_req, res) {
    const recruitments = await Event.find().lean();
    return res.json(recruitments.map((r) => ({ ...r, id: r._id })));
}
export async function getRecruitment(req, res) {
    const { id } = req.params;
    const rec = await Event.findById(id).lean();
    if (!rec)
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' });
    return res.json({ ...rec, id: rec._id });
}
export async function updateRecruitment(req, res) {
    const { id } = req.params;
    const update = { ...req.body };
    const uploaded = req.file?.buffer;
    if (uploaded) {
        update.image = uploaded;
    }
    const rec = await Event.findByIdAndUpdate(id, update, { new: true }).lean();
    if (!rec)
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' });
    return res.json({ ...rec, id: rec._id });
}
export async function deleteRecruitment(req, res) {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    return res.status(StatusCodes.NO_CONTENT).send();
}
