import { Transaction } from 'sequelize'
import UnitDALAction from '../../../interfaces/contracts/unit/unitDALAction'
import UnitDAL from '../../../repository/dal/unit/unitDal'
import { UnitDTO } from '../../../interfaces/dto/unitDTO'
import UnitBLAction from '../../../interfaces/contracts/unit/unitBLAction'
import BusinessBase from '../../../utils/wrappers/businessBase'
import { Result } from '../../../utils/interfaces/result'
import { BusinessError } from '../../../utils/interfaces/businessError'
import { container } from '../../../interfaces/container/inversify.config' 
import { injectable, inject, interfaces, decorate } from "inversify"
import { TYPES } from "../../../interfaces/container/types"
import "reflect-metadata";
decorate(injectable(), "UnitBLAction");
@injectable()
export class UnitBL extends BusinessBase implements UnitBLAction {

    private response: Result<UnitDTO>;
    //private unitRepository: UnitDALAction;
    private unitRepository: UnitDALAction;

    constructor(connectionString: string,@inject(TYPES.UnitDALAction) repository?: UnitDALAction) {
        super(connectionString);
        this.response = new Result<UnitDTO>();       
        this.unitRepository=repository;
        //this.unitRepository = unitRepository != null ? unitRepository : new UnitDAL(this.transaction);
    }

    public findUnit = async (unitId: string): Promise<Result<UnitDTO>> => {
        return await this.executionDB<Result<UnitDTO>>(async () => {
            let unit = await this.unitRepository.findUnit(unitId);
            unit != null ? this.response.data.push(unit) : this.response.data = [];
            this.response.count = (this.response.data) ? this.response.data.length : 0;
            this.response.statuscode = 200;
            return this.response;
        }, Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED)
    }

    public findAll = async (filterParams?: string): Promise<Result<UnitDTO>> => {
        return await this.executionDB<Result<UnitDTO>>(async () => {
            let units = await this.unitRepository.findAll(filterParams);
            units != null ? this.response.data = units : this.response.data = [];
            this.response.count = (this.response.data) ? this.response.data.length : 0;
            this.response.statuscode = 200;
            return this.response;
        }, Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED)
    }

    public updateUnit = async (unit: UnitDTO): Promise<Result<UnitDTO>> => {
        return await this.executionDB<Result<UnitDTO>>(async () => {
            let existUnit: UnitDTO | null = await this.unitRepository.findUnit(unit.unit_id);
            if (existUnit != null) {
                unit.unit_id = existUnit.unit_id;
                this.response.data.push(await this.unitRepository.updateUnit(unit));
                this.response.message.push("The unit has been correctly modified");
                this.response.statuscode = 200;
                this.response.count = (this.response.data) ? this.response.data.length : 0;
            } else {
                throw new BusinessError(400, "Unity does not exist");
            }
            return this.response;
        }, Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED)
    }

    public addUnit = async (unit: UnitDTO): Promise<Result<UnitDTO>> => {

        return await this.executionDB<Result<UnitDTO>>(async () => {
            let existUnit: UnitDTO | null = await this.unitRepository.findUnit(unit.unit_id)
            if (existUnit == null) {
                this.response.data.push(await this.unitRepository.addUnit(unit));
                this.response.message.push("The unit has been added successfully");
                this.response.statuscode = 201;
                this.response.count = (this.response.data) ? this.response.data.length : 0;
            } else {
                throw new BusinessError(400, "The unit already exists");
            }
            return this.response;
        }, Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED)
    }

    public deleteUnit = async (unit: UnitDTO): Promise<Result<UnitDTO>> => {
        return await this.executionDB<Result<UnitDTO>>(async () => {
            let existUnit: UnitDTO | null = await this.unitRepository.findUnit(unit.unit_id);
            if (existUnit != null) {
                unit.unit_id = existUnit.unit_id;
                this.response.data.push(await this.unitRepository.deleteUnit(unit));
                this.response.message.push("The unit has been deleted successfully");
                this.response.statuscode = 202;
                this.response.count = (this.response.data) ? this.response.data.length : 0;
            } else {
                throw new BusinessError(400, "Unity does not exist");
            }
            return this.response;
        }, Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED)
    }

    public syncUnit = async (units: UnitDTO[]): Promise<Result<UnitDTO>> => {
        return await this.executionDB<Result<UnitDTO>>(async () => {
            for (let i = 0; i < units.length; i++) {
                this.response.data.push(await this.unitRepository.syncUnit(units[i]));
            }
            this.response.count = units.length;
            this.response.statuscode = 201;
            return this.response;
        }, Transaction.ISOLATION_LEVELS.READ_COMMITTED);

    }
}



export default UnitBL;