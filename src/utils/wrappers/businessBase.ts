import { Sequelize, Transaction } from 'sequelize'
import { instanceDBConnection } from '../../repository/context/Context'
export var transaction: Transaction;

export default abstract class BusinessBase {

    public connectionString: string;
    public sequelize: Sequelize;

    constructor(connectionString: string) {
        this.connectionString = connectionString;
        this.sequelize = new instanceDBConnection(this.connectionString).dbConnection();
        this.sequelize.authenticate();
    }

    async executionDB<T>(body: () => Promise<T>, isolationLevel: Transaction.ISOLATION_LEVELS): Promise<T> {
        let response = await this.sequelize.transaction({ isolationLevel: isolationLevel }, async (tran) => {
            transaction = tran;
            try {
                let data = await body();
                return data;
            }
            finally {

            }
        })

        this.sequelize.close();
        return response
    }
}

