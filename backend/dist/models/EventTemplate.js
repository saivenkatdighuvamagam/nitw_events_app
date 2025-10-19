import mongoose, { Schema } from 'mongoose';
const eventTemplateSchema = new Schema({
    name: { type: String, required: true },
    fields: [
        {
            key: { type: String, required: true },
            label: { type: String, required: true },
            required: { type: Boolean, default: false },
        },
    ],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
export const EventTemplate = mongoose.models.EventTemplate || mongoose.model('EventTemplate', eventTemplateSchema);
