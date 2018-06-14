 // Adobe CS4-CS5 File Library
// By KaZuhiro FuRuhata
// 2011.3.1
#include "lib_file.jsx"

// フォルダ選択ダイアログを開いて、JPEGファイルを取得（サブフォルダ内も取得）
//f = $$.file.getFiles("*.jpg");
f = $$.file.getFiles("*.jpg");
for (var j = 0; j < f.length; j++) {
  $.writeln(f[j].name);
}
$.writeln("1:-------------------------------------------");

// フォルダ選択ダイアログを開いて、テキストとJPEGファイルを取得（サブフォルダ内も取得）
f = $$.file.getFiles(["*.txt", "*.jpg"]);
for (var j = 0; j < f.length; j++) {
  $.writeln(f[j].name);
}
$.writeln("2:-------------------------------------------");

// デスクトップのmovファイルを取得（サブフォルダ内も取得）
f = $$.file.getFiles("*.mov", "~/Desktop");
for (var j = 0; j < f.length; j++) {
  $.writeln(f[j].name);
}
$.writeln("3:-------------------------------------------");

// フォルダ選択ダイアログを開いて、テキストとJPEGファイルを取得（サブフォルダ内も取得）
// その後、日本語ファイル名とパス名に変換しnameJ, fullNameJに入れる
f = $$.file.getFiles(["*.txt", "*.jpg"], null, {
  japanese: true
});
$.writeln("4:-------------------------------------------");
for (var i = 0; i < f.length; i++) {
  if (f[i].nameJ) {
    $.writeln(f[i].fullNameJ);
  }
}
