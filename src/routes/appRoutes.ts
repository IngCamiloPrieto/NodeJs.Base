import { Router } from 'express';
import { Authentication } from '../modules/auth/authentication';
import dotenv from "dotenv";
dotenv.config();

export class appRoutes {
  auth: Authentication;
  public router: Router;

  constructor() {
    this.auth = new Authentication();
    this.router = Router();
    this.parentRoutes();
  }

  private parentRoutes() {
    //JWT validation
    //this.router.use(this.auth.authMiddleware);
  }
}
