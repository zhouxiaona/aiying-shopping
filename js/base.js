/****************************
**** 绑定事件兼容各个浏览器的写法
**** 参数：
**** 	element：代表要绑定事件的元素
**** 	type：要绑定的事件名，(不含“on”)
**** 	fn：绑定事件的函数
********************************/
function addEvent(element,type,fn){
	if(element.addEventListener){
		element.addEventListener(type,fn,true);
	}else if(element.attachEvent){
		element.attachEvent("on"+type,fn);
	}else{
		element["on"+type]=fn;
	}
}

/****************************
**** 移除事件兼容各个浏览器的写法
**** 参数：
**** 	element：代表要绑定事件的元素
****	type：要绑定的事件名，(不含“on”)
**** 	fn：绑定事件的函数
********************************/
function removeEvent(element,type,fn){
	if(element.removeEventListener){
		element.removeEventListener(type,fn,false);
	}else if(element.detachEvent){
		element.detachEvent("on"+type,fn);
	}else{
		element["on"+type]=null;
	}
}

/****************************
**** 取消冒泡兼容各个浏览器的写法
**** 参数：
**** 	ev: 要取消冒泡的事件对象
********************************/
function stopBubble(ev){
	if(ev && ev.stopPropagation){
		ev.stopPropagation();
	}else{
		ev.cancelBubble=true;
	}
}

/********************************
**** 获取计算后样式兼容的写法
**** 参数
****	element: 要获取样式的元素
****	key: 要获取的样式
**/ 

function getStyle(element,key,wei){
	if(element.currentStyle){
		return element.currentStyle[key];
	}else{
		if(wei==undefined){
			wei=null;
		}
		return getComputedStyle(element,wei)[key];
	}
}


/****************************
**** 取消冒泡兼容各个浏览器的写法
****/
function addMousewheel(ele,fn){
	if(navigator.userAgent.indexOf("Firefox")!=-1){
		// 火狐
		ele.addEventListener("DOMMouseScroll",fn,false);
	}else{
		// 谷歌、IE
		ele.onmousewheel=fn;
	}
}

function GetQueryString(name){
	 var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null){
     	return  unescape(r[2]);
     }else{
     	return null;
     } 
}

/* 设置cookie */
function setCookie(key,val,time){//设置cookie方法
	var date=new Date(); //获取当前时间
	var expiresDays=time;  //将date设置为n天以后的时间
	date.setTime(date.getTime()+expiresDays*24*3600*1000); //格式化为cookie识别的时间
	document.cookie=key + "=" + val +";expires="+date.toGMTString();  //设置cookie
}
function getCookie(key){//获取cookie方法
	/*获取cookie参数*/
	var getCookie = document.cookie.replace(/[ ]/g,"");  //获取cookie，并且将获得的cookie格式化，去掉空格字符
	var arrCookie = getCookie.split(";")  //将获得的cookie以"分号"为标识 将cookie保存到arrCookie的数组中
	var tips;  //声明变量tips
	for(var i=0;i<arrCookie.length;i++){   //使用for循环查找cookie中的tips变量
		var arr=arrCookie[i].split("=");   //将单条cookie用"等号"为标识，将单条cookie保存为arr数组
		if(key==arr[0]){  //匹配变量名称，其中arr[0]是指的cookie名称，如果该条变量为tips则执行判断语句中的赋值操作
			tips=arr[1];   //将cookie的值赋给变量tips
			break;   //终止for循环遍历
		} 
	}
	return tips;
}
function clearCookie(name) {  
    setCookie(name, "", -1);  
} 

/* 购物车函数 */
function addShoppingCart(goodsId, userId) {
	$.ajax({
		type: "get",
		url: "http://139.199.74.211:8081/new-maven/shoppingCar/addShoppingCar.do",
		async: true,
		dataType: "json",
		data: {userId: userId, goodsId: goodsId},
		success: function(data) {
			console.log(data);
		}
	});
}
