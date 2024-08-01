require("dotenv").config();
const bcrypt = require("../utils/bcrypt");
const articleData = require("../data/articles.json");
const { getDB, connect } = require("../config/mongo-connection");

const seedZones = async () => {
  try {
    await connect();

    const collectionName = "Articles";
    const db = getDB();
    const collection = db.collection(collectionName);

    await collection.insertMany(articleData);
    console.log("Seeded Collection: Articles");
    return;
  } catch (error) {
    console.error("Error seeding Articles:", error);
  }
};

seedZones();
