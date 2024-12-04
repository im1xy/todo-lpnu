import dotenv from 'dotenv';

dotenv.config();

const mongoUrl = process.env.MONGO_URL;
const mongoDb = process.env.MONGO_DB;
const mongoCollection = process.env.MONGO_COLLECTION;
const mongoFullUrl = `mongodb://${mongoUrl}/${mongoDb}`;

export { mongoUrl, mongoDb, mongoCollection, mongoFullUrl };