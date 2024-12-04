import { mongoose } from 'mongoose';

import { mongoFullUrl } from '../../config/mongodb.js';
import { userTasksModel } from '../../models/userTasks.model.js';

export async function connectDB() {
    try {
        await mongoose.connect(mongoFullUrl);
    }
    catch (error) {
        console.error(error);
    }
};

export async function createUser(userEmail) {
    await userTasksModel.create({ 
        userEmail: userEmail, 
        tasks: [],
        lists: [] 
    });
}