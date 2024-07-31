require("dotenv").config();
const bcrypt = require("../utils/bcrypt");
const usersData = require("../data/zones.json");
const { getDB, connect } = require("../config/mongo-connection");

const seedZones = async () => {
  try {
    await connect();

    const collectionName = "Zones";
    const db = getDB();
    const collection = db.collection(collectionName);

    const hashedUsers = usersData.map((user) => {
      const hashedPassword = bcrypt.hash(user.password);
      return { ...user, password: hashedPassword };
    });

    await collection.insertMany(hashedUsers);
    console.log("Seeded Collection: Zones");
    return;
  } catch (error) {
    console.error("Error seeding Zones:", error);
  }
};

seedZones();
