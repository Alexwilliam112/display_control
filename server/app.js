if (process.env.NODE_ENV !== "production") {
  console.log("Environment is not production");
  require("dotenv").config();
}

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const { connect, getDB } = require("./config/mongo-connection");
const { authentication } = require("./middlewares/authentication");
const { userTypes, userResolvers } = require("./schemas/user");
const { displayTypes, displayResolvers } = require("./schemas/display");

const server = new ApolloServer({
  typeDefs: [userTypes, displayTypes],
  resolvers: [userResolvers, displayResolvers],
  formatError: (err) => {
    console.error(err);
    return err;
  },
});

(async () => {
  try {
    console.log("Connecting to database");
    await connect();
    console.log("Connected to database");
    const db = await getDB();

    const { url } = await startStandaloneServer(server, {
      listen: { port: process.env.PORT || 4000 },
      context: async ({ req, res }) => {
        return {
          auth: async () => {
            return await authentication(req);
          },
          db,
        };
      },
    });

    console.log(`Server starting at ${url}`);
  } catch (error) {
    console.error("Error starting server:", error);
  }
})();
