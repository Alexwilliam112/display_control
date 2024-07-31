const { getDB } = require("../config/mongo-connection");
const { ObjectId } = require("mongodb");

const collectionName = "DisplaySessions";
const db = getDB();
const collection = db.collection(collectionName);

module.exports = (() => {
  class DisplaySession {
    static async getActive() {
      try {
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
        const result = await collection.insertMany(documents);
        return result;
      } catch (error) {
        throw error;
      }
    }

    static async closeDisplay(documents) {
      try {
        const currentDate = new Date();

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

    static async getAll() {
      try {
        const result = await collection
          .aggregate([
            {
              $lookup: {
                from: "Articles",
                localField: "article",
                foreignField: "article",
                as: "articleData",
              },
            },
            {
              $unwind: "$articleData",
            },
            {
              $lookup: {
                from: "Zones",
                localField: "zone",
                foreignField: "zoneName",
                as: "zoneData",
              },
            },
            {
              $unwind: "$zoneData",
            },
            {
              $group: {
                _id: {
                  category: "$category",
                  subcategory: "$subcategory",
                  article: "$article",
                  zone: "$zone",
                  color: "$color",
                },
                startDate: { $first: "$startDate" },
                endDate: { $first: "$endDate" },
                articleData: { $first: "$articleData" },
                zoneData: { $first: "$zoneData" },
              },
            },
            {
              $group: {
                _id: {
                  category: "$_id.category",
                  subcategory: "$_id.subcategory",
                  article: "$_id.article",
                  zone: "$_id.zone",
                },
                colors: {
                  $push: {
                    color: "$_id.color",
                    displayed: {
                      $cond: {
                        if: { $eq: ["$endDate", null] },
                        then: true,
                        else: false,
                      },
                    },
                  },
                },
                articleData: { $first: "$articleData" },
                zoneData: { $first: "$zoneData" },
              },
            },
            {
              $group: {
                _id: {
                  category: "$_id.category",
                  subcategory: "$_id.subcategory",
                  article: "$_id.article",
                },
                zones: {
                  $push: {
                    zone: "$_id.zone",
                    displayed: { $max: "$colors.displayed" },
                    colors: "$colors",
                  },
                },
                articleData: { $first: "$articleData" },
              },
            },
            {
              $project: {
                _id: 0,
                category: "$_id.category",
                subcategory: "$_id.subcategory",
                article: "$_id.article",
                zones: 1,
              },
            },
          ])
          .toArray();

        return result;
      } catch (error) {
        throw error;
      }
    }
  }

  return DisplaySession;
})();
