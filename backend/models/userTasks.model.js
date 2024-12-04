import mongoose from "mongoose";

import { mongoCollection } from "../config/mongodb.js";

import taskSchema from "./task.model.js";
import listSchema from "./list.model.js";

const userTasksSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    tasks: [taskSchema],
    lists: [listSchema]
}, {
    timestamps: true
});

const userTasksModel = mongoose.model(mongoCollection, userTasksSchema);

export { userTasksModel, userTasksSchema };