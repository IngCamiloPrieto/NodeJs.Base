import { DataAccess } from '../../repository/utils/dataAccess'

export default interface IResult<T> {
    data: Array<T>
    message: Array<string>
    statuscode: number;
    timestamp: string;
    count: number
}