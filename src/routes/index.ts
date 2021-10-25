import { Router } from 'express';
import { indexController }  from '../services/controllers/indexController';

class indexRoutes {
  router : Router;

  constructor() {
    this.router = Router();
    this.routes();
  };

  routes(){
    /* GET home page. */
    this.router.get('/', indexController.index);
    /* GET documentation page. */
    this.router.get('/docs', indexController.docs);
    /* GET error page 404 */
    this.router.get('/error', indexController.error);
    /* GET healthckeck API */
    this.router.get('/healthcheck', indexController.healthckeck);
    
  };
  
}

const indexRouter = new indexRoutes();
export default indexRouter.router;