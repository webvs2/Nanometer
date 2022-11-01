(function (window,undefined) {
	var Result=function(code,msg,data){
		this.code=code;
		this.msg=msg;
		this.data=data;
	}
	function WebScan(options) {
		if(options.url=='' || options.url ==null ||options.url==undefined){
			WebScan.prototype.url="http://localhost:18989/WebScan/";
		}else{
			WebScan.prototype.url=options.url;
		}
		if(options.wsUrl==''||options.wsUrl==null||options.wsUrl==undefined){
			WebScan.prototype.wsUrl="http://localhost:28989";
		}else{
			WebScan.prototype.wsUrl=options.wsUrl;
		}
		WebScan.prototype.licence=options.licence;
		return WebScan.prototype;
	}
	WebScan.prototype = {
		constructor:WebScan,
		clientId:'',
		isInit:false,
		isInUse:false,
		callback:null,
		//初始化
		initSef:function(pid,callback){
			if(this.licence==null || this.licence=='' || this.licence==undefined){
				return null;
			}
			var that=this;
			jQuery.ajax({
				type:'post',
				url:this.url+"/getVersionInfo",
				dataType:'json',
				cache:false,
				data:{
					"licence":this.licence,
					"pid":pid
				},
				success:function(data){
					if(data.code==200){
						that.initSocketIo(data.data);
						that.clientId=data.data;
						that.isInit=true;
					}
					callback(data);
				},
				error:function(){
					var result = new Result(500,"网络错误",null);
					callback(result);
				}
			})
		},
		//获取设备
		getDevices:function(callback){
			jQuery.ajax({
				type:'get',
				url:this.url+"/getDevices",
				cache:false,
				data:{
					"pid":this.clientId
				},
				success:function(data){
					callback(data);
				},
				error:function(){
					var result = new Result(500,"网络错误",null);
					callback(result);
				}
			})
		},
		setParams:function(params,callback){
			jQuery.ajax({
				type:"post",
				url:this.url+"/setParams",
				cache:false,
				data:{
					"pid":this.clientId,
					"params":JSON.stringify(params)
				},
				success:function(data){
					callback(data);
				},
				error:function(){
					var result = new Result(500,"网络错误",null);
					callback(result);
				}
			})
		},
		saveLicence:function(licence,callback){
			jQuery.ajax({
				type:"post",
				url:this.url+"/saveLicence",
				cache:false,
				data:{
					"pid":this.clientId,
					"licence":licence
				},
				success:function(data){
					callback(data);
				},
				error:function(){
					var result = new Result(500,"网络错误",null);
					callback(result);
				}
			})
		},


		getParams:function(callback){
			jQuery.ajax({
				type:'get',
				url:this.url+"/getParams",
				cache:false,
				data:{
					"pid":this.clientId
				},
				success:function(data){
					callback(data);
				},
				error:function(){
					var result = new Result(500,"网络错误",null);
					callback(result);
				}
			})
		},
		//获取序列号
		getSerialNumber:function(device,callback){
			jQuery.ajax({
				type:'get',
				url:this.url+"/getSerialNumber",
				cache:false,
				data:{
					"device":device
				},
				success:function(data){
					callback(data);
				},
				error:function(){
					var result = new Result(500,"网络错误",null);
					callback(result);
				}
			})
		},
		getFileExplore:function(parentPath,isDirectory,callback){
			jQuery.ajax({
				type:"get",
				url:this.url+"/getFilePath",
				data:{
					"parentPath":parentPath,
					"isDirectory":isDirectory
				},
				success:function(data){
					callback(data);
				},
				error:function(){
					var result = new Result(500,"网络错误",null);
					callback(result);
				}
			})
		},
		//获取图像
		getImageByName:function(name,callback){
			jQuery.ajax({
				type:'get',
				url:this.url+"/getImageByName",
				cache:false,
				data:{
					"pid":this.clientId,
					"imageName":name
				},
				success:function(data){
					callback(data);
				},
				error:function(){
					var result = new Result(500,"网络错误",null);
					callback(result);
				}
			})
		},
		majorOFD:function(isAuto,callback){
			var formData={
				"isAuto":isAuto,
				"pid":this.clientId
			}
			jQuery.ajax({
				type:'post',
				url:this.url+"/majorOfd",
				cache:false,
				data:{
					"formDataString":JSON.stringify(formData)
				},
				success:function(data){
					callback(data);
				},
				error:function(){
					var result = new Result(500,"网络错误",null)
					callback(result);
				}
			})
		},
		majorPDF:function(callback){
			var formData={
				"pid":this.clientId,
			}
			jQuery.ajax({
				type:'post',
				url:this.url+"/majorPdf",
				cache:false,
				data:{
					"formDataString":JSON.stringify(formData)
				},
				success:function(data){
					callback(data);
				},
				error:function(){
					var result = new Result(500,"网络错误",null);
					callback(result);
				}
			})
		},
		//上传图像
		uploadImage:function(uploadParam,callback){
			uploadParam.pid=this.clientId;
			jQuery.ajax({
				type:'post',
				url:this.url+"/uploadImage",
				cache:false,
				data:{
					"formDataString":JSON.stringify(uploadParam)
				},
				success:function(data){
					callback(data);
				},
				error:function(){
					var result = new Result(500,"网络错误",null);
					callback(result);
				}
			})
		},
		//批量获取图像
		getBatchImage:function(startIndex,endIndex,callback){
			jQuery.ajax({
				type:'post',
				url:this.url+"/image/getBatchImage",
				cache:false,
				data:{
					"pid":this.clientId,
					"startIndex":startIndex,
					"endIndex":endIndex
				},
				success:function(data){
					callback(data);
				},
				error:function(){
					var result = new Result(500,"网络错误",null);
					callback(result);
				}
			})
		},
		saveImage:function(imageName,base64,callback){
			jQuery.ajax({
				type:"post",
				url:this.url+'/image/saveImage',
				cache:false,
				data:{
					"pid":this.clientId,
					"imageName":imageName,
					"image":base64
				},success:function(data){
					callback(data);
				},
				error:function(){
					var result = new Result(500,"网络错误",null);
					callback(result);
				}
			})
		},
		getAllImages:function(callback){
			jQuery.ajax({
				type:'get',
				url:this.url+"/image/getImageByPid",
				cache:false,
				data:{
					"pid":this.clientId
				},
				success:function(data){
					callback(data);
				},
				error:function(){
					var result = new Result(500,"网络错误",null);
					callback(result);
				}
			})
		},
		deleteImage:function(imageName,callback){
			jQuery.ajax({
				type:'post',
				url:this.url+"/image/deleteImage",
				cache:false,
				data:{
					"pid":this.clientId,
					"imageName":imageName
				},
				success:function(data){
					callback(data);
				},
				error:function(){
					var result = new Result(500,"网络错误",null);
					callback(result);
				}
			})
		},
		deleteByIndexes:function(indexs,callback){
			jQuery.ajax({
				type:'post',
				url:this.url+"/image/deleteByIndexes",
				cache:false,
				data:{
					"pid":this.clientId,
					"indexs":indexs
				},
				success:function(data){
					callback(data);
				},
				error:function(){
					result = new Result(500,"网络错误",null);
					callback(result);
				}
			})
		},
		deleteAllImage:function(callback){
			jQuery.ajax({
				type:'post',
				url:this.url+"/image/deleteAllImage",
				cache:false,
				data:{
					"pid":this.clientId,
				},
				success:function(data){
					callback(data);
				},
				error:function(){
					result = new Result(500,"网络错误",null);
					callback(result);
				}
			})
		},
		split:function(imageName,isHorizontal,x1,y1,x2,y2,callback){
			jQuery.ajax({
				type:'post',
				url:this.url+"/image/split",
				cache:false,
				data:{
					"pid":this.clientId,
					"imageName":imageName,
					"isHorizontal":isHorizontal,
					"x1":parseInt(x1),
					"y1":parseInt(y1),
					"x2":parseInt(x2),
					"y2":parseInt(y2)
				},
				success:function(data){
					callback(data);
				},
				error:function(){
					result = new Result(500,"网络错误",null);
					callback(result);
				}
			})
		},
		merge:function(isHorizontal,indexs,callback){
			jQuery.ajax({
				type:'post',
				url:this.url+"/image/mergeHorizontal",
				cache:false,
				data:{
					"pid":this.clientId,
					"isHorizontal":isHorizontal,
					"indexs":indexs
				},
				success:function(data){
					callback(data);
				},
				error:function(){
					result = new Result(500,"网络错误",null);
					callback(result);
				}
			})
		},
		getLastBatch:function(callback){
			jQuery.ajax({
				type:'get',
				url:this.url+"/getLastBatch",
				cache:false,
				success:function(data){
					callback(data);
				},
				error:function(){
					result = new Result(500,"网络错误",null);
					callback(result);
				}
			})
		},
		//开始扫描
		startScan:function(callback,scanData){
			if(this.isInUse==true){
				return new Result(500,"设备使用中",null)
			}
			if(this.SocketClient!=null && this.SocketClient!=undefined){
				this.SocketClient.emit('scan',JSON.stringify(scanData));
				this.callback=callback;
				this.isInUse=true;
				return new Result(200,"开启成功",null);
			}else{
				return new Result(500,"连接服务失败",null)
			}
		},
		//初始化socketIO
		initSocketIo:function(id){
			this.SocketClient=io.connect(this.wsUrl+"?id="+id,{
				transports:['websocket']
			});
			var that=this;
			if(this.SocketClient!=null && this.SocketClient!=undefined){
				this.SocketClient.on("error",function(data){
					if(that.callback!=null && that.callback !=undefined){
						var result={"code":500,"msg":data};
						that.callback(result);
					}
					that.isInUse=false;
				});
				this.SocketClient.on("success",function(data){
					if(that.callback!=null && that.callback !=undefined){
						var result={"code":200,"msg":data};
						that.callback(result);
					}
					that.isInUse=false;
				});
				this.SocketClient.on("image",function(data){
					if(that.callback!=null && that.callback !=undefined){
						that.callback(data);
					}
				});
				this.SocketClient.on("result",function(data){
					if(that.callback!=null && that.callback !=undefined){
						that.callback(data);
					}
					that.isInUse=false;
				});
				this.SocketClient.on("connect_error",function(){
					return new Result(500,"初始化连接服务失败");
				})
			}
		},
		getClientId:function(){
			return this.clientId;
		},
		setClientId:function(pid){
			this.clientId=pid;
		}
	};
	window.WebScan = WebScan;
})(window);