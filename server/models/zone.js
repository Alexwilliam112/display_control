const { getDB } = require("../config/mongo-connection");
const { ObjectId } = require("mongodb");

const collectionName = "Zones";
const db = getDB();
const collection = db.collection(collectionName);

module.exports = (() => {
  class Zone {
    static async getZones() {
      try {
        const result = await collection.find().toArray();
        return result;
      } catch (error) {
        throw error;
      }
    }
  }

  return Zone;
})();
