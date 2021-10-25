export class queryResult <T>{
    data?: T;
    message: string;
    isSuccess : Boolean;
    constructor(data : T, message : string, isSuccess : Boolean = true ) {
      this.data = data;
      this.message = message;
      this.isSuccess = isSuccess;
    };
}