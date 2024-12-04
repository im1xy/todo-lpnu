import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    dueDatetime: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    lists: {
        type: Array,
        required: true
    }
});

export default taskSchema;