// ==========
// File Name: addGuide.jsx
// File URI: http://sakurachiro.com/_exercise/javascript/jsx/addGuide.jsx
// Description: 選択範囲にあわせてガイドを引く
// Author: makoto
// Version: 1.0.0
// Author URI: http://blog.sakurachiro.com/
// Copyright: Copyright 2010 makoto
// ==========
function selectionRange(){
	try {
		//選択範囲を取得
		var boundsObj = activeDocument.selection.bounds;
		x1 = parseInt(boundsObj[0]);
		y1 = parseInt(boundsObj[1]);
		x2 = parseInt(boundsObj[2]);
		y2 = parseInt(boundsObj[3]);

		//選択範囲にガイドを引く
		guideWrap("Vrtc",x1);//左上
		guideWrap("Vrtc",x2);//右上
		guideWrap("Hrzn",y1);//左上
		guideWrap("Hrzn",y2);//左下
	}
	catch(e){
		alert("選択範囲がありません。");
	}
}

function guideWrap(direction,position){
var id1 = charIDToTypeID( "Mk  " );
    var desc1 = new ActionDescriptor();
    var id2 = charIDToTypeID( "Nw  " );
        var desc2 = new ActionDescriptor();
        var id3 = charIDToTypeID( "Pstn" );
        var id4 = charIDToTypeID( "#Pxl" );
        desc2.putUnitDouble( id3, id4, position );
        var id5 = charIDToTypeID( "Ornt" );
        var id6 = charIDToTypeID( "Ornt" );
        var id7 = charIDToTypeID( direction );
        desc2.putEnumerated( id5, id6, id7 );
    var id8 = charIDToTypeID( "Gd  " );
    desc1.putObject( id2, id8, desc2 );
executeAction(id1,desc1,DialogModes.NO);
}

// ==========
// 実行
// ==========
selectionRange();