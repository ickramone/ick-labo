#target photoshop
$.appEncoding  =  "UTF-8";

var doc = app.activeDocument;
var dName = doc.name;
var dPath = doc.fullName;
var fPath = doc.path;

layName = doc.artLayers[0].name;
layPos = doc.artLayers[0].bounds;
layKind = doc.artLayers[0].kind;
laytxtOpacity = doc.artLayers[0].fillOpacity;
laytxtgrouped = doc.artLayers[0].grouped;
laytxtBg = doc.artLayers[0].isBackgroundLayer;
layTName = doc.artLayers[0].typename;
layLength = doc.artLayers.length;
layblendMode = doc.artLayers[0].blendMode;
layVisible = doc.artLayers[0].visible;

$.writeln (dName);
$.writeln (dPath);
$.writeln (fPath);
$.writeln (layName);
$.writeln (layKind);
$.writeln (laytxtOpacity);
$.writeln (laytxtgrouped);
$.writeln (laytxtBg);
$.writeln (layPos);
$.writeln (layTName);
$.writeln (layLength);
$.writeln (layblendMode);
$.writeln (layVisible);
//alert(dName);
//alert(dPath);
//alert(fPath);
