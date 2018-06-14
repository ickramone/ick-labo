
class OperateChildFolders extends SettingDialog

	label:
		windowName:'子フォルダを操作'
		action:
			group:"アクション"
			rename:"リネーム"
			create:"新規作成"
			sort:"並び替え"
		arr:"配列"
		prefix:"接頭辞"
		suffix:"接尾辞"
		sort:
			group:"フォルダの並び順"
			ASC:"昇順"
			DSC:"降順"
		intent:
			ok:"実行"
			cancel:"キャンセル"

	constructor : (windowName) ->
		that = @
		super(@label.windowName)
		@addRadioButtonWithLabel
			groupName:@label.action.group
			values:
				rename:
					text:@label.action.rename
					value:true
					onClick:->
						that.toggleInputTextEnabled(true)
				create:
					text:@label.action.create
					onClick:->
						that.toggleInputTextEnabled(true)
				sort:
					text:@label.action.sort
					onClick:->
						that.toggleInputTextEnabled(false)
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

	toggleInputTextEnabled: (bool)->
		@uDlg[@label.arr].enabled = bool
		@uDlg[@label.prefix].enabled = bool
		@uDlg[@label.suffix].enabled = bool

	onClickedOK: ()=>
		@asc = @uDlg[@label.sort.group]["ASC"].value
		if @uDlg[@label.action.group]["rename"].value
			@onSelectRename()
		if @uDlg[@label.action.group]["create"].value
			@onSelectCreate()
		if @uDlg[@label.action.group]["sort"].value
			@onSelectSort()
		@uDlg.close()

	onSelectRename: ()->
		arr = @getArrayFromInput(@uDlg[@label.arr].text)
		if arr
			prefix = @uDlg[@label.prefix].text
			suffix = @uDlg[@label.suffix].text
			layerSets = activeDocument.activeLayer.layerSets
			for layer,index in layerSets
				i = if @asc then index else layerSets.length-index-1
				if layer.name && arr[i]
					layer.name = prefix + arr[i] + suffix

	onSelectCreate: ()->
		arr = @getArrayFromInput(@uDlg[@label.arr].text)
		if arr
			prefix = @uDlg[@label.prefix].text
			suffix = @uDlg[@label.suffix].text
			layerSets = activeDocument.activeLayer.layerSets
			for index in arr
				layerSets.add()
			for layer,index in layerSets
				i = if @asc then index else layerSets.length-index-1
				if layer.name && arr[i]
					layer.name = prefix + arr[i] + suffix

	onSelectSort: ()->
		layerSets = activeDocument.activeLayer.layerSets
		if @asc
			for l,i in layerSets
				for layer,index in layerSets
					if index < layerSets.length-1
						nextLayer = layerSets[index+1]
						if layer.name > nextLayer.name
							if index == layerSets.length-2
								nextLayer.moveBefore(layer)
							else
								layer.moveAfter(nextLayer)
		else
			for l,i in layerSets
				for layer,index in layerSets
					if index < layerSets.length-1
						nextLayer = layerSets[index+1]
						if layer.name < nextLayer.name
							if index == layerSets.length-2
								nextLayer.moveBefore(layer)
							else
								layer.moveAfter(nextLayer)


ocf = new OperateChildFolders()
ocf.showWindow()
