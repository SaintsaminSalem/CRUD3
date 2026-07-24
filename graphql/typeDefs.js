import { buildSchema } from "graphql";

const schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
    address: String!
    role: String!
    createdAt: String
  }

  type Notification {
    id: ID!
    recipient: ID
    audience: String!
    type: String!
    message: String!
    read: Boolean!
    createdAt: String
  }

  type AuthPayload {
    success: Boolean!
    message: String
    token: String
    user: User
  }

  type Query {
    users: [User!]!
    user(id: ID!): User
    myNotifications: [Notification!]!
  }

  type Mutation {
    signup(name: String!, email: String!, address: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createUser(name: String!, email: String!, address: String!, password: String!): User!
    updateUser(id: ID!, name: String, email: String, address: String): User!
    deleteUser(id: ID!): Boolean!
    markNotificationRead(id: ID!): Boolean!
  }
`);

export default schema;