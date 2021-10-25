import { UnitController } from '../../services/controllers/unit/unitController'
import dotenv from "dotenv";
import { appRoutes } from '../appRoutes';

dotenv.config();

class UnitRoutesSync extends appRoutes {
  controller: UnitController;

  constructor() {
    super();
    this.controller = new UnitController();
    this.routes();
  };

  routes() {
    /* PUT update a unit by id. */
    this.router.post('/', this.controller.sync);
  
  };
}
const unitRouterSync = new UnitRoutesSync();
export default unitRouterSync.router;