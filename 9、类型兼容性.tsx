// interface Empty<T> {
// }
// let x: Empty<number>;
// let y: Empty<string>;

// x = y;  //

// interface NotEmpty<T> {
//     data: T;
// }
// let x: NotEmpty<number>;
// let y: NotEmpty<string>;
// // x = y;

// function identity<T>(arg: T):T {
//     return arg;
// }

// // let myIdentity: <T>(arg: T) => T = identity;
// let myIdentity: <U>(arg: U) => U = identity;

// let output = identity<string>("myString");
// let o = identity("my");

// function loggingIdentity<T>(arg: Array<T>): T[]{
//     console.log(arg.length);  // Array has a .length, so no more error
//     return arg;
// }

interface GenericIdentityFn<T> {
    <T>(arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;

class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 22;
myGenericNumber.add = function(x, y) { return x + y }

interface Lengthwise {
    length: number;
}
function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // Now we know it has a .length property, so no more error
    return arg;
}

loggingIdentity([])

function getProperty(obj: T, key: K) {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3, d: 4 };

getProperty(x, "a"); // okay
getProperty(x, "m"); // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.

interface Bird {
    fly();
    layEggs();
}

interface Fish {
    swim();
    layEggs();
}

function getSmallPet(): Fish & Bird {
    // ...
}

let pet = getSmallPet();
pet.layEggs(); // okay
pet.swim();    // errors


function padLeft(value: string, padding: string | number) {
    if (typeof padding === "number") {
        return Array(padding + 1).join(" ") + value;
    }
    if (typeof padding === "string") {
        return padding + value;
    }
    throw new Error(`Expected string or number, got '${padding}'.`);
}