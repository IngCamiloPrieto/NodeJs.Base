export abstract class Utils {         
    // Return a number in interval
    public static randomIntFromInterval = (min : number, max : number) : number => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    public static filterObject = (obj, predicate) => Object.keys(obj).filter(key => predicate(obj[key])).reduce((res, key) => (res[key] = obj[key], res), {});

}