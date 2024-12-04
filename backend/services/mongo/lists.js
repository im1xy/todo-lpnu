import { userTasksModel } from '../../models/userTasks.model.js';

export async function createList(userEmail, newList) {
    await userTasksModel.updateOne(
        { userEmail: userEmail },
        { $push: { lists: newList } },
    );
}

export async function readLists(userEmail) {
    return await userTasksModel.findOne({ userEmail: userEmail });
}

export async function updateList(userEmail, oldListId, newList) {
    await userTasksModel.updateOne(
        { userEmail: userEmail, "lists.id": oldListId },
        { $set: {
            "lists.$": newList
        }}
    );
}

export async function deleteList(userEmail, listId) {
    await userTasksModel.updateOne(
        { userEmail: userEmail },
        { $pull: { lists: { id: listId } } }
    );
}