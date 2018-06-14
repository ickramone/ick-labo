$.appEncoding  =  "UTF-8";
//今の画像の単位を記憶
ref_ruler = app.preferences.rulerUnits;
//画像の単位をピクセルに
app.preferences.rulerUnits =Units.PIXELS
//画像の変更をせずに解像度の変更
//現在の画像サイズを記憶
ref_width = activeDocument.width;
ref_height = activeDocument.height;
ref_resolution = activeDocument.resolution;
// ドキュメントの解像度が 72ppi でなければ
if (activeDocument.resolution !== 72) {
  // alert("解像度が72ppiではありません。「編集＞画像解像度」から解像度 72 pixel/inch にしてください。");
  //解像度の変更
  activeDocument.resizeImage(ref_width ,ref_height,72);
}

/*
選択したMAPを左上から右下に向かって2048ピクセルごとに画像を切り出し
切り出した画像を　00XX_02_00[1-9].png　命名規則で書き出しするスクリプト
*/

//変数
var w,//ドキュメントの横
h,//ドキュメントの縦
wtimes,//画像をクリップするときの横の回数
htimes,//画像をクリップするときの縦の回数
dirArr,//ガイドを引く時の向き
times,//ガイドを引く時の回数
doc,
lay,//アクティブレイヤー
//cutarea,//選択範囲の座標　配列
count,//wtimes*htimes ファイル名の最後の番号として使う
fname,//ファイル名
fpath;//保存するパス　開いているドキュメントと同じパス

//初期化
w = activeDocument.width.value;
h = activeDocument.height.value;
wtimes = parseInt(w / 2048);
htimes = parseInt(h / 2048);
dirArr  =  ["Vrtc", "Hrzn"];//向き
//縦か横どちらか長い方割る2048　0にも引きたいので+1
if (w < h) {
  times = parseInt(h / 2048) + 1;
} else {
  times = parseInt(w / 2048) + 1;
}
doc = app.activeDocument;
lay = doc.activeLayer;
cutarea = [[0,0], [2048,0], [2048,2048], [0,2048]];
fname = lay.name;
fpath = activeDocument.path;
count = wtimes*htimes;
var count9 = 8;//9マスタイプでダミーを挟む場合
var count6 = 5;//6マスタイプでダミーを挟む場合

/* 選択範囲の座標を指定
wtimes,htimesの回数だけ　最大：w3回 h3回 */
row1col1 = [[0,0], [2048,0], [2048,2048], [0,2048]];
row1col2 = [[2048,0], [4096,0], [4096,2048], [2048,2048]];
row1col3 = [[4096,0], [6144,0], [6144,2048], [4096,2048]];
row2col1 = [[0,2048], [2048,2048], [2048,4096], [0,4096]];
row2col2 = [[2048,2048], [4096,2048], [4096,4096], [2048,4096]];
row2col3 = [[4096,2048], [6144,2048], [6144,4096], [4096,4096]];
row3col1 = [[0,4096], [2048,4096], [2048,6144], [0,6144]];
row3col2 = [[2048,4096], [4096,4096], [4096,6144], [2048,6144]];
row3col3 = [[4096,4096], [6144,4096], [6144,6144], [4096,6144]];

//メイン
makeGrid();//ガイドを引く

// Textureフォルダが存在しない場合は作成する
var dir = new Folder(fpath + '/Texture');
if (! dir.exists) dir.create();

/* 選択したレイヤーの名前が
00XX_01 だったらdoCutImages()を実行
00XX_01 だったらdoCutImages2()を実行
*/
if (fname.match(/.*\_02$/g)) {
doCutImages2();
} else {
doCutImages();
}



function doCutImages2() {
  /*doCutImages()とだいたい一緒だけど、
  2*2と2*3と3*2のときにダミーの黒を差し込む処理が追加される
  */
  if (wtimes == 2 && htimes == 2) {
    cutImages(row2col2); //5回目
    count6--;
    cutImages(row2col2); //4回目
    count6--;
    black(); //3回目 黒
    count6--;
    cutImages(row1col2); //2回目
    count6--;
    cutImages(row1col1); //1回目
  } else if (wtimes == 2 && htimes == 3) {
    cutImages(row3col2); //8回目
    count9--;
    cutImages(row3col1); //7回目
    count9--;
    black(); //6回目 黒
    count9--;
    cutImages(row2col2); //5回目
    count9--;
    cutImages(row2col1); //4回目
    count9--;
    black(); //3回目 黒
    count9--;
    cutImages(row1col2); //2回目
    count9--;
    cutImages(row1col1); //1回目
  } else if (wtimes == 3 && htimes == 2) {
    cutImages(row2col3); //6回目
    count--;
    cutImages(row2col2); //5回目
    count--;
    cutImages(row2col1); //4回目
    count--;
    cutImages(row1col3); //3回目
    count--;
    cutImages(row1col2); //2回目
    count--;
    cutImages(row1col1); //1回目
  } else { //(wtimes == 3 && htimes == 3)
    cutImages(row3col3); //9回目
    count--;
    cutImages(row3col2); //8回目
    count--;
    cutImages(row3col1); //7回目
    count--;
    cutImages(row2col3); //6回目
    count--;
    cutImages(row2col2); //5回目
    count--;
    cutImages(row2col1); //4回目
    count--;
    cutImages(row1col3); //3回目
    count--;
    cutImages(row1col2); //2回目
    count--;
    cutImages(row1col1); //1回目
  }
}

