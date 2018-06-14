///<reference path="./photoshop.d.ts/dist/cc/ps.types.d.ts"/>
var foo = 123;
var Bar = /** @class */ (function () {
    function Bar() {
    }
    return Bar;
}());
var bar = new Bar();
alert(bar);
function getBMI(weight, tall) {
    return weight / (tall * tall);
}
var bmi = getBMI(65, 1.75);
var pos = activeDocument.bounds;
alert(pos[0] + pos[1]);
