import mongoose, { Schema } from 'mongoose';
const clubSchema = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
export const Club = mongoose.models.Club || mongoose.model('Club', clubSchema);
