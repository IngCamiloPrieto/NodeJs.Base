import { postgresHelper } from '../extensions/postgresHelper';
import IResult from './IResult';


export class Result<T> implements IResult<T>{

    data: T[];
    message: Array<string>;
    statuscode: number = 0;
    timestamp: string;
    count: number;

    constructor() {
        this.data = new Array<T>();
        this.message = new Array<string>();
        this.timestamp = postgresHelper.pgFormatDate(Date.now());
        this.count= this.data.length;
    };
}