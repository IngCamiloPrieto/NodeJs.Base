import { Sequelize } from 'sequelize'
import { initModels } from './initModels';

export class instanceDBConnection {
    stringConnection: string;

    constructor(stringConnection: string) {
        this.stringConnection = stringConnection;
    }


    dbConnection = (): Sequelize => {
        try {
            let sequelizeInstance: Sequelize = new Sequelize(this.stringConnection,
                {
                    dialect: 'postgres',    //The dialect of the database you are connecting to. One of mysql, postgres, sqlite, mariadb and mssql.
                    logging: true,        //Show SQL commands on terminal
                    benchmark: true,       //Pass query execution time in milliseconds as second argument to logging function (options.logging).
                    pool: {
                        max: 8,             //Maximum number of connections in pool. Default is 5
                        min: 0,             //Minimum number of connections in pool. Default is 0
                        acquire: 3000,     //The maximum time, in milliseconds, that a connection can be idle before being released
                        idle: 1000          //The maximum time, in milliseconds, that pool will try to get connection before throwing error
                    }
                }
            );
            console.log('Connection has been established successfully.');
            sequelizeInstance.authenticate();
            initModels(sequelizeInstance);
            return sequelizeInstance;
        } catch (error) {
            console.log(`Unable to connect to the database: ${error}`);
        }
    }
}