export abstract class postgresHelper {         
  // Convert Javascript date to Pg YYYY-MM-DD HH:MI:SS
  public static pgFormatDate = (date : number) => { 
    const zeroPad = (d) => {
      return ("0" + d).slice(-2);
    };
    let parsed = new Date(date);
    return [parsed.getUTCFullYear(), zeroPad(parsed.getMonth() + 1), zeroPad(parsed.getDate())].join("-") + " " +  [zeroPad(parsed.getHours()), zeroPad(parsed.getMinutes()), zeroPad(parsed.getSeconds())].join(":");
  };
}