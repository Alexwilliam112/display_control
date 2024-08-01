const { getDB } = require("../config/mongo-connection");
const { ObjectId } = require("mongodb");

const getCollection = async () => {
  const collection = await getDB().collection("Zones");
  return collection;
};

module.exports = (() => {
  class Zone {
    static async getZones() {
      try {
        const collection = await getCollection()
        const result = await collection.find().toArray();
        return result;
      } catch (error) {
        throw error;
      }
    }
  }

  return Zone;
})();
