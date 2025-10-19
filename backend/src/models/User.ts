import mongoose, { Schema, Document, Model } from 'mongoose';

export type UserRole = 'ADMIN' | 'CLUB_SEC' | 'USER';

export interface UserDocument extends Document {
  name: string;
  email: string;
  passwordHash: string;
  roles: UserRole[];
  club?: string;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    roles: { type: [String], default: ['USER'] },
    club: { type: String },
  },
  { timestamps: true }
);

export const User: Model<UserDocument> = mongoose.models.User || mongoose.model<UserDocument>('User', userSchema);
