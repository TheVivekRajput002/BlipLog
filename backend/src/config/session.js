const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const pool = require('../db/client');

const sessionConfig = {
    store: new PgSession({
        pool: pool,
        tableName: 'session',
        createTableIfMissing: true,
    }),

    secret: process.env.SESSION_SECRET, // long random string in .env

    resave: false,              // dont re-save if session unchanged
    saveUninitialized: false,   // dont save empty sessions

    cookie: {
        httpOnly: true,                                    // JS cant access cookie
        secure: process.env.NODE_ENV === 'production',     // HTTPS in prod, HTTP in dev
        sameSite: process.env.NODE_ENV === 'production'    // CSRF protection
            ? 'strict'
            : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,                 // 7 days in milliseconds
    },
};

module.exports = { session, sessionConfig };