import axios from "axios";
import { backendUrl } from "../../config/backend";

function jsTaskToMongoTask(task) {
    return {
        id: task.id,
        title: task.title,
        description: task.description,
        dueDatetime: `${task.dueDate}T${task.time}`,
        lists: task.lists,
        completed: task.completed
    };
}

function mongoTaskToJsTask(task) {
    const time = task.dueDatetime.split('T')[1].split(':')
    return {
        id: task.id,
        title: task.title,
        description: task.description,
        dueDate: task.dueDatetime.split('T')[0],
        time: `${time[0]}:${time[1]}`,
        lists: task.lists,
        completed: task.completed
    };
}

export function mongoCreateTask(userEmail, newTask) {
    const task = jsTaskToMongoTask(newTask);
    axios.post(`${backendUrl}/api/createTask`, 
        {
            userEmail: userEmail,
            task: task
        }
    );
}

export async function mongoReadTasks(userEmail) {
    const tasks = (await axios.get(`${backendUrl}/api/readTasks?userEmail=${userEmail}`)).data;
    const lists = (await axios.get(`${backendUrl}/api/readLists?userEmail=${userEmail}`)).data;
    return tasks.map(
        task => mongoTaskToJsTask(task, lists)
    );
}

export function mongoUpdateTask(userEmail, oldTaskId, newTask) {
    const task = jsTaskToMongoTask(newTask);
    axios.put(`${backendUrl}/api/updateTask`, 
        {
            userEmail: userEmail,
            oldTaskId: oldTaskId,
            newTask: task
        }
    );
}

export function mongoDeleteTask(userEmail, taskId) {
    axios.delete(`${backendUrl}/api/deleteTask?userEmail=${userEmail}&taskId=${taskId}`);
}