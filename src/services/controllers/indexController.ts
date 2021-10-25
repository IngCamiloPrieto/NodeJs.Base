import {Request, Response, NextFunction} from 'express';
import { operationAPI } from '../../modules/entities/operationAPI';

class IndexController {
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
        res.status(200).json(new operationAPI('OK', 'It´s Works', 200));
    };
}

export const indexController = new IndexController();