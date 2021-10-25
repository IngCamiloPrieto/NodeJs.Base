import { UnitController } from '../../services/controllers/unit/unitController'
import dotenv from "dotenv";
import { appRoutes } from '../appRoutes';

dotenv.config();

class UnitRoutes extends appRoutes {
  controller: UnitController;

  constructor() {
    super();
    this.controller = new UnitController();
    this.routes();
  };

  routes() {

    /**
     * @swagger
     * /unit:
     *   get:
     *    tags:
     *      - Unit
     *    summary: Get Units
     *    operationId: GetUnits
     *    parameters:
     *      - in: query
     *        name: parameters
     *        schema:
     *          type: string
     *        example: '{"filter":{"isactive":true},"order":{"lastupdate":"ASC"},"page":1,"pagesize":10}'
     *        allowReserved: true
     *        allowEmptyValue: true
     *    responses:
     *      '200':
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/Unit'
     *            example: '{"statuscode": 200, "data": [ { "unit_id": "833fee2c-71c8-11eb-9439-0242ac130002", "iso_80000": "ISO 80000-1", "name": "Unidad", "symbol": "u", "is_active": true, "last_update": "2021-06-24T19:25:26.000Z" }],"message": [],"timestamp": "2021-09-03 00:27:12","count": 5}'
     *      '500':
     *          content:
     *            application/json:
     *              example: '{ "data": [], "message": ["Error message"], "timestamp": "2021-09-06 11:19:22", "count": 0 }'
      */
    this.router.get('/', this.controller.listAll);


    /**
     * @swagger
     *   /unit/{unitId}:
     *     get:
     *       tags:
     *         - Unit
     *       summary: Get Unit by Id
     *       operationId: GetUnitbyId
     *       parameters:
     *         - name: unitId
     *           in: path
     *           description: ID of unit to find
     *           required: true
     *           schema:
     *             type: string
     *             format: uuid
     *       responses:
     *        '200':
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Unit'
     *              example: '{ "statuscode": 200, "data": [ { "unit_id": "833fee2c-71c8-11eb-9439-0242ac130002", "iso_80000": "ISO 80000-1", "name": "Unidad", "symbol": "u", "is_active": true, "last_update": "2021-06-24T19:25:26.000Z" } ],"message": [],"timestamp": "2021-09-06 10:59:39","count": 1 }'
     *        '500':
     *          content:
     *            application/json:
     *              example: '{ "data": [], "message": ["Error message"], "timestamp": "2021-09-06 11:19:22", "count": 0 }'
      */
    this.router.get('/:unit_id', this.controller.findByID);

    /**
     * @swagger
     * /unit:
     *   post:
     *     tags:
     *       - Unit
     *     summary: Add Unit
     *     operationId: AddUnit
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Unit'
     *           example: '{ "unit_id" :  "26a82e85-e428-45da-95b1-e6dce3cd067c", "iso_80000" : "L,l", "name" : "liter",  "symbol" : "L", "is_active" : true }'
     *       required: true
     *     responses:
     *        '201':
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Unit'
     *              example: '{ "statuscode": 201, "data": [ { "unit_id": "26a82e85-e428-45da-95b1-e6dce3cd0679", "iso_80000": "L,l", "name": "liter", "symbol": "L", "is_active": true, "last_update": "2021-09-06T19:37:53.000Z"} ], "message": [ "The unit has been added successfully" ], "timestamp": "2021-09-06 09:37:53", "count": 1 }'
     *        '400':
     *          content:
     *            application/json:
     *              example: '{ "statuscode": 400, "data": [], "message": [ "The unit already exists" ],"timestamp": "2021-09-06 12:03:05","count": 0 }'
     *        '500':
     *            content:
     *              application/json:
     *                example: '{ "data": [], "message": ["Error message"], "timestamp": "2021-09-06 11:19:22", "count": 0 }'
      */
    this.router.post('/', this.controller.add);

    /**
     * @swagger
     * /unit/{unitId}:
     *   put:
     *     tags:
     *       - Unit
     *     summary: Update Unit
     *     operationId: UpdateUnit
     *     requestBody:
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/Unit'
     *           example: '{ "iso_80000" : "L,l","name" : "Liter", "symbol" : "L","is_active" : true }'
     *       required: true
     *     parameters:
     *       - name: unitId
     *         in: path
     *         description: ID of unit to update
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *        '200':
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Unit'
     *              example: '{ "statuscode": 200, "data": [ { "iso_80000": "L,l", "name": "Liter", "symbol": "L", "is_active": true, "unit_id": "26a82e85-e428-45da-95b1-e6dce3cd0679", "last_update": "2021-09-06 11:29:25"} ], "message": [ "The unit has been correctly modified" ], "timestamp": "2021-09-06 11:29:25", "count": 1 }'
     *        '500':
     *            content:
     *              application/json:
     *                example: '{ "data": [], "message": ["Error message"], "timestamp": "2021-09-06 11:19:22", "count": 0 }'
      */
    this.router.put('/:unit_id', this.controller.update);

    /**
     * @swagger
     * /unit/{unitId}:
     *   delete:
     *     tags:
     *       - Unit
     *     summary: Delete Unit
     *     operationId: DeleteUnit
     *     parameters:
     *       - name: unitId
     *         in: path
     *         description: ID of unit to delete
     *         required: true
     *         schema:
     *           type: string
     *           format: uuid
     *     responses:
     *        '202':
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Unit'
     *              example: '{ "statuscode": 202, "data": [ { "unit_id": "26a82e85-e428-45da-95b1-e6dce3cd0679", "last_update": "2021-09-06 12:05:13", "is_active": false} ], "message": [ "The unit has been deleted successfully" ],"timestamp": "2021-09-06 12:05:12","count": 1 }'
     *        '400':
     *            content:
     *              application/json:
     *                example: '{ "statuscode": 400, "data": [], "message": [ "Unity does not exist" ], "timestamp": "2021-09-06 12:07:56", "count": 0 }'
     *        '500':
     *            content:
     *              application/json:
     *                example: '{ "data": [], "message": ["Error message"], "timestamp": "2021-09-06 11:19:22", "count": 0 }'
      */
    this.router.delete('/:unit_id', this.controller.remove);

  };
}
const unitRouter = new UnitRoutes();
export default unitRouter.router;