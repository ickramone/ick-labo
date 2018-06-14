// Adobe CS4-CS5 File Library
// By KaZuhiro FuRuhata
// 2011.3.2
#include "lib_file.jsx"

// フォルダ選択ダイアログを開いて、フォルダ一覧を取得（サブフォルダ内も取得）

f = $$.file.getFolders();
for (var j = 0; j < f.length; j++) {
  $.writeln(f[j].fullName);
}
$.writeln("1:-------------------------------------------");

// デスクトップ内にあるフォルダ一覧を取得（サブフォルダ内も取得）
f = $$.file.getFolders("~/Desktop/comipo");
for (var j = 0; j < f.length; j++) {
  $.writeln(f[j].fullName);
}
$.writeln("2:-------------------------------------------");

// フォルダ選択ダイアログを開いて、デスクトップ内にあるフォルダ一覧を取得（サブフォルダ内も取得）
f = $$.file.getFolders(["~/Desktop/comipo", "~/Sites"]);
for (var j = 0; j < f.length; j++) {
  $.writeln(f[j].fullName);
}
$.writeln("3:-------------------------------------------");
