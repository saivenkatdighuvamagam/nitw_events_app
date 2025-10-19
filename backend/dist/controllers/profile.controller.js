import { Event } from '@models/Event';
import { StatusCodes } from 'http-status-codes';
export async function isLiked(req, res) {
    const { id } = req.params;
    const liked = false; // Placeholder: implement user-like storage
    return res.json(liked);
}
export async function addFavourite(req, res) {
    const { id } = req.params;
    await Event.findByIdAndUpdate(id, { $inc: { likes: 1 } });
    return res.status(StatusCodes.NO_CONTENT).send();
}
export async function removeFavourite(req, res) {
    const { id } = req.params;
    await Event.findByIdAndUpdate(id, { $inc: { likes: -1 } });
    return res.status(StatusCodes.NO_CONTENT).send();
}
export async function isSaved(_req, res) {
    const saved = false; // Placeholder
    return res.json(saved);
}
export async function saveEvent(req, res) {
    const { id } = req.params;
    await Event.findByIdAndUpdate(id, { $inc: { saves: 1 } });
    return res.status(StatusCodes.NO_CONTENT).send();
}
export async function unsaveEvent(req, res) {
    const { eventTitle } = req.query;
    await Event.findOneAndUpdate({ title: eventTitle }, { $inc: { saves: -1 } });
    return res.status(StatusCodes.NO_CONTENT).send();
}
export async function getFavouritesByUser(_req, res) {
    const events = await Event.find().lean();
    return res.json(events.map((e) => ({ ...e, id: e._id })));
}
export async function getAllSavedEvents(req, res) {
    const { userId } = req.query;
    const events = await Event.find().lean();
    return res.json(events.map((e) => ({ ...e, id: e._id })));
}
export async function getComments(req, res) {
    const { eventId } = req.params;
    const event = await Event.findById(eventId).lean();
    return res.json(event?.comments || []);
}
export async function postComment(req, res) {
    const { msg, user_id, event_id } = req.query;
    const username = req.user?.name || 'User';
    const updated = await Event.findByIdAndUpdate(event_id, { $push: { comments: { userId: user_id, username, msg } } }, { new: true }).lean();
    return res.json(updated?.comments || []);
}
