function printLabel(labelledObj) {
    console.log(labelledObj.sizes);
}
var myObj = { size: 10, label: 'size', sizes: 20 };
printLabel(myObj);
var a = [1, 2, 3, 4];
var ro = a;
a = ro;
var mySearch;
// mySearch = function(source: string, subString: string) {
//   let result = source.search(subString);
//   return result > -1;
// }
mySearch = function (src, sub) {
    var result = src.search(sub);
    return result > -1;
};
var myArray;
myArray = ['a', 'b'];
var myStr = myArray[0];
var Clock = /** @class */ (function () {
    function Clock(h, m) {
    }
    Clock.prototype.setTime = function (d) {
        this.currentTime = d;
    };
    return Clock;
}());
var square = {};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;
