interface LabelledValue {
    label: string;
    color?: string;
    readonly sizes: number;
}
function printLabel(labelledObj: LabelledValue) {
    console.log(labelledObj.sizes);
}
let myObj = {size: 10, label: 'size', sizes: 20};
printLabel(myObj);

let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
a = ro as number[];

interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
// mySearch = function(source: string, subString: string) {
//   let result = source.search(subString);
//   return result > -1;
// }
mySearch = function(src: string, sub: string): boolean {
    let result = src.search(sub);
    return result > -1;
  }

interface StringArray {
    [index: number]: string;
}
let myArray: StringArray;
myArray = ['a', 'b'];
let myStr: string = myArray[0];


interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}

class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h:number,m:number){}
}

interface Shape {
    color: string;
}
interface PenStroke {
    penWidth: number;
}
interface Square extends Shape, PenStroke {
    sideLength: number;
}

let square = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;