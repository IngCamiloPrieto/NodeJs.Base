import { Request, Response, NextFunction } from 'express';
import {UnitBLAction} from '../../../interfaces/contracts/unit/unitBLAction';
import UnitBL from '../../../business/bl/unit/unitBL';
import { UnitDTO } from '../../../interfaces/dto/unitDTO';
import { ControllerBase } from '../../../utils/wrappers/controllerBase';
import { Result } from '../../../utils/interfaces/result';

export class UnitController extends ControllerBase {

    private unitBL: UnitBLAction;
    constructor() {
        super();
    };

    public listAll = async (req: Request, res: Response, next: NextFunction) => {
        return await this.executionAPI<Result<UnitDTO>>(req, res, async () => {
            const filterParams = req.query.parameters?.toString();
            this.unitBL = new UnitBL(this.connectionString);
            let data = await this.unitBL.findAll(filterParams);
            return data;
        });
    }

    public findByID = async (req: Request, res: Response, next: NextFunction) => {
        return await this.executionAPI<Result<UnitDTO>>(req, res, async () => {
            let requestDataId: string = req.params.unit_id;
            this.unitBL = new UnitBL(this.connectionString);
            let data = await this.unitBL.findUnit(requestDataId);
            return data;
        });
    }

    public add = async (req: Request, res: Response, next: NextFunction) => {
        return await this.executionAPI<Result<UnitDTO>>(req, res, async () => {
            let unit: UnitDTO = req.body;
            this.unitBL = new UnitBL(this.connectionString);
            let data = await this.unitBL.addUnit(unit);
            return data;
        });
    }

    public update = async (req: Request, res: Response, next: NextFunction) => {
        return await this.executionAPI<Result<UnitDTO>>(req, res, async () => {
            let unit: UnitDTO = req.body;
            unit.unit_id = req.params.unit_id;
            this.unitBL = new UnitBL(this.connectionString);
            let data = await this.unitBL.updateUnit(unit);
            return data;
        });
    }

    public remove = async (req: Request, res: Response, next: NextFunction) => {
        return await this.executionAPI<Result<UnitDTO>>(req, res, async () => {
            let unit: UnitDTO = req.body;
            unit.unit_id = req.params.unit_id;
            this.unitBL = new UnitBL(this.connectionString);
            let data = await this.unitBL.deleteUnit(unit);
            return data;
        });
    }
    
    public sync = async (req: Request, res: Response, next: NextFunction) => {
        return await this.executionAPI<Result<UnitDTO>>(req, res, async () => {
            let units: UnitDTO[] = req.body.units;
            this.unitBL = new UnitBL(this.connectionString);
            let data = await this.unitBL.syncUnit(units);
            return data;
        });
    }
}