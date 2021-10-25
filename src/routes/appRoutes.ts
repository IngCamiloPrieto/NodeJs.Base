import { Router } from 'express';
import dotenv from "dotenv";
dotenv.config();

export class appRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.parentRoutes();
  }

  private parentRoutes() {
  }
}
