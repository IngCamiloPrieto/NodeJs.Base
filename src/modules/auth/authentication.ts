import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import { operationAPI } from '../entities/operationAPI';
import { CryptoPayload } from './cryptoAgent';
import { Logger } from '../../lib/Logger';

export class Authentication {
    keyPass: string = process.env.JWT_KEY_PASS;
    constructor() { };

    /**
     * This method validate a JWT
     * @param req 
     * @param res 
     * @param next
     * @returns Next express Object
     */
    authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
        const token =  (req.headers['authorization']) ? req.headers['authorization'].replace("Bearer ", "") : null;
        const badResopnse = new operationAPI("", "not authorized!", 401);
        if (token) {
            try {
                let jwtPayload = jwt.verify(token, this.keyPass);
                let connectionString: string = '';     
                if (jwtPayload && typeof (jwtPayload) === 'object' && jwtPayload.hasOwnProperty('vector') && jwtPayload.hasOwnProperty('target')) { 
                    let DecrypterAgent = new CryptoPayload();
                    connectionString = await DecrypterAgent.decryptData(jwtPayload.target, jwtPayload.vector);               
                    delete jwtPayload.target;
                    delete jwtPayload.vector;
                }
                jwtPayload.connectionString = connectionString;
                req.headers.jwtPayload = jwtPayload;
                next();
            } catch (err) {                
                res.status(401).json(badResopnse);
            }
        } else {
            res.status(401).json(badResopnse);
        }
    };

    /**
     * Return decoded Payload of JWT
     * @param token 
     * @returns String
     */
    getPaylodFronJWT = (token) => {
        try {
            let decoded = jwt.verify(token, this.keyPass);
            return decoded;
        } 
        catch (err) {
            Logger.LogError("Authentication", "getPaylodFronJWT -> Invalid Json Web Token", err.JsonWebTokenError);
            return null;
        }
    };

    /**
     * Create a JWT whit payload that
     * have a Connection String Value
     * @param connectionString 
     * @returns String
     */
    createJWT = async (connectionString: string): Promise<string> => {
        let EncrypterAgent = new CryptoPayload();
        let encrytedData = await EncrypterAgent.encryptData(connectionString);
        
        const payload = {
            check: true,
            vector: (encrytedData && encrytedData.hasOwnProperty('iv')) ? encrytedData.iv : null,
            target: (encrytedData && encrytedData.hasOwnProperty('data')) ? encrytedData.data : null
        };
        
        const token = jwt.sign(payload, this.keyPass, {
            expiresIn: process.env.JWT_EXPIRES_IN+'s'
        });

        return token;
    };

}