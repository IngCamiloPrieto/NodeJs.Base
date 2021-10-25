import { instanceDBConnection } from '../../../repository/context/Context';
import { UnitDTO } from '../../../interfaces/dto/unitDTO'
import { Model, DataTypes, Sequelize } from "sequelize";

class Unit extends Model<UnitDTO> implements UnitDTO {
    public unit_id!: string; // Note that the `null assertion` `!` is required in strict mode.
    public iso_80000: string;
    public name: string | null; // for nullable fields
    public symbol: string | null; // for nullable fields
    public is_active!: boolean;
    public last_update!: string;
    static changeDBInstance(sequelize: Sequelize) {
        this.init({
            unit_id: {
                type: DataTypes.UUID,
                primaryKey: true,
                //defaultValue: DataTypes.UUIDV4
            },
            iso_80000: {
                type: DataTypes.STRING
            },
            name: {
                type: DataTypes.STRING
            },
            symbol: {
                type: DataTypes.STRING
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            last_update: {
                type: DataTypes.DATE
            }
        },
            {
                // define the table's name
                tableName: "unit",
                // passing the `sequelize` instance is required
                sequelize,
                // don't add the timestamp attributes (updatedAt, createdAt)
                timestamps: false,

                // don't delete database entries but set the newly added attribute deletedAt
                // to the current date (when deletion was done). paranoid will only work if
                // timestamps are enabled
                //paranoid: true,

                // don't use camelcase for automatically added attributes but underscore style
                // so updatedAt will be updated_at
                underscored: true,

                // disable the modification of tablenames; By default, sequelize will automatically
                // transform all passed model names (first parameter of define) into plural.
                // if you don't want that, set the following
                freezeTableName: true
            });
    };
}

export default Unit;