function doCutImages() {
  /*選択範囲をcutImages(cutrect);に渡す
  全部でwtimes*htimes回数の切り出しを行う
  切り出し順番をifに書く
  */
  if (wtimes == 2 && htimes == 2) {
    cutImages(row2col2); //4回目
    count--;
    cutImages(row2col1); //3回目
    count--;
    cutImages(row1col2); //2回目
    count--;
    cutImages(row1col1); //1回目
  } else if (wtimes == 2 && htimes == 3) {
    cutImages(row3col2); //6回目
    count--;
    cutImages(row3col1); //5回目
    count--;
    cutImages(row2col2); //4回目
    count--;
    cutImages(row2col1); //3回目
    count--;
    cutImages(row1col2); //2回目
    count--;
    cutImages(row1col1); //1回目
  } else if (wtimes == 3 && htimes == 2) {
    cutImages(row2col3); //6回目
    count--;
    cutImages(row2col2); //5回目
    count--;
    cutImages(row2col1); //4回目
    count--;
    cutImages(row1col3); //3回目
    count--;
    cutImages(row1col2); //2回目
    count--;
    cutImages(row1col1); //1回目
  } else { //(wtimes == 3 && htimes == 3)
    cutImages(row3col3); //9回目
    count--;
    cutImages(row3col2); //8回目
    count--;
    cutImages(row3col1); //7回目
    count--;
    cutImages(row2col3); //6回目
    count--;
    cutImages(row2col2); //5回目
    count--;
    cutImages(row2col1); //4回目
    count--;
    cutImages(row1col3); //3回目
    count--;
    cutImages(row1col2); //2回目
    count--;
    cutImages(row1col3); //1回目
  }
}

function cutImages(cutrect) {
  //select()メソッドを使う
  //引数は1番目座標、2番め選択方法、3番目ぼかし、4番目アンチエイリアス
  doc.selection.select(cutrect, SelectionType.REPLACE, 0, false);
  //画像をコピー
  activeDocument.selection.copy();
  //新規ドキュメント作成　2048*2048
  app.documents.add(2048, 2048);
  //ペースト
  activeDocument.paste();
  //PNG書き出し
  if (fname.match(/.*\_02$/g)) { //02の方を選んでいたら
    if (wtimes == 2 && htimes == 2) { //さらに2*2だったら
      fileObj = new File(fpath + "/Texture/" + fname + "_00" + count6 + ".png");
    } else if (wtimes == 2 && htimes == 3) { //さらに2*3だったら
      fileObj = new File(fpath + "/Texture/" + fname + "_00" + count9 + ".png");
    } else {
      fileObj = new File(fpath + "/" + fname + "_00" + count + ".png");
    }
  } else { //01の方を選んでいたら
    fileObj = new File(fpath + "/Texture/" + fname + "_00" + count + ".png");
  }
  pngOpt = new PNGSaveOptions();
  pngOpt.interlaced = false;
  activeDocument.saveAs(fileObj, pngOpt, true, Extension.LOWERCASE);
  //ドキュメンとを閉じる
  activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

//黒のダミー画像を作成
function black() {
  //新規ドキュメント作成　2048*2048
  app.documents.add(2048, 2048);
  activeDocument.selection.selectAll();
  RGBColor = new SolidColor();
  RGBColor.red = 0;
  RGBColor.green = 0;
  RGBColor.blue = 0;
  activeDocument.selection.fill(RGBColor, ColorBlendMode.NORMAL, 100, false);
  //PNG書き出し
  if (wtimes == 2 && htimes == 3) {
    fileObj = new File(fpath + "/Texture/" + fname + "_00" + count9 + ".png");
  } else {
    fileObj = new File(fpath + "/Texture/" + fname + "_00" + count6 + ".png");
  }
  pngOpt = new PNGSaveOptions();
  pngOpt.interlaced = false;
  activeDocument.saveAs(fileObj, pngOpt, true, Extension.LOWERCASE);
  //ドキュメンとを閉じる
  activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

//ガイドを引く関数
function makeGrid () {
//位置の子に縦横で繰り返す
  for(var i = 0; i < times; times--){ //回数
    for(var j = 0; j < dirArr.length; j++){ //方向　V、H
          guideWrap (dirArr[j], 2048 * (times - 1));
        }
  }
}
//ガイド作成関数
function guideWrap (direction, position) {
var id1 = charIDToTypeID("Mk  ");
    var desc1 = new ActionDescriptor();
    var id2 = charIDToTypeID("Nw  ");
        var desc2 = new ActionDescriptor();
        var id3 = charIDToTypeID("Pstn");
        var id4 = charIDToTypeID("#Rlt"); //#Prc パーセント　#Rlt　ピクセル
        desc2.putUnitDouble(id3,id4,position);
        var id5 = charIDToTypeID("Ornt");
        var id6 = charIDToTypeID("Ornt");
        var id7 = charIDToTypeID(direction);
        desc2.putEnumerated(id5,id6,id7);
    var id8 = charIDToTypeID("Gd  ");
    desc1.putObject(id2,id8,desc2);
executeAction(id1, desc1, DialogModes.NO);
}
