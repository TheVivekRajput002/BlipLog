const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { createLoaders } = require('./resolvers');

async function createApolloServer() {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();

    const middleware = expressMiddleware(server, {
        context: async ({ req }) => ({
            orgId: req.session?.orgId,
            loaders: createLoaders(),
        }),
    });

    return { apolloServer: server, apolloMiddleware: middleware };
}

module.exports = { createApolloServer };