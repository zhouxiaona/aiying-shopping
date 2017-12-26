/* 首页图片 */
var imgAll = new Array();
var imgb1 = ["../img/b1/315452.jpg","../img/b1/436003.jpg","../img/b1/462784.jpg","../img/b1/465010.jpg","../img/b1/465012.jpg","../img/b1/413833.jpg","../img/b1/201711240417449561.jpg"];
var imgf1 = ["../img/1f/046200.jpg","../img/1f/090406.jpg","../img/1f/109690.jpg","../img/1f/237158.jpg","../img/1f/242103.jpg","../img/1f/319831.jpg","../img/1f/464754.jpg"];
var imgf2 = ["../img/2f/302030.jpg","../img/2f/304119.jpg","../img/2f/462966.jpg","../img/2f/201606061245515736.jpg","../img/2f/201607191157174553.jpg","../img/2f/201611090239539218.jpg","../img/2f/201711240231295030.jpg"];
var imgf3 = ["../img/3f/445986.jpg","../img/3f/449985.jpg","../img/3f/201703020214552222.jpg","../img/3f/201703060211098941.jpg","../img/3f/201703281014403316.jpg","../img/3f/201703310537511910.jpg","../img/3f/201707281213034375.jpg"];
var imgf4 = ["../img/4f/201704010103186128.jpg","../img/4f/201704010135309878.jpg","../img/4f/201704010146113160.jpg","../img/4f/201704010501275347.jpg","../img/4f/201704011137302691.jpg","../img/4f/201704011151451441.jpg","../img/4f/201704070107317661.jpg"];
var imgf5 = ["../img/5f/165653.jpg","../img/5f/171736.jpg","../img/5f/175309.jpg","../img/5f/228722.jpg","../img/5f/322204.jpg","../img/5f/447947.jpg","../img/5f/201703021030406910.jpg"];
var imgf6 = ["../img/6f/190449.jpg","../img/6f/236601.jpg","../img/6f/320791(1).jpg","../img/6f/426529.jpg","../img/6f/431412.jpg","../img/6f/465095.jpg","../img/6f/465095.jpg"];
var imgf7 = ["../img/7f/309506.jpg","../img/7f/310681.jpg","../img/7f/324672.jpg","../img/7f/329635.jpg","../img/7f/431797-3.jpg","../img/7f/433286.jpg","../img/7f/439099.jpg"];
imgAll.push(imgb1);
imgAll.push(imgf1);
imgAll.push(imgf2);
imgAll.push(imgf3);
imgAll.push(imgf4);
imgAll.push(imgf5);
imgAll.push(imgf6);
imgAll.push(imgf7);
var tabImgAll = new Array();
var tabImg1 = ["../img/hot/201610080237471456.jpg","../img/hot/324127.jpg","../img/hot/414916.jpg","../img/hot/414919.jpg","../img/hot/438322.jpg","../img/hot/450078.jpg","../img/hot/450194.jpg","../img/hot/459803.jpg","../img/hot/460473.jpg"];
var tabImg2 = ["../img/hot/324127.jpg","../img/hot/324127.jpg","../img/hot/414916.jpg","../img/hot/414919.jpg","../img/hot/438322.jpg","../img/hot/450078.jpg","../img/hot/450194.jpg","../img/hot/459803.jpg","../img/hot/460473.jpg"];
var tabImg3 = ["../img/hot/324127.jpg","../img/hot/324127.jpg","../img/hot/414916.jpg","../img/hot/414919.jpg","../img/hot/438322.jpg","../img/hot/450078.jpg","../img/hot/450194.jpg","../img/hot/459803.jpg","../img/hot/201610080237471456.jpg"];
tabImgAll.push(tabImg1);
tabImgAll.push(tabImg2);
tabImgAll.push(tabImg3);
var aaa = 100;
/*首页轮播*/
var imgs = document.querySelectorAll('.C-CFImg a');
var spans = document.querySelectorAll('.C-CFBtns span');
/*保留上次点击位置*/ 
var lastNum = 0;
/*轮播位置*/ 
var s = 0;
/*图片数量*/ 
var imgNum = 3;
/*计时器变量*/ 
var timer;
for(var i = 0; i < spans.length; i++) {
	spans[i].index = i;
	spans[i].onclick = function() {
		clearInterval(timer);
		changeBtnsImgs(this.index);
		timer = setInterval(autoPlay, 2000);
	}
}
function changeBtnsImgs(index) {
	spans[lastNum].style.backgroundColor = "lightgray";
	imgs[lastNum].style.opacity = "0";
	lastNum = index;
	s = index;
	spans[index].style.backgroundColor = "red";
	imgs[index].style.opacity = "1";
}
/*自动轮播*/
timer = setInterval(autoPlay, 2000);
function autoPlay() {
	s++;
//	console.log(s);
	if(s >= imgNum) {
		s = 0;
	}
	changeBtnsImgs(s);
}

