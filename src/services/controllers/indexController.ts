import {Request, Response, NextFunction} from 'express';
import { Result } from '../../utils/interfaces/result';


class IndexController {

    public result: Result<any>;

    constructor(){};

    public index (req : Request, res : Response, next : NextFunction) {
        res.render('index', {titte: 'Welcome to Cloud API POS'});
    };
    public docs (req : Request, res : Response, next : NextFunction) {
        res.render('docs', {titte: 'Cloud API POS Docs'});
    };

    public error (req : Request, res : Response, next : NextFunction) {
        res.render('error', {titte: 'Cloud API POS Docs', code : 404, detail : 'Not Found'});
    };

    public healthckeck (req : Request, res : Response, next : NextFunction) {
        let result = new Result<any>();
        result.message.push('It´s Works');
        result.statuscode=200;
        res.status(200).json(result);                
    };
}

export const indexController = new IndexController();