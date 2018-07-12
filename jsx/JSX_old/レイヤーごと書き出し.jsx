/*
 * ●こぴーらいと @2009
 * 作成者 : aulta
 * 配布元 : http://blog.aulta.net/
 * ツイッター : @aulta : http://twitter.com/aulta/
 * 改変、再配布などは自由です。
 *
 * ●謝辞
 * http://sygnas.tv/arc/ruputer/2007/07/post_198.html
 * ファイル出力において、上記のページのスクリプトを参考にさせて頂きました。
 */
var aulta = {
    utility : {
        trim : function(text){
            if (text == null) return '';
            return text.replace(/^[ ]+|[ ]+$/g, '');
        }
    }
    ,   //  レイヤーごとに書き出し
    layer2file : {
        val : {
            layers : []
            , formats : ['PSD', 'PNG', 'BMP', 'JPG']
        }
        ,
        run : function(){
            //  保存先をセット
            var pathSave = aulta.setSavePath();
            if (pathSave.length == 0) return;

            //  対象レイヤーを取得して、全レイヤーを非表示に。
            (function(){
                for (var i = 0, j = activeDocument.layers.length; i < j; i++){
                    var lay = activeDocument.layers[i];
                    if(lay.visible != false){
                        aulta.layer2file.val.layers.push(lay);
                        lay.visible = false;
                    }
                }
            })();

            //  形式を尋ねながら出力
            var arr = aulta.layer2file.val.formats;
            for (var i = 0, j = arr.length; i < j; i++){
                if (confirm(arr[i] + ' 形式で出力しますか？')){
                    //  出力処理
                    (function(doc, format, arrLayers){
                        for (var i = 0, j = arrLayers.length; i < j; i++){
                            var lay = arrLayers[i]
                                , fileName = pathSave + lay.name;
                            lay.visible = true;
                            aulta.saveImage(doc, fileName, format); //  出力
                            lay.visible = false;
                        }
                    })(activeDocument, arr[i], aulta.layer2file.val.layers);

                }
            }

            //  表示状態を元に戻す
            (function(arr){
                for (var i = 0, j = arr.length; i < j; i++){
                    arr[i].visible = true;
                }
            })(aulta.layer2file.val.layers);

            alert('終了しました。');
        }
    }
    ,   //  保存先を取得
    setSavePath : function(){
        var buf = prompt('保存先のディレクトリをフルパスで入力してください。', activeDocument.path);
        buf = aulta.utility.trim(buf);
        if (buf.length == 0) return '';
        return buf + (buf.substr(buf.length - 1) == '\' ? '' : '\');
    }
    ,   //  ファイル保存
    saveImage : function(doc, fileName, format){
        var opt;
        switch( format ){
            case 'PSD':
                opt = new PhotoshopSaveOptions();
                opt.alphaChannels = true;
                opt.embedColorProfile = true;
                opt.annotations = true;
                opt.layers = false;
                opt.spotColors = true;
                opt.ext = '.psd';
                break;
            case 'PNG':
                opt = new PNGSaveOptions();
                opt.interlaced = false;
                opt.ext = '.png';
                break;
            case 'BMP':
                opt = new BMPSaveOptions();
                opt.alphaChannels = false;
                opt.depth = BMPDepthType.TWENTYFOUR;
                opt.osType = OperatingSystem.WINDOWS;
                opt.rleCompression = false;
                opt.ext = '.bmp';
                break;
            case 'JPG':
                opt = new JPEGSaveOptions();
                opt.embedColorProfile = true;
                opt.formatOptions = FormatOptions.STANDARDBASELINE;
                opt.matte = MatteType.BACKGROUND;
                opt.quality = 9;
                opt.ext = '.jpg';
                break;
        }
        var fileObj = new File( fileName + opt.ext );
        doc.saveAs( fileObj, opt, true, Extension.LOWERCASE );
    }
};

(function(){
    aulta.layer2file.run();
})();
