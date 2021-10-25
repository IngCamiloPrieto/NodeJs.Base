/**
 * @swagger
 * components:
 *   schemas:
 *     Unit:
 *       title: Unit
 *       required:
 *         - unit_id
 *         - iso_80000
 *         - name
 *         - symbol
 *         - is_active
 *       type: object
 *       properties:
 *         unit_id:
 *           type: string
 *           format: uuid
 *         iso_80000:
 *           type: string
 *         name:
 *           type: string
 *         symbol:
 *           type: string
 *         is_active:
 *           type: boolean
 *       example:
 *         unit_id: 26a82e85-e428-45da-95b1-e6dce3cd067c
 *         iso_80000: 'L,l'
 *         name: liter
 *         symbol: L
 *         is_active: true
  */
export interface UnitDTO {
    unit_id: string,
    iso_80000: string,
    name: string,
    symbol: string,
    is_active: boolean,
    last_update: string
}