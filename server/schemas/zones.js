const { GraphQLError } = require("graphql");
const Zone = require("../models/zone");

module.exports = {
  zoneTypes: `#graphql
    type Zone {
      _id: ID
      zoneName: String
    }

    type ZoneData {
      zones: [Zone]
    }

    type Query {
      getZones: ZoneData
    }
	`,

  zoneResolvers: {
    Query: {
      getZones: async () => {
        const zoneData = await Zone.getZones();
        return { zones: zoneData };
      },
    },
  },
};
