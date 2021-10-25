import { Sequelize } from "sequelize";
import Unit from "./models/unit";

export {
    Unit
};

export function initModels(sequelize: Sequelize) {
    Unit.changeDBInstance(sequelize);

    const modelsList = {
        Unit: Unit       
    };

    return modelsList;
}