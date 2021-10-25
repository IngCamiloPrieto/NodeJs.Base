import dotenv from "dotenv";
dotenv.config();


import { Unit } from './UnitTest/Unit';
import { UnitTestBl } from "./UnitTest/unitTestBL";
import { MockAuthApp } from './UnitTest/Mock/Entities';


const config = require('../config.json');
const lodash = require('lodash');
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = lodash.merge(defaultConfig, environmentConfig);

class Tester {
    private url : string = 'http://' + (process.env.HOST || 'localhost') + ':' + (Number(process.env.PORT) || 4004);
    private authData : MockAuthApp = new MockAuthApp((finalConfig && finalConfig.unit_test) ? finalConfig.unit_test.API_CLOUD_USERNAME : null, (finalConfig && finalConfig.unit_test) ? finalConfig.unit_test.API_CLOUD_PASSWORD : null);   
  
    constructor () {};

    public startAutomatedTest = () => {
       this.startControllersUnitTest();
       this.startBLUnitTest();       
    };

    /**
     * Start API Cloud Controlers unit test
     */
    public startControllersUnitTest = async () => {
  
        await new Unit(this.url, this.authData).startTest();                       //OK              
        
    };

      
    public startBLUnitTest = async () => {
       await new UnitTestBl().startTest();
    };
}

const testerAgent = new Tester();
testerAgent.startAutomatedTest();
