class SettingDialog
	constructor : (windowName) ->
		@rect =
			x:0
			y:0
			w:400
			h:300
		@by = 20
		@kx = 20
		@kw = 80
		@vh = 20
		@vx = @kx+@kw
		@vw = @rect.w-@kw-@kx*2
		@bm = 30
		obj =
			dialog:
				orientation: 'column'
				alignChildren: ['fill', 'top']
		@uDlg = new Window('dialog',windowName,[@rect.x,@rect.y,@rect.w,@rect.h])

	getArrayFromInput:(arr)->
		if arr != ""
			if arr.indexOf('..') != -1
				res = []
				buf = arr.split("..")
				for i in [buf[0]..buf[1]]
					res.push(i)
				return res
			else if arr.indexOf(',') != -1
				return arr.split(",")
			else if arr.indexOf(' ') != -1
				return arr.split(" ")
			else
				return false
		else
			return false

	setWidth: (width)->
		@rect.w = width
		@vx = @kx+@kw
		@vw = @rect.w-@kw-@kx*2

	addInputTextWithLabel: (key,val)->
		@uDlg.add("statictext",[@kx,@by,@kw+@kx,@vh+@by], key)
		@uDlg[key] = @uDlg.add("edittext",[@vx,@by,@vw+@vx,@vh+@by], val)
		@by += @bm

	addRadioButtonWithLabel: (settings)->
		group = settings.groupName
		@uDlg[group] = @uDlg.add("panel", [@kx,@by,@kw+@vw+@kx,@by+@vh*3], group);
		i = 0
		for k,v of settings.values
			x = i*100+@kx
			@uDlg[group][k] = @uDlg[group].add("radiobutton",[x,0,x+@kw,@vh*3], v.text)
			@uDlg[group][k].value = v.value ? false
			@uDlg[group][k].onClick = v.onClick ? ->
			i += 1
		@by += @bm*2.5

	addIntentButton: (ok,cancel,height)->
		width = (@rect.w - @kx*2 -10)/2
		x = @kx
		@uDlg.okBtn     = @uDlg.add("button", [x,@by, x+width,height+@by], ok, {name:ok})
		@uDlg.cancelBtn = @uDlg.add("button", [x+width+10,@by, x+width*2+10,height+@by], cancel, {name:cancel})
		@uDlg.okBtn.onClick = @onClickedOK
		@uDlg.cancelBtn.onClick = @onClickedCancel
		@by += height

	onClickedOK: ()=>
		@uDlg.close()

	onClickedCancel: ()=>
		@uDlg.close()

	showWindow: ()->
		@uDlg.bounds = [@rect.x,@rect.y,@rect.w,@by+@vh]
		@uDlg.center()
		@uDlg.show()
