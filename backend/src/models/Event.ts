import mongoose, { Schema, Document, Model } from 'mongoose';

export interface EventDocument extends Document {
  title: string;
  description: string;
  date: string; // store as ISO string
  time: string;
  venue: string;
  venueDescription?: string;
  club: string; // club name (for now)
  formLink?: string;
  image?: Buffer; // base64-encoded image storage (not ideal for prod)
  likes?: number;
  saves?: number;
  leaderboard?: Array<{ userId: mongoose.Types.ObjectId; score: number }>;
}

const eventSchema = new Schema<EventDocument>(
  {
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
    leaderboard: [
      {
        userId: { type: Schema.Types.ObjectId, ref: 'User' },
        score: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

export const Event: Model<EventDocument> = mongoose.models.Event || mongoose.model<EventDocument>('Event', eventSchema);
