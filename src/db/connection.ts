import { Sequelize } from 'sequelize'
import config from '../config'

const databaseConfigString = config.isDev
    ? `mysql://${config.dbUserName}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.databaseName}`
    : config.databaseString
const sequel = new Sequelize(databaseConfigString, {
    dialectOptions: {
        multipleStatements: true,
    },
})

export default sequel
