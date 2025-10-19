import mongoose, { Schema } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    roles: { type: [String], default: ['USER'] },
    club: { type: String },
}, { timestamps: true });
export const User = mongoose.models.User || mongoose.model('User', userSchema);
