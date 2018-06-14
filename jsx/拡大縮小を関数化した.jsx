transform(0,0,50,50,20);
/*
  var xtransf; ｘの移動距離
  var ytransf; ｙの移動距離
  var wscale; ｘのスケール
  var hscale; ｙのスケール
  var rotate; 回転（反時計）
*/

function transform(xtransf, ytransf, wscale, hscale, rotate) {
  var idTrnf = charIDToTypeID("Trnf");
  var desc83 = new ActionDescriptor();
  var idnull = charIDToTypeID("null");
  var ref23 = new ActionReference();
  var idLyr = charIDToTypeID("Lyr ");
  var idOrdn = charIDToTypeID("Ordn");
  var idTrgt = charIDToTypeID("Trgt");
  ref23.putEnumerated(idLyr, idOrdn, idTrgt);
  desc83.putReference(idnull, ref23);
  var idFTcs = charIDToTypeID("FTcs");
  var idQCSt = charIDToTypeID("QCSt");
  var idQcszero = charIDToTypeID("Qcs0");
  desc83.putEnumerated(idFTcs, idQCSt, idQcszero);
  var idOfst = charIDToTypeID("Ofst");
  var desc84 = new ActionDescriptor();
  var idHrzn = charIDToTypeID("Hrzn");
  var idPxl = charIDToTypeID("#Pxl");
  desc84.putUnitDouble(idHrzn, idPxl, xtransf); // X transform offest amount in pixels
  var idVrtc = charIDToTypeID("Vrtc");
  var idPxl = charIDToTypeID("#Pxl");
  desc84.putUnitDouble(idVrtc, idPxl, ytransf); // Y transform offest amount in pixels
  var idOfst = charIDToTypeID("Ofst");
  desc83.putObject(idOfst, idOfst, desc84);
  var idWdth = charIDToTypeID("Wdth");
  var idPrc = charIDToTypeID("#Prc");
  desc83.putUnitDouble(idWdth, idPrc, wscale); // Width amount %
  var idHght = charIDToTypeID("Hght");
  var idPrc = charIDToTypeID("#Prc");
  desc83.putUnitDouble(idHght, idPrc, hscale); // Height amount %
  var idAngl = charIDToTypeID("Angl");
  var idAng = charIDToTypeID("#Ang");
  desc83.putUnitDouble(idAngl, idAng, rotate); // rotational angle
  var idIntr = charIDToTypeID("Intr");
  var idIntp = charIDToTypeID("Intp");
  var idBcbc = charIDToTypeID("Bcbc");
  desc83.putEnumerated(idIntr, idIntp, idBcbc);
  executeAction(idTrnf, desc83, DialogModes.NO);
}
