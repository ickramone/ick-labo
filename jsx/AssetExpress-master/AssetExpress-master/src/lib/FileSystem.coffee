class @FileSystem

	@objectMerge : (dest, objs...) ->
		for obj in objs
			dest[k] = v for k, v of obj
		dest

	@objectClone : (obj)->
		if not obj? or typeof obj isnt 'object'
			return obj
		if obj instanceof Date
			return new Date(obj.getTime())
		if obj instanceof RegExp
			flags = ''
			flags += 'g' if obj.global?
			flags += 'i' if obj.ignoreCase?
			flags += 'm' if obj.multiline?
			flags += 'y' if obj.sticky?
			return new RegExp(obj.source, flags)
		newInstance = new obj.constructor()
		for key of obj
			newInstance[key] = clone obj[key]
		return newInstance

	@JSONparse : (str)->
		new Function("return "+str)()

	@JSONstringify : (obj)->
		parse = (target) ->
			s = "{"
			for i in target
				s += "\""+String(i)+"\""
				s += ":"
				if typeof i == "object"
					s += parse i
				else if typeof i == "boolean" or typeof i == "number"
					s += i + ","
				else
					s += "\"" + i + "\","
			s += "},"
		str = parse obj
		return str.slice(0,-1)

	@readJSON : (path)->
		conf = new File(path)
		if !conf.exists
			return false
		if conf.open("r")
			json_str = conf.read()
			json_obj = FileSystem.JSONparse(json_str)
			conf.close()
			return json_obj
		else
			return false

	@mkdir : (path)->
		dir = new Folder(path)
		if !dir.create()
			return false
		return dir

	@rmdir : (path)->

	@readdir : (path)->
		dir = new Folder(path)
		if !dir.exists
			dir = FileSystem.mkdir(path)
		return dir
