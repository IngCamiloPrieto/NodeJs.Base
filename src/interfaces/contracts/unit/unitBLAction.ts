import { Result } from "../../../utils/interfaces/result";
import { UnitDTO } from "../../dto/unitDTO";

export default interface UnitBLAction {    
    findUnit: (unitId: string) => Promise<Result<UnitDTO | null>>
    addUnit: (unit: UnitDTO) => Promise<Result<UnitDTO>>
    updateUnit: (unit: UnitDTO) => Promise<Result<UnitDTO>>
    deleteUnit: (unit: UnitDTO) => Promise<Result<UnitDTO>>
    findAll: (filterParams?: string) => Promise<Result<UnitDTO>>
    syncUnit: (units: UnitDTO[]) => Promise<Result<UnitDTO>>
}