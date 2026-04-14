const express = require("express");
const helmet = require("helmet");
const cors = require("cors")
const { session, sessionConfig } = require('./config/session');
const config = require("./config/config")

const authRouter = require("./routes/auth.route")
const monitorRouter = require("./routes/monitor.route")
const publicRouter = require("./routes/public.route")
const incidentRouter = require("./routes/incident.route")

let createApolloServer = null;
try {
    ({ createApolloServer } = require("./graphql"));
} catch (error) {
    // Allow API boot without GraphQL when the module is missing in deploy.
    console.warn("GraphQL module not found, skipping /graphql setup.");
}

const app = express()

app.use(helmet())
app.use(express.json())
app.use(cors({
    origin: config.FRONTEND_URL,
    credentials: true
}))

app.use(session(sessionConfig)); // apply session middleware


app.use("/", (req, res) => {
    res.send("sever is running")
})

app.use("/auth", authRouter);
app.use("/monitors", monitorRouter)
app.use("/incident", incidentRouter)
app.use("/public", publicRouter)

async function start() {
    if (createApolloServer) {
        const { apolloServer, apolloMiddleware } = await createApolloServer();
        app.use("/graphql", apolloMiddleware)
        await apolloServer.start()
    }

    app.listen(config.PORT, () =>
        console.log(`BlipLog API running on port ${ config.PORT || 4000 }`)
    );
}

start()