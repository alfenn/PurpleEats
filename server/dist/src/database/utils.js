"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findTopRating = exports.findAverageRating = exports.aggregate = exports.deleteMany = exports.updateOne = exports.findOne = exports.find = exports.insertOne = void 0;
const client_1 = __importDefault(require("./client"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function getCollectionObject(collection) {
    return client_1.default.db(process.env.MONGODB_DB_NAME).collection(collection);
}
// https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne/#mongodb-method-db.collection.insertOne
async function insertOne(collection, document) {
    try {
        const collectionObject = getCollectionObject(collection);
        const response = await collectionObject.insertOne(document);
        return response;
    }
    catch (e) {
        console.error(e);
    }
}
exports.insertOne = insertOne;
// https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find
async function find(collection, query = {}, projection, options) {
    try {
        const collectionObject = getCollectionObject(collection);
        const response = await collectionObject.find(query).toArray();
        return response;
    }
    catch (e) {
        console.error(e);
    }
}
exports.find = find;
async function findOne(collection, query = {}, projection, options) {
    try {
        const collectionObject = await getCollectionObject(collection);
        const response = await collectionObject.findOne(query);
        return response;
    }
    catch (err) {
        console.error(err);
    }
}
exports.findOne = findOne;
// https://www.mongodb.com/docs/manual/reference/method/db.collection.updateOne/#mongodb-method-db.collection.updateOne
async function updateOne(collection, filter, update, options) {
    try {
        const collectionObject = getCollectionObject(collection);
        const response = await collectionObject.updateOne(filter, update, options);
        return response;
    }
    catch (e) {
        console.error(e);
    }
}
exports.updateOne = updateOne;
// https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteOne/#mongodb-method-db.collection.deleteOne
async function deleteMany(collection, filter) {
    try {
        const collectionObject = getCollectionObject(collection);
        const response = await collectionObject.deleteMany(filter);
        return response;
    }
    catch (e) {
        console.error(e);
    }
}
exports.deleteMany = deleteMany;
async function aggregate(collection, pipeline, options) {
    try {
        const collectionObject = getCollectionObject(collection);
        const response = await collectionObject.aggregate(pipeline, options).toArray();
        return response;
    }
    catch (e) {
        console.error(e);
    }
}
exports.aggregate = aggregate;
//for a given dining hall, find the top and avg rating
async function findAverageRating(collection, diningHall) {
    const collectionObject = getCollectionObject(collection);
    const avg_arr = await collectionObject.aggregate([
        {
            $group: {
                _id: "$dining_hall",
                averageRating: { $avg: "$rating" }
            }
        }
    ]).toArray();
    const arr_val = avg_arr.filter((el) => {
        return el._id == diningHall;
    });
    // console.log("average rating:",arr_val,avg_arr);
    if (arr_val.length === 0) {
        return null;
    }
    return arr_val[0].averageRating;
}
exports.findAverageRating = findAverageRating;
async function findTopRating(collection, Hall) {
    try {
        const collectionObject = getCollectionObject(collection);
        const find_res = await collectionObject.find({ "dining_hall": Hall });
        const top_object = await find_res.sort({ rating: -1 }).limit(1).toArray();
        if (top_object.length === 0) {
            return null;
        }
        const top_rating = top_object[0];
        return top_rating;
    }
    catch (err) {
        console.log(err.message);
    }
}
exports.findTopRating = findTopRating;
