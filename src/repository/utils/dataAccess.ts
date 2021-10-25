import { injectable } from 'inversify';
import { Model, Order, WhereOptions, AndOperator, fn, Op, OrOperator, WhereOperators, col, Transaction} from 'sequelize';
import { Utils } from '../../utils/extensions';

@injectable()
export class DataAccess {
  private where: WhereOptions;
  private order: Order;
  private offset: number;
  private limit: number;
  public defaultOffset : number;
  public defaulLimit : number;
  public orderFields: any;
  public filterFields: any;
  public transaction: Transaction;

  constructor(offset : number = 0, limit: number = 500){
      this.offset, this.defaultOffset = offset;
      this.limit, this.defaulLimit = limit;
  };

  public setOffset(offset : number){
    return this.offset = offset;
  };

  public getOffset() : number {
    return this.offset;
  };

  public setLimit(limit : number){
    return this.limit = limit;
  };

  public getLimit() : number {
    return this.limit;
  };

  public setWhere(where : WhereOptions){
    this.where = where; 
  };

  public getWhere() : WhereOptions {
      return this.where;
  };

  public setOrder(order : Order){
    return this.order = order;
  };
  
  public getOrder() : Order{
    return this.order;
  };

  /**
   * Build object with specific fields of Model and a alias for each field
   * @param rawAttributes Attributes of Model
   * @param fileds Specific fields to extract
   * @returns Object based on Model.rawAttributes
   */
  public getFieldsFromModel = (rawAttributes : any , fileds : Array<string> = []) : any => {
    let fields = {};
    let modelAtributes = Utils.filterObject(rawAttributes, (c) => (fileds.indexOf(c.field) > -1));
    Object.keys(modelAtributes).forEach((c)=> {   
      fields[c] = c;
    });
    modelAtributes['is_active'] = true;
    return fields;
  };

  /**
   * Create a where clause with AND operators (Default)
   * For custom where clauses overwrite this metod
   * Examples of sequelize where clauses: https://sequelize.org/master/manual/model-querying-basics.html or https://github.com/types/sequelize/blob/master/test/where.ts
   * @param filterFields Fields allowed for the Entity 
   * @param filterPart parameters for where clause
   * @returns where clusule sequelize
   */
  public buildWhere = (filterFields : any, filterPart : any) : WhereOptions  => {
    let where = {} as WhereOptions;
    Object.keys(filterPart).forEach((c)=> {   
      if (filterFields.hasOwnProperty(c) && filterFields[c]){
          where[filterFields[c]] = filterPart[c];  
      }
    });
    return where;
  };

  /**
   * Create a order sentence with main Model (Default)
   * For custom order sentences overwrite this metod
   * Examples of sequelize ordering: https://sequelize.org/master/manual/model-querying-basics.html
   * @param orderFields Fields allowed for the Entity 
   * @param orderPart parameters for order clause
   * @returns order clusule sequelize
   */
  public buildOrder = (orderFields: any, orderPart : any) : any[] => {
    let order = [];
    Object.keys(orderPart).forEach((c)=> {   
      if (orderFields.hasOwnProperty(c) && orderFields[c]){
        let orderValue = (orderPart[c] && typeof(orderPart[c]) === 'string' && (orderPart[c].toUpperCase() === 'ASC' || orderPart[c].toUpperCase() === 'DESC')) ? orderPart[c].toUpperCase() : 'ASC';
        order.push([orderFields[c], orderValue]);
      }
    });
    return order;
  };

  public setFilters = (parameters: string, showDeleted?: boolean) => {
    let finalParsed = JSON.parse(parameters);
    if (finalParsed && finalParsed?.filter && typeof (finalParsed?.filter) === 'object') {
        let where = this.buildWhere(this.filterFields, finalParsed?.filter);
        if (Object.keys(where).length > 0) this.setWhere(where);
    }
    if (!showDeleted){
        let where = this.getWhere();
        if (!where) where = {};
        where['is_active'] = true;
        this.setWhere(where);
    }
    if (finalParsed && finalParsed?.order && typeof (finalParsed?.order) === 'object') {
        let order = this.buildOrder(this.orderFields, finalParsed?.order);
        if (order.length > 0) this.setOrder(order);
    }
    let page = this.defaultOffset;
    let pageSize = this.defaulLimit;
    if (finalParsed && finalParsed?.page && typeof (finalParsed?.page) === 'number' && Number(finalParsed?.page) > 0
        && finalParsed?.pagesize && typeof (finalParsed?.pagesize) === 'number' && Number(finalParsed?.pagesize) > 0) {
        page = Number(finalParsed?.page) - 1;
        pageSize = Number(finalParsed?.pagesize);
    }
    this.setOffset(page * pageSize);
    this.setLimit(pageSize);
};


}