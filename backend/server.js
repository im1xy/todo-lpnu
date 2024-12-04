import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import {
    createList,
    readLists,
    updateList,
    deleteList
} from './services/mongo/lists.js';

import {
    createTask,
    readTasks,
    updateTask,
    deleteTask
} from './services/mongo/tasks.js';

import { 
    connectDB,
    createUser,
} from './services/mongo/mongo.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const port = 3000;

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});

// GET
app.get('/api/readTasks', (req, res) => {
    readTasks(req.query.userEmail)
        .then(result => {
            res.status(200).json(result ? result.tasks : []);
        });
});

app.get('/api/readLists', (req, res) => {
    readLists(req.query.userEmail)
        .then(result => {
            res.status(200).json(result ? result.lists : []);
        });
});

// POST
app.post('/api/createUser', (req, res) => {
    createUser(req.body.userEmail);
    res.status(201).json({ success: true });
});

app.post('/api/createTask', (req, res) => {
    createTask(req.body.userEmail, req.body.task);
    res.status(201).json({ success: true });
});

app.post('/api/createList', (req, res) => {
    createList(req.body.userEmail, req.body.list);
    res.status(201).json({ success: true });
});

// PUT
app.put('/api/updateTask', (req, res) => {
    updateTask(req.body.userEmail, req.body.oldTaskId, req.body.newTask);
    res.status(200).json({ success: true });
});

app.put('/api/updateList', (req, res) => {
    updateList(req.body.userEmail, req.body.oldListId, req.body.newList);
    res.status(200).json({ success: true });
});

// DELETE
app.delete('/api/deleteTask', (req, res) => {
    deleteTask(req.query.userEmail, req.query.taskId);
    res.status(200).json({ success: true });
});

app.delete('/api/deleteList', (req, res) => {
    deleteList(req.query.userEmail, req.query.listId);
    res.status(200).json({ success: true });
});