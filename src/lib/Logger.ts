import  Axios  from 'axios';
import dotenv from "dotenv";
import { configure, getLogger, Configuration} from "log4js";
import { APPLICATION } from '..';
dotenv.config();
const localLog = getLogger();
try{configure(process.env.LOGGER_CONFIG);}catch{}

export class Logger {
  constructor(){ };
  
  public static LogError(className: string, functionName: string, message: string)  {
    let log = {
      className: className,
      functionName: functionName,
      message: message,
      timestamp: Date.now()
    }
    localLog.error( log.className +" - " + log.functionName + " - " + log.message);
    if (process.env.API_LOGS != null) {
      let appId = "unique"
      if (process.env.APPLICATION_ID) appId = process.env.APPLICATION_ID 
      Axios
      .post(process.env.API_LOGS +"/"+APPLICATION+"/"+appId+"/err",log)
      .catch(function(err){
        localLog.error( "Error al notificar Log al servidor");
      });
    }
  };

  public static LogDebug(className: string, functionName: string, message: string) {
    let log = {
      className: className,
      functionName: functionName,
      message: message,
      timestamp: Date.now()
    }
    localLog.debug( log.className +" - " + log.functionName + " - " + log.message);
    if (process.env.API_LOGS != null) {
      let appId = "unique"
      if (process.env.APPLICATION_ID) appId = process.env.APPLICATION_ID 
      Axios
      .post(process.env.API_LOGS +"/"+APPLICATION+"/"+appId+"/debug",log)  
      .catch(function(err){
        localLog.error( "Error al notificar Log al servidor");
      }); 
    }
  };

  public static LogEmergency(className: string, functionName: string, message: string) {
    let log = {
      className: className,
      functionName: functionName,
      message: message,
      timestamp: Date.now()
    }
    localLog.fatal( log.className +" - " + log.functionName + " - " + log.message);
    if (process.env.API_LOGS != null) {
      let appId = "unique"
      if (process.env.APPLICATION_ID) appId = process.env.APPLICATION_ID 
      Axios
      .post(process.env.API_LOGS +"/"+APPLICATION+"/"+appId+"/emer",log) 
      .catch(function(err){
        localLog.error( "Error al notificar Log al servidor");
      });  
    }
  };

  public static LogAlert (className: string, functionName: string, message: string) {
    let log = {
      className: className,
      functionName: functionName,
      message: message,
      timestamp: Date.now()
    }
    localLog.error( log.className +" - " + log.functionName + " - " + log.message);
    if (process.env.API_LOGS != null) {
      let appId = "unique"
      if (process.env.APPLICATION_ID) appId = process.env.APPLICATION_ID 
      Axios
      .post(process.env.API_LOGS +"/"+APPLICATION+"/"+appId+"/alert",log)   
      .catch(function(err){
        localLog.error( "Error al notificar Log al servidor");
      });
    }
  };

  public static LogCritic (className: string, functionName: string, message: string)  {
    let log = {
      className: className,
      functionName: functionName,
      message: message,
      timestamp: Date.now()
    }
    localLog.fatal( log.className +" - " + log.functionName + " - " + log.message);
    if (process.env.API_LOGS != null) {
      let appId = "unique"
      if (process.env.APPLICATION_ID) appId = process.env.APPLICATION_ID 
      Axios
      .post(process.env.API_LOGS +"/"+APPLICATION+"/"+appId+"/crit",log)   
      .catch(function(err){
        localLog.error( "Error al notificar Log al servidor");
      });
    }
  };

  public static LogWarning (className: string, functionName: string, message: string) {
    let log = {
      className: className,
      functionName: functionName,
      message: message,
      timestamp: Date.now()
    }
    localLog.warn( log.className +" - " + log.functionName + " - " + log.message);
    if (process.env.API_LOGS != null) {
      let appId = "unique"
      if (process.env.APPLICATION_ID) appId = process.env.APPLICATION_ID 
      Axios
      .post(process.env.API_LOGS +"/"+APPLICATION+"/"+appId+"/warning",log)   
      .catch(function(err){
        localLog.error( "Error al notificar Log al servidor");
      });
    }
  };

  public static LogNotice (className: string, functionName: string, message: string) {
    let log = {
      className: className,
      functionName: functionName,
      message: message,
      timestamp: Date.now()
    }
    localLog.trace( log.className +" - " + log.functionName + " - " + log.message);
    if (process.env.API_LOGS != null) {
      let appId = "unique"
      if (process.env.APPLICATION_ID) appId = process.env.APPLICATION_ID
      Axios
      .post(process.env.API_LOGS +"/"+APPLICATION+"/"+appId+"/notice",log)  
      .catch(function(err){
        localLog.error( "Error al notificar Log al servidor");
      }); 
    }
  };

  public static LogInfo (className: string, functionName: string, message: string) {
    let log = {
      className: className,
      functionName: functionName,
      message: message,
      timestamp: Date.now()
    }
    localLog.info( log.className +" - " + log.functionName + " - " + log.message);
    if (process.env.API_LOGS != null) {
      let appId = "unique"
      if (process.env.APPLICATION_ID) appId = process.env.APPLICATION_ID
      Axios
      .post(process.env.API_LOGS + "/"+APPLICATION+"/"+appId+"/info",log)  
      .catch(function(err){
        localLog.error( "Error al notificar Log al servidor");
      }); 
    }
  };
  

}