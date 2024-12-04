import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

export default listSchema;