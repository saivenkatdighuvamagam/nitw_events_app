import mongoose from 'mongoose';
export async function connectToDatabase(uri) {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(uri);
        // Connected
    }
    catch (error) {
        // Re-throw to be handled by caller
        throw error;
    }
}
