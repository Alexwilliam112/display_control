const { compare } = require("../utils/bcrypt");
const { signToken } = require("../utils/jwt");
const { GraphQLError } = require("graphql");
const User = require("../models/user");

module.exports = {
  userTypes: `#graphql
    input LoginInput {
      username: String!
      password: String!
    }

    type LoginResponse {
      token: String
    }

    type Query {
      Login(input: LoginInput): LoginResponse
    }
	`,

  userResolvers: {
    Query: {
      Login: async (_, { input }) => {
        const user = await User.getUserByUsername(input.username);
        if (!user) {
          throw new GraphQLError("User not found", {
            extensions: {
              http: {
                status: 401,
              },
            },
          });
        }

        const isPasswordValid = compare(input.password, user.password);
        if (!isPasswordValid) {
          throw new GraphQLError("Invalid password", {
            extensions: {
              http: {
                status: 401,
              },
            },
          });
        }

        delete user.password;
        const token = signToken({
          _id: user._id,
          username: user.username,
        });
        return { token };
      },
    },
  },
};
