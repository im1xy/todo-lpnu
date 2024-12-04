import { userTasksModel } from '../../models/userTasks.model.js';

export async function createTask(userEmail, newTask) {
    await userTasksModel.updateOne(
        { userEmail: userEmail },
        { $push: { tasks: newTask } },
    );
}

export async function readTasks(userEmail) {
    return await userTasksModel.findOne({ userEmail: userEmail });
}

export async function updateTask(userEmail, oldTaskId, newTask) {
    await userTasksModel.updateOne(
        { userEmail: userEmail, "tasks.id": oldTaskId },
        { $set: {
            "tasks.$": newTask
        }}
    );
}

export async function deleteTask(userEmail, taskId) {
    await userTasksModel.updateOne(
        { userEmail: userEmail },
        { $pull: { tasks: { id: taskId } } }
    );
}