class AssetExpress

	constructor : () ->
		@baseDir = activeDocument.path
		json = FileSystem.readJSON(@baseDir+"/"+@defaultConfig.config_file)
		all = json["*.psd"] ? {}
		active = json[activeDocument.name] ? {}
		@config = FileSystem.objectMerge(@defaultConfig,all,active)

	createConfig : ()->
		file = @config["config_file"]
		configFile = new File(activeDocument.path+"/"+file);
		createFile = (message)->
			fp = configFile.open("w")
			if fp
				txt = '{\n\t\"*.psd\":{\n\t\t\"images_dir\":\"./\",\n\t\t\"bg_color\":null,\n\t\t\"resize_even\":false,\n\t\t\"jpg\":{ \"quality\":80 },\n\t\t\"gif\":{ \"colors\":256 },\n\t\t\"png\":{ \"colors\":256, \"PNG8\":0 }\n\t}\n}'
				configFile.write(txt)
				alert "#{file}を#{message}"
				configFile.close()

		if configFile.exists
			if confirm "#{file}はすでに存在します。上書きしますか？"
				createFile("上書きました")
		else
			createFile("作成しました")

	imagesDir : () ->
		dir = FileSystem.readdir(activeDocument.path+"/"+@config.images_dir)

	even : (num) ->
		if @config["resize_even"]
			return if num*0.5-(num*0.5>>0) != 0 then num+1 else num
		else
			return num

	getColor : (color) ->
		_color = new RGB(color)
		c = new RGBColor()
		c.red = _color.r
		c.green = _color.g
		c.blue = _color.b
		return c

	fillLayer : (color) ->
		c = new RGBColor()
		c.red = color.r
		c.green = color.g
		c.blue = color.b
		activeDocument.selection.selectAll()
		activeDocument.selection.fill(c,ColorBlendMode.NORMAL, 100, false)

	parseName : (layer)->
		res = ""
		dp = @config["docname_placeholder"]
		pp = @config["parent_placeholder"]
		pap = @config["option_prefix"]
		pas = @config["option_separator"]
		paa = @config["option_assignment"]
		getName = (target) ->
			_n = target.name
			_pn = target.parent.name
			if _n.indexOf(pp) != -1
				if _pn.indexOf(pp) != -1
					res = _n.replace(pp,"")+res
					return getName target.parent
				else
					res = _n.replace(pp,_pn)+res
					return res
			else
				res += _n
				return res

		replaceAll = (expression, org, dest) ->
			expression.split(org).join(dest)

		getOption = (path) ->
			index = if path.lastIndexOf(pap) == -1 then 0 else path.lastIndexOf(pap)
			query = if path.lastIndexOf(pap) == -1 then "" else path.slice(path.lastIndexOf(pap))
			data = {}
			if query != ""
				query_str = replaceAll(query,pap,"")
				query_arr = query_str.split(pas)
				for i in query_arr
					_arr = i.split(paa)
					data[_arr[0]] = _arr[1]
			return {index:index,query:query,data:data}

		newname = getName layer
		docname = activeDocument.name.slice(0,-4)
		path = replaceAll(res,dp,docname)
		option = getOption(path)
		path = replaceAll(path,option.query,"")

		dir = path.slice(0,path.lastIndexOf("/")+1)
		suffix = if option.index then path.slice(path.lastIndexOf(@config["suffix"]),option.index) else path.slice(path.lastIndexOf(@config["suffix"]))
		name = replaceAll(path,dir,"")
		name = replaceAll(name,suffix,"")
		opt = FileSystem.objectMerge(@config.option ? {},option.data)
		obj = {
			dir:dir
			name:name
			suffix:suffix
			option:opt
		}
		return obj

	getMatchNameLayerAtLayers : (layers,name) ->
		for i in layers
			if i.name.match(name)
				return i
		return false

	isBtn : ()->
		lst = activeDocument.activeLayer.layerSets
		_on = @getMatchNameLayerAtLayers(lst,"on")
		_off = @getMatchNameLayerAtLayers(lst,"off")
		length = (lst.length == 2)
		return (_on && _off && length)

	createBtn : (layer)->
		l = layer
		_on = @getMatchNameLayerAtLayers(l.layerSets,"on").merge()
		_off = @getMatchNameLayerAtLayers(l.layerSets,"off").merge()
		_off.translate(-_off.bounds[0],-_off.bounds[1])
		_on.translate(-_on.bounds[0],-_on.bounds[1]+_off.bounds[3])
		w = l.bounds[2]-l.bounds[0]
		h = l.bounds[3]-l.bounds[1]
		if activeDocument.width < w or activeDocument.height < h
			activeDocument.resizeCanvas(w,h)
			l.translate(-l.bounds[0],-l.bounds[1])

	createNewDocument : (n,w,h,o,m,f) ->
		doc = app.documents.add(w,h,72,n.name,m,f)
		activeDocument.selection.selectAll()
		if @config.bg_color?
			@fillLayer(new RGB(@config.bg_color))
		activeDocument.paste()
		activeDocument.activeLayer.opacity = o

	saveJPG : (d,n) =>
		FileSystem.readdir("#{d}/#{n.dir}")
		fileObj = new File("#{d}/#{n.dir}#{n.name}#{n.suffix}")
		jpgOpt = new ExportOptionsSaveForWeb()
		FileSystem.objectMerge(jpgOpt,{
			quality : 80
			format : SaveDocumentType.JPEG
			optimized : true
		},@config.jpg)
		activeDocument.exportDocument(fileObj, ExportType.SAVEFORWEB, jpgOpt)

	savePNG : (d,n) =>
		FileSystem.readdir("#{d}/#{n.dir}")
		fileObj = new File("#{d}/#{n.dir}#{n.name}#{n.suffix}")
		pngOpt = new ExportOptionsSaveForWeb()
		FileSystem.objectMerge(pngOpt,{
			colors : 256
			quality : 0
			format : SaveDocumentType.PNG
			dither : Dither.NONE
			matteColor : backgroundColor.rgb
			colorReduction : ColorReductionType.SELECTIVE
			transparencyDither : Dither.NONE
		},@config.png)
		activeDocument.exportDocument(fileObj, ExportType.SAVEFORWEB, pngOpt)

	saveGIF : (d,n) =>
		FileSystem.readdir("#{d}/#{n.dir}")
		fileObj = new File("#{d}/#{n.dir}#{n.name}#{n.suffix}")
		gifOpt = new ExportOptionsSaveForWeb()
		FileSystem.objectMerge(gifOpt,{
			colors : 256
			quality : 0
			format : SaveDocumentType.COMPUSERVEGIF
			dither : Dither.NONE
			matteColor : backgroundColor.rgb
			colorReduction : ColorReductionType.SELECTIVE
			transparencyDither : Dither.NONE
		},@config.gif)
		activeDocument.exportDocument(fileObj, ExportType.SAVEFORWEB, gifOpt)

	saveImage : (layer,diameter) ->
		l = layer
		d = @imagesDir()
		o = l.opacity
		n = @parseName(layer)
		saveWithDiameter = (fn)=>
			if diameter == 2
				originName = n.name
				n.name = originName+@config["@2x_suffix"]
				fn(d,n)
				activeDocument.resizeImage(w*0.5,h*0.5)
				n.name = originName
			else if diameter == 0.5
				activeDocument.resizeImage(w*0.5,h*0.5)
				n.name += @config["@.5x_suffix"]
			fn(d,n)

		if n.suffix == ".jpg" or n.suffix == ".png" or n.suffix == ".gif"
			if l.layers && l.visible
				l = l.duplicate()
				activeDocument.activeLayer = l
				if @isBtn(l)
					@createBtn(l)
				activeDocument.activeLayer.merge()
				activeDocument.activeLayer.allLocked = false
				b = activeDocument.activeLayer.bounds
				if not ([0] == 0 and b[1] == 0 and b[2] == 0 and b[3] == 0)
					bounds = activeDocument.activeLayer.bounds
					x1 = bounds[0]
					y1 = bounds[1]
					x2 = bounds[2]
					y2 = bounds[3]
					bounds = [[x1,y1],[x2,y1],[x2,y2],[x1,y2]]
					activeDocument.selection.select(bounds)
					activeDocument.selection.copy()
					b = activeDocument.selection.bounds
					_w = Number(b[2]-b[0])
					_h = Number(b[3]-b[1])
					w = @even(_w)
					h = @even(_h)
					switch n.suffix
						when ".jpg"
							@createNewDocument(n,w,h,o,NewDocumentMode.RGB,DocumentFill.BACKGROUNDCOLOR)
							saveWithDiameter(@saveJPG)
						when ".png"
							@createNewDocument(n,w,h,o,NewDocumentMode.RGB,DocumentFill.TRANSPARENT)
							saveWithDiameter(@savePNG)
						when ".gif"
							@createNewDocument(n,w,h,o,NewDocumentMode.RGB,DocumentFill.TRANSPARENT)
							saveWithDiameter(@saveGIF)
					activeDocument.close(SaveOptions.DONOTSAVECHANGES)
					activeDocument.selection.deselect()
				activeDocument.activeLayer.remove()

	saveSelectedImage  : (diameter) ->
		if diameter
			@saveImage(activeDocument.activeLayer,diameter)
		else
			@saveImage(activeDocument.activeLayer)

	saveImageDocSize : (layer,diameter) ->
		d = @imagesDir()
		n = @parseName(layer)
		originName = n.name
		saveWithDiameter = (fn)=>
			if diameter == 2
				su = @config["@2x_suffix"]
				n.name = originName+su
				fn(d,n)
				open new File("#{d}/#{n.dir}/#{n.name}#{n.suffix}")
				activeDocument.resizeImage(activeDocument.width*0.5,activeDocument.height*0.5)
				n.name = originName
				fn(d,n)
				activeDocument.close(SaveOptions.DONOTSAVECHANGES)
			else if diameter == 0.5
				fn(d,n)
				open new File("#{d}/#{n.dir}/#{n.name}#{n.suffix}")
				activeDocument.resizeImage(activeDocument.width*0.5,activeDocument.height*0.5)
				fn(d,n)
				activeDocument.close(SaveOptions.DONOTSAVECHANGES)
			else
				fn(d,n)
		switch n.suffix
			when ".jpg"
				saveWithDiameter(@saveJPG)
			when ".png"
				saveWithDiameter(@savePNG)
			when ".gif"
				saveWithDiameter(@saveGIF)

	saveSelectedImageDocSize : (diameter) ->
		if diameter
			@saveImageDocSize(activeDocument.activeLayer,diameter)
		else
			@saveImageDocSize(activeDocument.activeLayer)

	saveChildImages: (layer,diameter) ->
		for _layer in layer.layerSets
			if diameter
				@saveImage(_layer,diameter)
			else
				@saveImage(_layer)
		alert "finish"

	saveSelectedChildImages: (diameter) ->
		if diameter
			@saveChildImages(activeDocument.activeLayer,diameter)
		else
			@saveChildImages(activeDocument.activeLayer)


	defaultConfig :
		"images_dir":"./"
		"bg_color":null
		"resize_even":false
		"jpg":
			"quality":80
		"gif":
			"colors":256
		"png":
			"PNG8":0
			"colors":256

		"config_file":"psd-config.json"
		"option_prefix":"?"
		"option_separator":"&"
		"option_assignment":"="
		"suffix":"."
		"docname_placeholder":"@"
		"parent_placeholder":"^"
		"@2x_suffix":"@2x"
		"@.5x_suffix":""
