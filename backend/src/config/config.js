const dotenv = require("dotenv");

dotenv.config();

if(!process.env.POSTGRESQL_DATABASE_URL){
    throw new Error("Postgres env not found");
}

if(!process.env.FRONTEND_URL){
    throw new Error("FRONTEND_URL is not found in env");
}

if(!process.env.PORT){
    throw new Error("PORT is not found in the env");
}

if(!process.env.SESSION_SECRET){
    throw new Error("SESSION_SECRET is not found in env")
}

const config = {
    POSTGRESQL_DATABASE_URL: process.env.POSTGRESQL_DATABASE_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    PORT: process.env.PORT,
    SESSION_SECRET: process.env.SESSION_SECRET
}

module.exports = config