/* 搜索按钮 */
$(".H-SBtn").click(function() {
	var textSearch = $(".H-SInp input").val();
	if(textSearch) {
		textSearch = $.trim(textSearch);
		window.location.href = "listPage.html?keyword=" + textSearch;
	}
//	console.log($(".H-SInp input").val());
});

/*B1 元素项*/
var main = document.getElementsByClassName('C-b1')[0];
var mobalPart = document.getElementsByClassName('mobalPart')[0];
/*刻制模板代码*/
var mobal = main.innerHTML;
/*楼层请求数据本地保存*/
var floorDatas = [0, 0, 0, 0, 0, 0, 0, 0];
/*f1 ~ 7 楼mobal打印*/
for(var i = 1; i < 8; i++) {
	var mains = document.createElement("div");
	mains.className = "C-f" + i;
	mains.setAttribute('name', 'mobal');
	mains.innerHTML = mobal;
	mobalPart.appendChild(mains);
}

/*选项卡*/
var tabData = [0, 0, 0];
var arrColor = ["red", "orange", "#b42cb3"];
var lastChoose = 0;
if(tabData[0] == 0) {
	tabNews(1);
}
///*选项卡功能实现*/
$(".C-tab li").each(function(index) {
	$(this).mouseover(function() {
//		console.log(index);
		$(".C-tab li").eq(lastChoose).css({
			"color": "gray",
			"borderBottomColor": "gray"
		});
		$(".C-tabContent .ulss").eq(lastChoose).css("display", "none");
		
		lastChoose = index;
		$(".C-tab li").eq(index).css({
			"color": arrColor[index],
			"borderBottomColor": arrColor[index]
		});
		$(".C-tabContent .ulss").eq(index).css("display", "block");
		if(tabData[index] == 0) {
			tabNews(index + 1);
		}
	});
});
function tabNews(index) {
	// console.log(index);
	/* 选项卡ajax数据请求 */
	$.ajax({
		type:"get",
		url:"http://139.199.74.211:8081/new-maven/goods/findGoodsOrderBy.do",
		data:{orderBy: index},
		async:true,
		dataType:"json",
		success:function(data) {
			// console.log(data);
			tabData[index - 1] = data;
			tabNewsPrint(index, data);
//			console.log(index);
//			console.log(tabData);
		}
	});
}
/* 选项卡页面铺开 */
function tabNewsPrint(index, data) {
	var imgTab = tabImgAll[index - 1];
	for(i in data) {
		/* 商品列表编号 */
		($(".ulss").eq(index - 1).find("li").eq(i))[0].index = i;
		$(".ulss").eq(index - 1).find("li").eq(i).html(function() {
			return `<div class="imgs"><a href="##"><img src="${imgTab[i]}" alt="商品图片390*390"></a></div>
					<div class="C-contents">
						<p><a href="##">${data[i].goodsName}</a></p>
						<p>￥${data[i].goodsMemberPrice}</p>
					</div>`;
		});
		$(".ulss").eq(index - 1).find("li").eq(i).click(function() {
			window.location.href = "goodsDetails.html?goodsId=" + data[this.index].goodsId;
		})
	}
}

