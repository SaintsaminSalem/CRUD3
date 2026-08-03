import express from "express";
import http from "http";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";

import route from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import notificationRoute from "./routes/notificationRoute.js";
import { initSocket } from "./socket/socketServer.js";

import schema from "./graphql/typeDefs.js";
import resolvers from "./graphql/resolvers.js";
import { buildContext } from "./graphql/authContext.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/user", route);
app.use("/api/auth", authRoute);
app.use("/api/notifications", notificationRoute);

// GraphQL endpoint — REST and GraphQL run side by side
app.use(
  "/graphql",
  graphqlHTTP((req) => ({
    schema,
    rootValue: resolvers,
    context: buildContext(req),
    graphiql: true, // gives you an in-browser query playground at /graphql
  }))
);

const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected successfully.");
    server.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`);
    });
  })
  .catch((error) => console.log(error));