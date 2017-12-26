/* 检查用户是否登录 */
var userId = getCookie("userId");
/*顶部个人信息*/
var HUserNewsMy = document.getElementsByClassName('H-userNews_my')[0];
/*hover效果*/ 
var HUserNewsHover = document.getElementsByClassName('H-userNewsHover')[0];
/*用户信息栏*/ 
var HUserLis = document.querySelectorAll(".H-userNewsHover li");
HUserNewsMy.onmouseover = function() {
	HUserNewsHover.style.height = "155px";
}
HUserNewsMy.onmouseout = function() {
	HUserNewsHover.style.height = "0px";
}
for(var i = 0; i < HUserLis.length; i++) {
	HUserLis[i].index = i;
	HUserLis[i].onmouseover = function() {
		HUserNewsHover.style.height = "155px";
	}
	HUserLis[i].onmouseout = function() {
		HUserNewsHover.style.height = "0";
	}
}

/*手机购物扫码hover栏*/ 
var HUserNewsPhone = document.getElementsByClassName('H-userNews_phone')[0];
var HUserPhoneHover = document.getElementsByClassName('H-userPhoneHover')[0];
HUserNewsPhone.onmouseover = function() {
	HUserPhoneHover.style.height = "140px";
}
HUserNewsPhone.onmouseout = function() {
	HUserPhoneHover.style.height = "0px";
}

/*商品类目*/
var HAllGoodsBtn = document.getElementsByClassName('H-allGoodsBtn')[0];
var HNavHover = document.getElementsByClassName('H-nav_hover')[0];
/*类目hover效果div*/
var HLisBtns = document.querySelectorAll('.H-lisBtns li');
var HLisHover = document.getElementsByClassName('H-lis_hover')[0];
HAllGoodsBtn.onmouseover = function() {
	HNavHover.style.height = "441px";
}
HAllGoodsBtn.onmouseout = function() {
	HNavHover.style.height = "0px";
}
HNavHover.onmouseover = function() {
	HNavHover.style.height = "441px";
}
HNavHover.onmouseout = function() {
	HNavHover.style.height = "0px";
}

/*hover商品类目显示对应商品*/
/*上次点击商品类目*/ 
var classifies = [0,0,0,0,0,0,0,0];
var lisNum = 0;
for(var i = 0; i < HLisBtns.length; i++) {
	HLisBtns[i].index = i;
	HLisBtns[i].isRequest = false;
	HLisBtns[i].onmouseover = function() {
		/*2*/ 
		var _index = this.index;
		HLisHover.style.width = "820px";
		// HLisHover.innerHTML = this.index;
		lisNum = _index;
		this.style.color = "white";
		this.style.backgroundColor = "#ff8800";
		
		/* 数据遍历区 */
//		console.log(classifications);
		/* 商品二级分类部分 */
		var ultot = document.querySelector(".H-lis_hover>ul");
		if(HLisBtns[_index].isRequest == false) {
			HLisBtns[_index].isRequest = true;
			ultot.innerHTML = '<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>';
			$.ajax({
				type:"get",
				url:"http://139.199.74.211:8081/new-maven/classify/findClassify.do",
				data:{classifyId: _index + 1},
				async:true,
				success:function(data) {
					var classify = JSON.parse(data);
					classifies[classify.classifyId - 1] = classify;
//					console.log(classify);
					/* 一级标题 */
//					console.log(classifies);
					/* 二级标题 */
					ultot.innerHTML = "";
					for(var j = 0; j < classify.classifies.length; j++) {
//						console.log(classify.classifies[j].classifyId);
						var spantit = document.createElement("span");
						var spancon = document.createElement("span");
						spantit.innerHTML = `<span class="title">
												<a href="listPage.html?classifyId=${classify.classifies[j].classifyId}">${classify.classifies[j].classifyName}</a>
											</span>`;
						var spanconhtml = '';
//						/* 三级标题 */
						for(var i = 0; i < classify.classifies[j].classifies.length; i++) {
//							console.log(classify.classifies[j].classifies[i].classifyId);
							spanconhtml += '<a href="listPage.html?classifyId=' + classify.classifies[j].classifies[i].classifyId + '">' + classify.classifies[j].classifies[i].classifyName +'</a>　|　';
						}
						spancon.innerHTML = '<span class="content">' + spanconhtml + '</span>';
						ultot.innerHTML += '<li>' + spantit.innerHTML + spancon.innerHTML + '</li>';
					}
				}
			});
		} else {
//			console.log(classifies[_index]);
			if(classifies[_index] == 0) {
				/* 未加载显示画面 */
				ultot.innerHTML = '<div class="spinner"><div class="rect1"></div><div class="rect2"></div><div class="rect3"></div><div class="rect4"></div><div class="rect5"></div></div>';
			} else {
				/* 二级标题 */
				ultot.innerHTML = "";
//				console.log(classifies);
				for(var j = 0; j < classifies[_index].classifies.length; j++) {
					var spantit = document.createElement("span");
					var spancon = document.createElement("span");
					spantit.innerHTML = '<span class="title"><a href="listPage.html?classifyId=' + classifies[_index].classifies[j].classifyId + '">' + classifies[_index].classifies[j].classifyName + '</a></span>';
					var spanconhtml = '';
//					console.log(classifies[_index].classifies[j].classifyId);
					/* 三级标题 */
					for(var i = 0; i < classifies[_index].classifies[j].classifies.length; i++) {
//						console.log(classifies[_index].classifies[j].classifies[i].classifyId);
						spanconhtml += '<a href="listPage.html?classifyId=' + classifies[_index].classifies[j].classifies[i].classifyId + '">' + classifies[_index].classifies[j].classifies[i].classifyName + '</a>　|　';
					}
					spancon.innerHTML = '<span class="content">' + spanconhtml + '</span>';
					ultot.innerHTML += '<li>' + spantit.innerHTML + spancon.innerHTML + '</li>';
				}
			}
		}	
	}	
	HLisBtns[i].onmouseout = function() {
		/*2*/ 
		HLisHover.style.width = "0px";
		this.style.color = "black";
		this.style.backgroundColor = "white";
	}
	HLisBtns[i].onclick = function() {
		window.location.href = "listPage.html?classifyId=" + (this.index + 1);
	}
}
HLisHover.onmouseover = function() {
	/*1*/ 
	HNavHover.style.height = "441px";
	/*2*/ 
	HLisHover.style.width = "820px";
	HLisBtns[lisNum].style.color = "white";
	HLisBtns[lisNum].style.backgroundColor = "#ff8800";
}
HLisHover.onmouseout = function() {
	/*1*/ 
	HNavHover.style.height = "0";
	/*2*/ 
	HLisHover.style.width = "0px";
	HLisBtns[lisNum].style.color = "black";
	HLisBtns[lisNum].style.backgroundColor = "white";
}

