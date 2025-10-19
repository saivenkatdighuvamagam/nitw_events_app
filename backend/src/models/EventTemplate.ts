import mongoose, { Schema, Document, Model } from 'mongoose';

export interface EventTemplateDocument extends Document {
  name: string;
  fields: Array<{ key: string; label: string; required: boolean }>;
  createdBy: mongoose.Types.ObjectId; // ClubLeader user id
}

const eventTemplateSchema = new Schema<EventTemplateDocument>(
  {
    name: { type: String, required: true },
    fields: [
      {
        key: { type: String, required: true },
        label: { type: String, required: true },
        required: { type: Boolean, default: false },
      },
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const EventTemplate: Model<EventTemplateDocument> =
  mongoose.models.EventTemplate || mongoose.model<EventTemplateDocument>('EventTemplate', eventTemplateSchema);
