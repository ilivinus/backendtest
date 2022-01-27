import { Sequelize } from 'sequelize'
import config from '../config'

const databaseConfigString = config.isDev
    ? `mysql://${config.dbUserName}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.databaseName}`
    : config.databaseString
console.log(databaseConfigString)
const sequel = new Sequelize(databaseConfigString, {
    logging: console.log,
    dialectOptions: {
        multipleStatements: true,
    },
})

export default sequel
