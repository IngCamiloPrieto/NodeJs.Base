import { Request, Response, NextFunction } from 'express';
import { Logger } from '../../lib/Logger';
import { BusinessError } from '../interfaces/businessError';
import { Result } from "../interfaces/result";
import dotenv from "dotenv";
dotenv.config();

export abstract class ControllerBase {
    public connectionString: string;
    public result: Result<any>;

    async executionAPI<T>(request: Request, response: Response, body: () => Promise<T>): Promise<Response> {
        Logger.LogInfo(request.baseUrl, request.method, "Start request");
        try {
            //this.connectionString = request.headers.jwtPayload['connectionString'];
            this.connectionString = process.env.BDCONFIG_CNXSTRING;
            let data = await body();
            response.status(data['statuscode']).json(data);
        }
        catch (ex) {
            let result = new Result<any>();
            result.statuscode = ex.code;
            result.message.push(ex.message);
            if (ex instanceof BusinessError) {
                response.status(400).json(result);
            } else {
                Logger.LogError(request.baseUrl, request.method, `Body: ${JSON.stringify(request.body)} QueryParams: ${JSON.stringify(request.query)} Params: ${JSON.stringify(request.params)}`);
                response.status(500).json(result);
            }

        }
        Logger.LogInfo(request.baseUrl, request.method, "End request");
        return response;
    }
}