
import { Sequelize } from 'sequelize';

const sequel = new Sequelize('viveo_test','root','toor',{
    dialect: 'mysql',
    host:'localhost',
    port:3306,
    logging: console.log,
    dialectOptions: {
        multipleStatements: true
    }
});

export default sequel;