#target Photoshop

var startRulerUnits = app.preferences.rulerUnits;
var startTypeUnits  = app.preferences.typeUnits;

startRulerUnits = Units.PIXELS;
startTypeUnits  = TypeUnits.POINTS;

var width  = 800;
var height = 200;
var dpi    = 72;

var doc = app.documents.add(width,height,dpi);


app.activeDocument = doc;

var i;
for (i = 1; i < 50; i++){
	var newLayerRef = doc.artLayers.add();
	newLayerRef.name = "Number"+i;
	newLayerRef.kind = LayerKind.TEXT;
	var textItemRef = doc.artLayers["Number"+i].textItem;
    var x = Math.random(800);
    var y = Math.random(200);
	textItemRef.contents += i;
    textItemRef.position = Array(1000*y,100*x);
	textItemRef.size= 32 * x;
    textItemRef.justification = Justification.CENTERJUSTIFIED;
}