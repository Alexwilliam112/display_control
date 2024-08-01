const { getDB } = require("../config/mongo-connection");

const getCollection = async () => {
  const collection = await getDB().collection("DisplaySessions");
  return collection;
};

module.exports = (() => {
  class DisplaySession {
    static async getActive() {
      try {
        const collection = await getCollection();
        const result = await collection.find({ endDate: null }).toArray();
        return result;
      } catch (error) {
        throw error;
      }
    }

    static async openDisplay(documents) {
      try {
        documents = documents.map((document) => {
          document.startDate = new Date();
          document.endDate = null;
          return document;
        });

        const collection = await getCollection();
        const result = await collection.insertMany(documents);
        return result;
      } catch (error) {
        throw error;
      }
    }

    static async closeDisplay(documents) {
      try {
        const currentDate = new Date();
        const collection = await getCollection();

        const updatePromises = documents.map((identifier) => {
          return collection.updateMany(
            {
              article: identifier.article,
              color: identifier.color,
              zone: identifier.zone,
              endDate: null,
            },
            {
              $set: { endDate: currentDate },
            }
          );
        });

        await Promise.all(updatePromises);
        return;
      } catch (error) {
        throw error;
      }
    }
  }

  return DisplaySession;
})();
