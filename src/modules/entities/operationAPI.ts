import { postgresHelper } from './../Utils/postgresHelper';

export class operationAPI <T>{
    data?: T;
    message: string;
    statuscode : number = 0;
    timestamp : string;
    constructor(data : T, message : string, statuscode : number = 200 ) {
      this.data = data;
      this.message = message;
      this.statuscode = statuscode;
      this.timestamp = postgresHelper.pgFormatDate(Date.now()); 
    };
}

export class operationAPIList <T> extends operationAPI<T>{
  count : number = 0;
  constructor(data : T, message : string, statuscode : number = 200 , count : number = 0) {
    super(data , message , statuscode);
    this.count = count;
  };
}