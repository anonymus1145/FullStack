import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { makeExecutableSchema } from "@graphql-tools/schema";
import express from "express";
import cors from "cors";
import http from "http";
import jwt from "jsonwebtoken";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import dotenv from "dotenv";
dotenv.config();
// We import the schemas
import User from "./models/users.js";
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";
const MONGODB_URI = process.env.MONGODB_URI;
console.log("connecting to", "Atlas MongoDB");
mongoose
    .connect(MONGODB_URI)
    .then(() => {
    console.log("connected to MongoDB");
})
    .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
});
mongoose.set("debug", true);
// setup is now within a function
const start = async () => {
    const app = express();
    const httpServer = http.createServer(app);
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/",
    });
    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const serverCleanup = useServer({ schema }, wsServer);
    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                }
            }
        ],
    });
    await server.start();
    app.use("/", cors(), express.json(), expressMiddleware(server, {
        context: async ({ req }) => {
            const auth = req ? req.headers.authorization : null;
            if (auth && auth.startsWith("Bearer ")) {
                const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET);
                const currentUser = await User.findById(decodedToken.id);
                return { currentUser };
            }
        },
    }));
    const PORT = 4000;
    httpServer.listen(PORT, () => console.log(`Server is now running on http://localhost:${PORT}`));
};
start();