
class DuplicateFoldersDialog extends SettingDialog

	label:
		windowName:'フォルダー複製'
		arr:"配列"
		prefix:"接頭辞"
		suffix:"接尾辞"
		sort:
			group:"フォルダの並び順"
			ASC:"昇順"
			DSC:"降順"
		intent:
			ok:"複製"
			cancel:"キャンセル"

	constructor : (windowName) ->
		super(@label.windowName)
		@addInputTextWithLabel(@label.arr,"")
		@addInputTextWithLabel(@label.prefix,"^-")
		@addInputTextWithLabel(@label.suffix,".png")
		@addRadioButtonWithLabel
			groupName:@label.sort.group
			values:
				ASC:
					text:@label.sort.ASC
					value:true
				DSC:
					text:@label.sort.DSC
		@addIntentButton(@label.intent.ok,@label.intent.cancel,30)

	onClickedOK: ()=>
		arr = @getArrayFromInput(@uDlg[@label.arr].text)
		if arr
			prefix = @uDlg[@label.prefix].text
			suffix = @uDlg[@label.suffix].text
			asc = @uDlg[@label.sort.group]["ASC"].value
			activeLayer = activeDocument.activeLayer
			layerSets = activeDocument.activeLayer.layerSets
			for key,index in arr
				if index < arr.length-1
					activeLayer.duplicate()
			parent = activeDocument.activeLayer.parent.layerSets
			if arr.length > 0
				for layer,ind in parent
					i = if asc then ind else parent.length-ind-1
					layer.name = prefix + arr[i] + suffix
		@uDlg.close()

dfd = new DuplicateFoldersDialog()
dfd.showWindow()
