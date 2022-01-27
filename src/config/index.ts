export default {
    databaseString: process.env.CLEARDB_DATABASE_URL, //mysql://b81a7cbf5155ee:a63fa834@us-cdbr-east-05.cleardb.net/heroku_073c4711cf251a2?reconnect=true
    databaseName: process.env.DB_NAME,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    dbUserName: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    isDev: process.env.NODE_ENV === 'develop',
}
