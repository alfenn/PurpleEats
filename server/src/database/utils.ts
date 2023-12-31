import databaseClient from "./client";
import dotenv from 'dotenv';

dotenv.config();

function getCollectionObject(collection: string) {
  return databaseClient.db(process.env.MONGODB_DB_NAME).collection(collection);
}

// https://www.mongodb.com/docs/manual/reference/method/db.collection.insertOne/#mongodb-method-db.collection.insertOne
async function insertOne(collection: string, document: any) {
  try {
    const collectionObject = getCollectionObject(collection);

    const response = await collectionObject.insertOne(document);

    return response;
  }
  catch (e) {
    console.error(e);
  }
}

// https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find
async function find(collection: string, query={}, projection?:any, options?:any) {
  try {
    const collectionObject = getCollectionObject(collection);
    
    const response = await collectionObject.find(
      query
    ).toArray();

    return response;
  }
  catch (e) {
    console.error(e);
  }
}

async function findOne(collection: string, query={}, projection?: any, options?: any) {
  try {
    const collectionObject = await getCollectionObject(collection);

    const response = await collectionObject.findOne(query);

    return response;
  }
  catch (err) {
    console.error(err);
  }
}

// https://www.mongodb.com/docs/manual/reference/method/db.collection.updateOne/#mongodb-method-db.collection.updateOne
async function updateOne(collection: string, filter: any, update: any, options?: any) {
  try {
    const collectionObject = getCollectionObject(collection);

    const response = await collectionObject.updateOne(
      filter,
      update,
      options
    );
    
    return response;
  }
  catch (e) {
    console.error(e);
  }
}

// https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteOne/#mongodb-method-db.collection.deleteOne
async function deleteMany(collection: string, filter:any) {
  try {
    const collectionObject = getCollectionObject(collection);

    const response = await collectionObject.deleteMany(filter);

    return response;
  }
  catch (e) {
    console.error(e);
  }
}

async function aggregate(collection: string, pipeline, options?: any) {
  try {
    const collectionObject = getCollectionObject(collection);

    const response = await collectionObject.aggregate(pipeline, options).toArray();

    return response;
  }
  catch (e) {
    console.error(e);
  }
}
//for a given dining hall, find the top and avg rating
async function findAverageRating(collection: string, diningHall: string) {
  const collectionObject = getCollectionObject(collection);
  const avg_arr = await collectionObject.aggregate(
    [
      {
        $group: {
          _id: "$dining_hall",
          averageRating: { $avg: "$rating" }
        }
      }
    ]).toArray()
  
  const arr_val = avg_arr.filter((el:any) => {
    return el._id == diningHall;
  });

  // console.log("average rating:",arr_val,avg_arr);
  if (arr_val.length === 0) {
    return null;
  }

  return arr_val[0].averageRating;
}

async function findTopRating(collection: string, Hall: string) {
  try {
    const collectionObject = getCollectionObject(collection);
    const find_res = await collectionObject.find({"dining_hall":Hall});

    const top_object = await find_res.sort({rating:-1}).limit(1).toArray();

    if (top_object.length === 0) {
      return null;
    }

    const top_rating = top_object[0];

    return top_rating;
  }
  catch(err:any){
    console.log(err.message);
  }

}

export { insertOne, find, findOne, updateOne, deleteMany, aggregate, findAverageRating, findTopRating}