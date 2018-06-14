///<reference path="./photoshop.d.ts/dist/cc/ps.types.d.ts"/>
///<reference path="./photoshop.d.ts/dist/cc/es.d.ts"/>
var str1 = 'LC_Base1';
var regP = /(LC_Base)(\d+)/; //正規表現マッチ用 基準座標
var regC = /(LC_)(\d+)/; //正規表現マッチ用 ローカル座標用
var red = str1.match(regP);
var tt = red[2];
var ts = red[1];
alert(str1.match(regP)); //BCが表示される
// $.writeln(red[0]); //BCが表示される
// $.writeln(red[1]); //BCが表示される
// $.writeln(red[2]); //BCが表示される
alert(red[0]);
alert(red[1]);
alert(red[2]);
