import { UnitDTO } from "../../dto/unitDTO";

export  interface UnitDALAction {    
    findUnit: (unitId: string) => Promise<UnitDTO | null>
    addUnit: (unit: UnitDTO) => Promise<UnitDTO>
    updateUnit: (unit: UnitDTO) => Promise<UnitDTO>
    deleteUnit: (unit: UnitDTO) => Promise<UnitDTO>
    syncUnit: (units: UnitDTO) => Promise<UnitDTO>
    findAll: (filterParams?: string) => Promise<UnitDTO[]>
}