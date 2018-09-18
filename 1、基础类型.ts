// 布尔
let isDone: boolean = false;
// 数字
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
// 字符串
let namea: string = "bob";
namea = "smith";
// 数组
let list: number[] = [1, 2, 3];
let listArray: Array<number> = [1, 2, 3];

// 元组

let x: [string, number];
x = ['hello', 10];

// 枚举

enum Color {Red, Green, Blue}
let c: Color = Color.Green;

// 空值

let unusable: void = undefined;

// Never

function error(message: string): never {
    throw new Error(message);
}

// 断言

let someValue: any = 'this is a sting';
// let strLength: number = (<string>someValue).length;
let strLength: number = (someValue as string).length;

