var CR = String.fromCharCode(13);
var fnt = app.fonts
for (var i = 0; i < fnt.length; i++) {
  $.writeln (fnt[i].postScriptName + CR);
  }
alert();