/* 页面滚动到固定位置加载图片 */
/* 首页导航条 */
var homenav = document.getElementsByClassName("H-homeNav")[0];
/* 首页导航条选项 */
var homenavlis = document.querySelectorAll(".H-homeNav li");
var mobalParts = document.getElementsByName("mobal");
var floorLocation = [1178, 1721, 2264, 2807, 3350, 3893, 4436, 4979, 0];
var homenavNum = 0;
//console.log(homenavlis);
/* 首页导航条点击事件 */
for(var i = 0; i < homenavlis.length; i++) {
	homenavlis[i].index = i;
	homenavlis[i].onclick = function() {
		homenavlis[homenavNum].style.backgroundColor = "lightslategray";
		homenavNum = this.index;
		homenavlis[this.index].style.backgroundColor = "darkorange";
		document.documentElement.scrollTop = floorLocation[this.index];
	}
}
/* 首页导航条与窗口位置对应 */
function homenavchange(pos) {
	for(var i = 0; i < floorLocation.length; i++) {
		if(pos > floorLocation[i] && pos < floorLocation[i + 1]) {
			homenavlis[homenavNum].style.backgroundColor = "lightslategray";
			homenavNum = i;
			homenavlis[i].style.backgroundColor = "darkorange";
//			console.log(i);
			break;
		}
		if(pos > 4979) {
			homenavlis[homenavNum].style.backgroundColor = "lightslategray";
			homenavNum = 7;
			homenavlis[7].style.backgroundColor = "darkorange";
			break;
		}
	}
}

for(var i = 0; i < mobalParts.length; i++) {
	mobalParts[i].isRequest = false;
}
window.onscroll = function(){ 
	var t = document.documentElement.scrollTop || document.body.scrollTop;
//	console.log(t);
	homenavchange(t);
//	console.log(mobalParts[0].isRequest);
//	console.log(floorDatas);
	if(t >= 400) {
		homenav.style.display = "block";
		homenav.style.opacity = ".8";
	} else {
		homenav.style.display = "none";
		homenav.style.opacity = "0";
	}
	/* b1楼 */
	if(t >= 350 && t < 1660) {
		if(mobalParts[0].isRequest == false) {
			mobalParts[0].isRequest = true;
//			console.log("b1");
				/****************** swiper插件重新声明 ****************/
				//首页内容轮播图控制区域：
				var top_slide_Swiper=new Swiper(".top_slide",{
					direction: 'vertical',
					loop: true,
					pagination: '.swiper-pagination',
					autoplayDisableOnInteraction : false,
					autoplay : 1500,
					paginationClickable : true
				});
				// 首页上下轮播控制代码
				var main_left_mid_Swiper = new Swiper ('.main_left_mid', {
				    loop: true,
				    autoplay : 1600,
					autoplayDisableOnInteraction : false,//用户触发按钮后还会自动播放（在使用自动轮播的时候，要把这个属性设置为false，否则用户操作之后就不会自动轮播）
				    // 如果需要前进后退按钮
				    nextButton: '.swiper-button-next',
				    prevButton: '.swiper-button-prev',
					paginationClickable : true
				 });
				 /***************************************************/
			floorRequest(7, 0);
		}
	}
	/* f1楼 */
	if(t >= 900 && t < 2200) {
		if(mobalParts[1].isRequest == false) {
			mobalParts[1].isRequest = true;
//			console.log("f1");
			floorRequest(6, 1);
		}
	}
	/* f2楼 */
	if(t >= 1420 && t < 2700) {
		if(mobalParts[2].isRequest == false) {
			mobalParts[2].isRequest = true;
//			console.log("f2");
			floorRequest(3, 2);
		}
	}
	/* f3楼 */
	if(t >= 2000 && t < 3290) {
		if(mobalParts[3].isRequest == false) {
			mobalParts[3].isRequest = true;
//			console.log("f3");
			floorRequest(9, 3);
		}
	}
	/* f4楼 */ 
	if(t >= 2500 && t < 3830) {
		if(mobalParts[4].isRequest == false) {
			mobalParts[4].isRequest = true;
//			console.log("f4");
			floorRequest(4, 4);
		}
	}
	/* f5楼 */
	if(t >= 3050 && t < 4370) {
		if(mobalParts[5].isRequest == false) {
			mobalParts[5].isRequest = true;
//			console.log("f5");
			floorRequest(5, 5);
		}
	}
	/* f6楼 */
	if(t >= 3600 && t < 4920) {
		if(mobalParts[6].isRequest == false) {
			mobalParts[6].isRequest = true;
//			console.log("f6");
			floorRequest(2, 6);
		}
	}
	/* f7楼 */
	if(t >= 4150) {
		if(mobalParts[7].isRequest == false) {
			mobalParts[7].isRequest = true;
//			console.log("f7");
			floorRequest(8, 7);
		}
	}
}

