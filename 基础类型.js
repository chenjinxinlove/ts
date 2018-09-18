// 布尔
var isDone = false;
// 数字
var decLiteral = 6;
var hexLiteral = 0xf00d;
var binaryLiteral = 10;
var octalLiteral = 484;
// 字符串
var namea = "bob";
namea = "smith";
// 数组
var list = [1, 2, 3];
var listArray = [1, 2, 3];
// 元组
var x;
x = ['hello', 10];
// 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
// 空值
var unusable = undefined;
// Never
function error(message) {
    throw new Error(message);
}
// 断言
var someValue = 'this is a sting';
// let strLength: number = (<string>someValue).length;
var strLength = someValue.length;