/*ajax 获取数据*/ 
/* 导航左侧分类 */
var classifications;
$.ajax({
	type:"get",
	url:"http://139.199.74.211:8081/new-maven/classify/findFirstClassify.do",
	data:{classifyParentId: 0},
	async:true,
	success:function(data) {
		/* 左侧商品分类详情 */
		classifications = JSON.parse(data);
//		console.log(classifications);
		/* classify 左侧商品分类 */
		var classify = document.querySelectorAll(".H-lisBtns li");
		for(var i = 0; i < classifications.length; i++) {
			classify[i].setAttribute("data-id", classifications[i].classifyId);
			classify[i].innerText = classifications[i].classifyName;
		}
		searchLoad();
	}
});

/* search区热门搜索 */
function searchLoad() {
	$.ajax({
		type:"get",
		url:"http://139.199.74.211:8081/new-maven/hot/selectHotName.do",
		data:{},
		async:true,
		success:function(data) {
			var searchHots = document.querySelector(".H-hotSearchs");
			// console.log(data);
			/* 热门搜索 */
			var searchHot = JSON.parse(data);
	//		console.log(searchHot);
	//		console.log(searchHots);
			searchHots.innerHTML = "";
			for(var i = 0; i < searchHot.length; i++) {
	//			console.log((decodeURI(searchHot[i].hotName)));
				searchHots.innerHTML += `<a href="listPage.html?classifyId=0&keyword=${encodeURI(searchHot[i].hotName)}"><span>${searchHot[i].hotName}</span></a>
				`;
			}
		}
	});
}
	


/* 用户登录判断 */
if(userId != undefined) {
	$.ajax({
		type:"get",
		url:"http://139.199.74.211:8081/new-maven/user/select.do",
		data:{userId: userId},
		dataType:"json",
		async:true,
		success:function(data) {
//			console.log(data.name);
			$(".H-login_register").html(function() {
				return `<span>您好${data.name}欢迎回到爱婴室！ <a href="" onclick="(function() {clearCookie('userId');})()">[退出]</a>`;
			});
		}
	});
	getShoppingNews();
//	clearCookie("userId");
} else {
	console.log("用户未登录!");
}

/* 账户中心点击跳转 */
$(".userCenter").click(function() {
	/* 用户已登录 */
	if(userId != undefined) {
		document.innerHTML = "";
		window.location.href = "loginsuccess.html";
	}
	/* 用户未登录 */
	else {
		window.location.href = "login.html";
	}
});

/* 购物车信息 */
function getShoppingNews() {
	$.ajax({
		type:"get",
		url:"http://139.199.74.211:8081/new-maven/shoppingCar/findShoppingCar.do",
		data:{userId: userId},
		dataType:"json",
		async:true,
		success:function(data) {
			var goodsNum = 0;
			for(i in data) {
				goodsNum += data[i].goodsCount;
			}
			if(goodsNum != 0) {
				$(".H-shopCar li:nth-of-type(2)").css("background-color", "red");
				$(".H-shopCar li:nth-of-type(1) span b").html(goodsNum);
				$(".H-shopCar li:nth-of-type(2)").click(function() {
					window.location.href = "shoppingCart.html";
				});
			}
		}
	});
}
