import { v4 as uuidv4 } from 'uuid';
import { UnitDTO } from '../../../src/interfaces/dto/unitDTO';

export class MockAuthApp {
    username : string;
    password : string;
    constructor(username : string, password : string){
        this.username = username || null;
        this.password = password || null;
    }
}

export class MockUnit implements UnitDTO{
    unit_id : string;
    iso_80000 : string;
    name : string;
    symbol : string;
    is_active : boolean;
    last_update: string; 
    constructor(uuid? : string){
        if (uuid == null) uuid = uuidv4();
        this.unit_id = uuid;
        this.iso_80000 = "L,l";
        this.name = "liter"; 
        this.symbol = "L";
        this.is_active = true;
    }
}



