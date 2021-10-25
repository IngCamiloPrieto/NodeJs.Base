import UnitDALAction from '../../../interfaces/contracts/unit/unitDALAction'
import { UnitDTO } from '../../../interfaces/dto/unitDTO'
import { DataAccess } from '../../../repository/utils/dataAccess'
import { postgresHelper } from '../../../utils/extensions/postgresHelper'
import { Sequelize, WhereOptions, Transaction } from 'sequelize/types'
import { Op } from 'sequelize'
import { Unit } from '../../context/initModels'

export default class UnitDAL extends DataAccess implements UnitDALAction {

    constructor(transaction: Transaction) {
        super();
        this.transaction = transaction;
        this.filterFields = this.getFieldsFromModel(Unit.rawAttributes, ['unit_id', 'iso_80000','name','symbol']);
        this.orderFields = this.getFieldsFromModel(Unit.rawAttributes, ['unit_id', 'iso_80000','name','symbol']);
    }

    /**
     * consultar todos las uninades
    */
    public findAll = async (filterParams?: string): Promise<UnitDTO[]> => {
        if (filterParams) this.setFilters(filterParams);
        let data: UnitDTO[] | null = await Unit.findAll({
            transaction: this.transaction,
            where: this.getWhere(),
            order: this.getOrder(),
        })
        return data;
    }

    /**
    * Buscar una unica Unidad
    */
    public findUnit = async (unitId: string) => {
        let data: UnitDTO | null = await Unit.findOne({
            where: {
                unit_id: unitId,
                is_active: true
            },
            transaction: this.transaction
        })
        return data
    }


    /**
     * Agregar unidades
     */
    public addUnit = async (unit: UnitDTO): Promise<UnitDTO> => {
        unit.last_update = postgresHelper.pgFormatDate(Date.now());
        unit.is_active = true;
        let result = await Unit.create(unit, { transaction: this.transaction })
        return result
    }

    /**
     * Actualizar unidades
     */
    public updateUnit = async (unit: UnitDTO): Promise<UnitDTO> => {
        unit.last_update = postgresHelper.pgFormatDate(Date.now());
        await Unit.update(unit, {
            where: {
                unit_id: unit.unit_id,
                is_active: true
            },
            transaction: this.transaction
        })
        return unit
    }
    public deleteUnit = async (unit: UnitDTO): Promise<UnitDTO> => {
        unit.last_update = postgresHelper.pgFormatDate(Date.now());
        unit.is_active = false;
        await Unit.update(unit, {
            where: {
                unit_id: unit.unit_id
            },
            transaction: this.transaction
        })
        return unit
    }
    public syncUnit = async (unit: UnitDTO): Promise<UnitDTO> => {
        try {
            unit.last_update = postgresHelper.pgFormatDate(Date.now());
            await Unit.upsert(unit, {
                fields: ['unit_id'],
                transaction: this.transaction
            });
            unit['processed'] = true;
        } catch {
            unit['processed'] = false;
        }
        return unit;
    }

    /**
     * Overwrite DataAccess buildOrder for specific logic on Unit Entity
     * @param filterFields Fields allowed for the Entity 
     * @param filterPart Parameters for order clause
     * @returns order clusule sequelize
     */
    public buildWhere = (filterFields: any, filterPart: any): WhereOptions => {
        let where = {} as WhereOptions;
        Object.keys(filterPart).forEach((c) => {
            if (filterFields.hasOwnProperty(c) && filterFields[c]) {
                switch (filterFields[c]) {
                    case 'reference_code':
                        where[filterFields[c]] = { [Op.iLike]: filterPart[c] + '%' };
                        break;
                    default:
                        where[filterFields[c]] = filterPart[c];
                        break;
                }
            }
        });
        return where;
    };

}