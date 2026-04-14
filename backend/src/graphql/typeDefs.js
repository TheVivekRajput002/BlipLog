const {gql} = require("graphql");

const typeDefs = gql`
  type Monitor {
    id: ID!
    url: String!
    name: String!
    status: String!
    updatedAt: String!
    recentChecks: [CheckLog!]!
    activeIncident: Incident
  }

  type CheckLog {
    id: ID!
    isUp: Boolean!
    responseMs: Int
    statusCode: Int
    checkedAt: String!
  }

  type Incident {
    id: ID!
    state: String!
    startedAt: String!
    resolvedAt: String
    updates: [IncidentUpdate!]!
  }

  type IncidentUpdate {
    id: ID!
    body: String!
    createdAt: String!
  }

  type Query {
    monitors: [Monitor!]!
  }
`

module.exports = typeDefs;