fObj = app.fonts;
filename = File.saveDialog("保存ファイル名を入れて下さい");
  if (filename) {
    fileObj = new File(filename);
    flag = fileObj.open("w");
      if (flag == true) {
        for(i=0; i<fObj.length; i++) {
          text = fObj[i];
          fileObj.writeln(text);
        }
        fileObj.close();
      } else {
        alert("ファイルが開けませんでした");
      }
  }
