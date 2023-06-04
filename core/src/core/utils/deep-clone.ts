export const deepClone = (obj: any) => {
    let clonedObj: { [key: string]: any; } = {};

    for (let prop in obj) {
        if (typeof obj[prop] === "object" && obj[prop] !== null) {
            clonedObj[prop] = deepClone(obj[prop]); // recursive call to clone nested objects
        } else {
            clonedObj[prop] = obj[prop];
        }
    }

    return clonedObj;
}