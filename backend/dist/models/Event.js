import mongoose, { Schema } from 'mongoose';
const eventSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    venueDescription: { type: String },
    club: { type: String, required: true },
    formLink: { type: String },
    image: { type: Buffer },
    likes: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
    category: { type: String },
    comments: [
        {
            id: { type: Schema.Types.ObjectId, auto: true },
            userId: { type: Schema.Types.ObjectId, ref: 'User' },
            username: { type: String },
            msg: { type: String, required: true },
        },
    ],
    leaderboard: [
        {
            userId: { type: Schema.Types.ObjectId, ref: 'User' },
            score: { type: Number, default: 0 },
        },
    ],
}, { timestamps: true });
export const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);
