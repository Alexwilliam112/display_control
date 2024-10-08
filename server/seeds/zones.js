require("dotenv").config();
const bcrypt = require("../utils/bcrypt");
const zoneData = require("../data/zones.json");
const { getDB, connect } = require("../config/mongo-connection");

const seedZones = async () => {
  try {
    await connect();

    const collectionName = "Zones";
    const db = getDB();
    const collection = db.collection(collectionName);

    await collection.insertMany(zoneData);
    console.log("Seeded Collection: Zones");
    return;
  } catch (error) {
    console.error("Error seeding Zones:", error);
  }
};

seedZones();
