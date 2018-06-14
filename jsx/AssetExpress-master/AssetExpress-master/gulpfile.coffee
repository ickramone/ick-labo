
# % cd /path/to/project/
# % npm install coffee-script gulp gulp-watch gulp-uglify
# % gulp

gulp        = require 'gulp'
watch       = require 'gulp-watch'
plumber     = require 'gulp-plumber'
coffee      = require 'gulp-coffee'
uglify      = require 'gulp-uglify'
concat      = require 'gulp-concat'

d = 'dest'
s = 'src'

# @ js
# ________________________________________________

onChangeCoffee = (e)->
	gulp.src e.src
		.pipe plumber()
		.pipe coffee { bare:true ,}
		# .pipe uglify { preserveComments:'all' }
		.pipe gulp.dest e.dest
		.on 'end', ->
			if e.parentDir == '/'
				onConcat(e)
				console.log "onConcat"

onConcat = (e)->
	gulp.src [
			e.dest+'./bnr/'+e.name+'.js'
			e.dest+'./lib/FileSystem.js'
			e.dest+'./lib/RGB.js'
			e.dest+'./lib/FolderUtil.js'
			e.dest+'./lib/SettingDialog.js'
			e.dest+'./lib/AssetExpress.js'
			e.dest+e.name+'.js'
		]
		.pipe concat e.name+'.js'
		.pipe gulp.dest e.dest



# @ watch
# ________________________________________________

gulp.task 'watch', ->

	onChange = gulp.watch s+'/**/*'
	onChange.on 'change', (target)->
		info = (_target)->
			srcRoot   = process.cwd()+"/"+s
			src       = _target.path
			type      = _target.type
			name      = src.slice((src.lastIndexOf "/")+1)
			name      = name.replace ".coffee",""
			ext       = src.slice((src.lastIndexOf ".")+1)
			dir       = src.slice(0,src.lastIndexOf "/")+"/"
			parentDir = dir.replace srcRoot,""
			dest      = dir.replace s,d
			common    = (name.slice(0,1) == '_')
			return { srcRoot:srcRoot, src:src, type:type, name:name, ext:ext, dir:dir, parentDir:parentDir, dest:dest, common:common }

		i = info(target)
		switch i.ext
			when "coffee" then onChangeCoffee(i)
			else onChangeAsset(i)

# @ default
# ________________________________________________

gulp.task 'default', ->
	gulp.run ['watch']

