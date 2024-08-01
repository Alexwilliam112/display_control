require("dotenv").config();
const displayData = require("../data/displaySessions.json");
const { getDB, connect } = require("../config/mongo-connection");

const seedZones = async () => {
  try {
    await connect();

    const collectionName = "DisplaySessions";
    const db = getDB();
    const collection = db.collection(collectionName);

    await collection.insertMany(displayData);
    console.log("Seeded Collection: DisplaySessions");
    return;
  } catch (error) {
    console.error("Error seeding DisplaySessions", error);
  }
};

seedZones();