/* ajax请求楼层数据 */
var judge = true;
function floorRequest(classifyId, floorId) {
	$.ajax({
		type:"get",
		url:"http://139.199.74.211:8081/new-maven/index/index.do",
		data:{classifyId: classifyId},
		async:true,
		success:function(data) {
			var floordata = JSON.parse(data);
			floorData(floordata, floorId);
			if(judge == true) {
				judge == false;
			}
		}
	});
}

/*楼层数据铺开*/
function floorData(data, id) {
	var imgFloor = imgAll[id];
//	console.log(data);
	/* 左边数据 */
	var leftuls = mobalParts[id].querySelector(".main_left_bottom ul");
	leftuls.innerHTML = "";
	var leftlis = "";
	for(var i = 0; i < 8; i++) {
		leftlis += '<li><a href="listPage.html?classifyId=' + data.thirdNameList[i].classifyId + '">' + data.thirdNameList[i].classifyName + '</a></li>'
	}
	leftuls.innerHTML = leftlis;
	/* swiper轮播图片集 */
//	for(var i = 0; i < 1; i++) {
////		var imgs = 
//	}
	/* 右边上部数据 */
	var rightuls1 = mobalParts[id].querySelector(".main_right_top");
	rightuls1.innerHTML = `<div class="top_1 tops">
							<a href="###">${data.goods[5].goodsName}</a>
							<a href="###">
								<img src="${imgFloor[5]}">
							</a>
							</div>
							<div class="top_slide swiper-container">
								<ul class="swiper-wrapper">
									<li class="swiper-slide"><a href="###"><img src="http://images.aiyingshi.com/ADPicPath/FrontPage/20170411/201704110538439067.jpg"></a></li>
									<li class="swiper-slide"><a href="###"><img src="http://images.aiyingshi.com/ADPicPath/FrontPage/20170428/201704280135301162.jpg"></a></li>
									<li class="swiper-slide"><a href="###"><img src="http://images.aiyingshi.com/ADPicPath/FrontPage/20171124/201711240624391280.jpg"></a></li>
								</ul>
							<!-- 如果需要分页器 -->
				    			<div class="swiper-pagination"></div>
							</div>
							<div class="top_2 tops">
								<a href="###">${data.goods[6].goodsName}</a>
								<a href="###">
									<img src="${imgFloor[6]}">
								</a>
							</div>`;
	/* 右边下部数据 */
	var rightuls2 = mobalParts[id].querySelector(".main_right_bottom");
	rightuls2.innerHTML = "";
	for(var i = 0; i < 5; i++) {
		rightuls2.innerHTML += `<li onclick="(function(){window.location.href='goodsDetails.html?goodsId='+${data.goods[i].goodsId}})()">
									<a href="###"><img src="${imgFloor[i]}"></a>
									<div class="move">
										<a href="###">${data.goods[i].goodsName}</a>
										<p>
											<span>￥${data.goods[i].goodsMemberPrice}</span>
											<span class="move_price">￥${data.goods[i].goodsConsultPrice}</span>
										</p>
									</div>
								</li>`;
	}
}

/*ajax获取楼层id*/
/*b1、f1 -- f7*/
var classifyIds = [];
getFloorId();
function getFloorId() {
	$.ajax({
		type:"get",
		url:"http://139.199.74.211:8081/new-maven/floor/findAllFloor.do",
		data:{},
		async:true,
		success:function(data) {
			var floordata = JSON.parse(data);
			for(var i = 0; i < 8; i++) {
				classifyIds.push(floordata[i].floorName);
			}
			// console.log(data);
			for(var i = 0; i < 8; i++) {
				mobalParts[i].querySelector(".main_left_top a").innerHTML = classifyIds[i];
			}
		}
	});
}











