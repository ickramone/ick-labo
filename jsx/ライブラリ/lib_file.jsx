// Adobe CS4-CS5 File Library
// By KaZuhiro FuRuhata
// 2011.3.2

// サブフォルダ内にあるファイルも取得するメソッド
var $$ = {};
$$.file = $$.file || {
  // ------------------------------------------------------------------------------------
  // ファイル一覧を取得
  // パラメータ１：文字列の場合はFolder.getFiles()と同じ
  //
  // オプション：
  // japanese : 日本語ファイル名に変換しnameJ, fullNameJプロパティに変換後の名前を入れる
  // ------------------------------------------------------------------------------------
  getFiles: function(fileTypes, basePath, options) {
    options = options || {};
    if (!basePath) {
      basePath = Folder.selectDialog("フォルダを選択してください");
      if (!basePath) {
        return;
      } // キャンセルされた場合は処理しない
    }
    var allList = [];
    // パラメータが文字の場合
    if (typeof(fileTypes) == "string") {
      //$.writeln("string type");
      getFileList(new Folder(basePath), fileTypes);
      return toJapanese(allList, options.japanese);
    }
    // パラメータが配列の場合
    if (fileTypes.push) {
      //$.writeln("Array type");
      for (var i = 0; i < fileTypes.length; i++) {
        getFileList(new Folder(basePath), fileTypes[i]);
      }
      return toJapanese(allList, options.japanese);
    }

    function getFileList(currentFolder, fileType) {
      var fileList = currentFolder.getFiles(fileType);
      var fileList2 = currentFolder.getFiles("*"); // Sub Folder
      //$.writeln(basePath+" = "+fileList.length);
      allList = allList.concat(fileList);
      for (var i = 0; i < fileList2.length; i++) {
        if (fileList2[i].getFiles) {
          if (fileList2[i].name.charAt(0) == ".") {
            continue;
          }
          //$.writeln("Folder : "+fileList2[i]);
          getFileList(fileList2[i], fileType); // フォルダがある限り繰り返し
        }
      }
    }
    // 日本語に変換(nameJ, fullNameJ)
    function toJapanese(fileList, flag) {
      if (!flag) {
        return fileList;
      }
      for (var i = 0; i < fileList.length; i++) {
        fileList[i].nameJ = File.decode(fileList[i].name);
        fileList[i].fullNameJ = File.decode(fileList[i].fullName);
        //$.writeln(">>"+fileList[i].nameJ);
      }
      return fileList;
    }
  },

  // ------------------------------------------------------------------------------------
  // フォルダ一覧を取得
  // パラメータ１：取得する際の基準（ルートとなる）パス。配列で複数の基準パスを指定できる
  // ------------------------------------------------------------------------------------
  getFolders: function(basePath) {
    if (!basePath) {
      basePath = Folder.selectDialog("基準フォルダを選択してください");
      if (!basePath) {
        return;
      } // キャンセルされた場合は処理しない
    }
    var allList = [];
    // パラメータが配列の場合
    if (basePath.push) {
      //$.writeln("Array type");
      for (var i = 0; i < basePath.length; i++) {
        getFolderList(new Folder(basePath[i]));
      }
      return allList;
    }
    // パラメータがオブジェクトの場合
    if (typeof(basePath) == "object") {
      //$.writeln("object type");
      getFolderList(basePath);
      return allList;
    }
    // パラメータが文字の場合
    if (typeof(basePath) == "string") {
      //$.writeln("string type");
      getFolderList(new Folder(basePath));
      return allList;
    }

    function getFolderList(currentFolder) {
      var fileList = currentFolder.getFiles("*"); // Sub Folder
      //$.writeln(basePath+" = "+fileList.length);
      for (var i = 0; i < fileList.length; i++) {
        if (fileList[i].getFiles) {
          allList.push(fileList[i]);
          //$.writeln("Folder : "+fileList[i]);
          getFolderList(fileList[i]); // フォルダがある限り繰り返し
        }
      }
    }
  }

}
