import { Container } from 'inversify';
import 'reflect-metadata';
import UnitBL from '../../business/bl/unit/unitBL';
import UnitDAL from '../../repository/dal/unit/unitDal';
import UnitBLAction from '../contracts/unit/unitBLAction';
import UnitDALAction from '../contracts/unit/unitDALAction';
import {TYPES} from './types';

const container = new Container();
container.bind<UnitBLAction>(TYPES.UnitBl).to(UnitBL);
container.bind<UnitDALAction>(TYPES.UnitDAL).to(UnitDAL);
export { container };