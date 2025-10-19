import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ClubDocument extends Document {
  name: string;
  description?: string;
  createdBy: mongoose.Types.ObjectId; // User id
  members: mongoose.Types.ObjectId[]; // Users
}

const clubSchema = new Schema<ClubDocument>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

export const Club: Model<ClubDocument> = mongoose.models.Club || mongoose.model<ClubDocument>('Club', clubSchema);
