const cloneDeep = (obj) => {
    var newObj;
    if (obj instanceof Array) {
        newObj = new Array;
    } else if (obj instanceof Object) {
        newObj = new Object;
    } else if (obj == undefined) {
        newObj = undefined;
    }
    for (let i in obj) {
        if (obj[i] instanceof Object) {
            if (obj instanceof Array) {
                newObj.push(cloneDeep(obj[i]));
            } else if (obj instanceof Object) {
                newObj[i] = cloneDeep(obj[i]);
            }
        } else {
            if (obj instanceof Array) {
                newObj.push(obj[i]);
            } else if (obj instanceof Object) {
                newObj[i] = obj[i];
            }
        }
    }
    return newObj;
}

let arr = [undefined,1,2,[3,4],{a:1, b: [8, {c: 9, d: [3,4]}]}];

console.log(JSON.stringify(cloneDeep(arr)));
