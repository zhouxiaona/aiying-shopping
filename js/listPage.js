//获取从主页传过来的大类商品id
var classifyId = GetQueryString("classifyId");
var keyword = decodeURI(GetQueryString("keyword"));
// console.log(classifyId);
// console.log(keyword);
var pageNum = 1;
//定义数组来放请求之后的数据，再次请求时就不再请求
var listArr=[];
//放一级标题的数组
var arrTitAll = ["纸尿裤", "玩具书籍", "配方奶粉", "营养辅食", "喂养用品", "洗涤护理", "童车童床", "服饰寝具", "湿巾/纸巾"];
 if(Number(classifyId) > 9) {
	getTitCon(classifyId);
 } else if(Number(classifyId) <= 9 && Number(classifyId) > 0) {
 	html = `<span class="fl">&gt;</span>
 			<a class="fl head">${arrTitAll[classifyId - 1]}</a>`;
	$(".list_top_nav").html($(".list_top_nav").html() + html);
 } else {
 	html = `<span class="fl">&gt;</span>
 			<a class="fl head">${keyword}</a>`;
	$(".list_top_nav").html($(".list_top_nav").html() + html);
 }
 
 function getTitCon(classifyId){
 	$.ajax({
 		type:"get",
 		url:"http://139.199.74.211:8081/new-maven/classify/findByThirdId.do",
 		data:{classifyId: classifyId},
 		dataType:"json",
 		async:true,
 		success:function(data){
   			// console.log(data);
 			titConPrint(data);
 		}
 	});
 }
 
 function titConPrint(data) {
 	$(".list_top_nav").html("");
 	var htmlTit = `<strong class="fl"><a href="homePage.html">首页</a></strong>`;
 	for(i in data) {
 		if(data[i] != null) {
 			htmlTit += `<span class="fl">&gt;</span>
						<a href="listPage.html?classifyId=${data[i].classifyId}" class="fl head">${data[i].classifyName}</a>`;
 		}
 	}
 	$(".list_top_nav").html(htmlTit);
 }
 //默认  销量  价格  上架时间
// $(".list_right_bottom .info .defaultC").click(function(){
// 	window.location.href="listPage.html?classifyId="+classifyId+"&sequence=1";
// });
// $(".list_right_bottom .info .imporC").click(function(){
// 	window.location.href="listPage.html?classifyId="+classifyId+"&sequence=2";
// });
// $(".list_right_bottom .info .priceC").click(function(){
// 	window.location.href="listPage.html?classifyId="+classifyId+"&sequence=3";
// });
// $(".list_right_bottom .info .timeC").click(function(){
// 	window.location.href="listPage.html?classifyId="+classifyId+"&sequence=4";
// });


//根据前台传来的大类商品id向后台获得数据渲染页面
$.ajax({
	url:"http://139.199.74.211:8081/new-maven/goods/getGoodsByAllConditions.do",
	type:"post",
	dataType:"json",
	async:true,
	data:{classifyId:classifyId}, 	
	success:function(data){
		// console.log(data);
		listArr.length=data['cutPage']['totalPage'];
		for(var i=0;i<listArr.length;i++){
			listArr[i]=0;
		}
		listArr[data['cutPage']['page']-1]=data;
		//渲染左上的搜索结果分类
		goodFind(data);
		//渲染右上部分的数据
		goodChoose(data);
		//加载动画的消失条件
		$(".info_list .load-wrapp").css("display","none");
		//渲染右下的商品列表
		goodListData(data);
		//分页器
		Page({
			num:data['cutPage']['totalPage'],//页码数
			startnum:1,		                //指定开始页码
			elem:$('#page1'),		        //指定的元素
			callback:function(n){	        //回调函数
				pageNum = n;
				requestPage(pageNum);
			}
		});
	}
});
//-----------封装左上的搜索结果分类的数据铺开函数----------------------
function goodFind(data){
	$(".list_left_nav .hot_list .subNavBox").html("");
	var goodF=data['ClassifyCount'];
	var isF=true;
	for(var i=0;i<goodF.length;i++){
		var div=document.createElement("div");
		div.className="subNav";
		//-------------------------------------
		var ul=document.createElement("ul");
		if(isF){
			$(ul).css("display","block");
		}
		isF=false;
		ul.className="navContent";
		//-------------------------------------
		div.innerHTML=`<a href='listPage.html?classifyId=${goodF[i]['secondClassify']['classifyId']}'>${goodF[i]['secondClassify']['classifyName']}</a>`;
		//-------------------------------------
		var goodFT=goodF[i]['secondList'];
		for(var j=0;j<goodFT.length;j++){
			var li=document.createElement("li");
			var str=goodFT[j]['thirdClassify']['classifyName']+"("+goodFT[j]['thirdNum']+")";
			li.innerHTML=`<a href='listPage.html?classifyId=${goodFT[j]['thirdClassify']['classifyId']}'>${str}</a>`;
			$(ul).append(li);
		}
		//---------------------------------------
		$(".list_left_nav .hot_list .subNavBox").append(div);
		$(".list_left_nav .hot_list .subNavBox").append(ul);
	}
	//控制左侧伸缩导航栏,手风琴效果控制区域
	control();
}
//-------------------封装左下的热销榜数据铺开的函数--------------------
//渲染左下的热销榜
 $.ajax({
 	url:"http://139.199.74.211:8081/new-maven/goods/findHotGoods.do",
 	type:"get",
 	dataType:"json",
 	async:true,
 	data:{classifyId:classifyId},
 	success:function(data){
 		// console.log(data);
 		for(var i=0;i<data.length;i++){
 			var li=document.createElement("li");
 			li.className="fl";
 			li.innerHTML=`<div class="img_wrap fl">
								<a class="hot_l" href="goodsDetails.html?goodsId=${data[i]['goodsId']}">
									<img src="${data[i].img1_l}" alt="img">
								</a>
							</div>
							<div class="hot_r fl">
								<p>
									<a href="goodsDetails.html?goodsId=${data[i]['goodsId']}">${data[i]['goodsName']}</a>
								</p>
								<span>￥${data[i]['goodsMemberPrice']}</span>
							</div>`;
			$(".hot_list .sps").append(li);
 		}
 		
 	}
 });
//---------------封装右上筛选栏的数据铺开函数-------------------------
function goodChoose(data){
	$(".sort_top span").html(data['goodsSize']);
	$(".sort_bottom").html("");
	for(var i=0;i<data['conditions'].length;i++){
		var dl=document.createElement("dl");
		$(dl).addClass("brand");
		dl.innerHTML=`<div class="vip">
						<dt>${data['conditions'][i]['condition_name']}</dt>
						<span class="brandBox">
							${add2(data['conditions'][i]['condition_info'])}
						</span>
					</div>
					<div class="more">
						<a href="###">更多</a>
					</div>
					<div class="less">
						<a href="###">收起</a>
					</div>`;	
		$(".sort_bottom").append(dl);	
	}
	main();
}
//生成二级标题的函数
function add2(arr){
	var html = "";
	for(var j=0;j < arr.length;j++){
		html+=`<dd>
					<span>
						<a href="###">${arr[j].condition_value} (<b>${arr[j].condition_num}</b>)</a>
					</span>
				</dd>`;
	}
	return html;
}

//---------------封装右下的商品列表的数据铺开函数----------------------
function goodListData(data){
	$(".list_right_bottom .info_r .b1").html(data['goodsSize']);
	$(".list_right_bottom .info_r .b2").html(data['cutPage']['page']);
	$(".list_right_bottom .info_r i").html(data['cutPage']['totalPage']);
//	渲染商品详情列表
	var goodsList=data['goodsList'];
	for(i in goodsList){
		// console.log(data);
		var li=document.createElement("li");
		li.innerHTML=`<div class="img_wrap"><a href="goodsDetails.html?goodsId=${goodsList[i]['goodsId']}"><img src="${goodsList[i].img1_l}" alt="img"></a>
					</div>
					<div class="cont_wrap">
						<h3><a href="goodsDetails.html?goodsId=${goodsList[i]['goodsId']}">${goodsList[i].goodsName}</a></h3>
						<p class="price_1">参考价：￥${goodsList[i].goodsConsultPrice}</p>
						<p class="price_2">￥${goodsList[i].goodsMemberPrice}</p>
						<p class="shop">
							<a href="">加入购物车</a>
							<a href="###">关注</a>
							<a href="###">比较</a>
						</p>
					</div>`;
		$(".info_list ul").append(li);
	}
	addShoppingBtn(goodsList[i]['goodsId']);
}


//根据页码向后台请求这一页的数据进行渲染                            
function requestPage(pageNum){
	$(".info_list ul").html("");
	if(listArr[pageNum-1]==0){
		$(".info_list .load-wrapp").css("display","block");
		$.ajax({
			url:"http://139.199.74.211:8081/new-maven/goods/getGoodsByAllConditions.do",
			type:"post",
			dataType:"json",
			async:true,
			data:{
				classifyId:classifyId,
				page:pageNum,
			},
			success:function(data){
				console.log(data);
				$(".info_list .load-wrapp").css("display","none");
				listArr[pageNum-1]=data;
				goodListData(data);
			}
		});
	}else{
		goodListData(listArr[pageNum-1]);
	}
}




//-----------------------------------------------------------------------------------------------

// List 搜索结果分类 手风琴效果控制区域：
function control(){
	$(function(){
	    $(".subNav").click(function(){
	        $(this).toggleClass("currentDd").siblings(".subNav").removeClass("currentDd")
	        $(this).toggleClass("currentDt").siblings(".subNav").removeClass("currentDt")
	        $(this).next(".navContent").slideToggle(300).siblings(".navContent").slideUp(500);
	    });
	});
}


// List表的右上筛选列表操作区域：
function main(){
	window.onload=function(){
		// 判断一共的数据数，如果一行放不下，则更多按钮出现
		$(".brandBox").each(function(){
			if($(this).height()>41){
				$(this).parent(".vip").siblings(".more").css("display","block");
			}
		});
		// 判断更多选择按钮的出现条件
		var dls=$(".list_right_top .sort_bottom dl");
		if(dls.length>5){
			$(".list_right_nav .on .a_on").css("display","inline-block");
		}
	}
	
	// 更多 按钮的操作
	$(".more").each(function(){
		$(this)[0].onclick=function(){
			var height=$(this).siblings(".vip").children(".brandBox").height();
			$(this).siblings(".less").css("display","block").css("top",height-40);
			$(this).css("display","none");
			$(this).siblings(".vip").css("height",height);
			// 更多按钮影响sort_bottom的高度
			$(".list_right_top .sort_bottom").css("maxHeight",function(index,oldValue){
				return parseInt(oldValue)+parseInt(height)-41;
			});
		}
	});
	
	
	// 收起 按钮的操作
	$(".less").each(function(){
		$(this)[0].onclick=function(){
			$(this).siblings(".more").css("display","block");
			$(this).css("display","none");
			$(this).siblings(".vip").css("height","41px");
			// 收起按钮影响sort_bottom的高度
			var height=$(this).siblings(".vip").children(".brandBox").height();
			$(".list_right_top .sort_bottom").css("maxHeight",function(index,oldValue){
				return parseInt(oldValue)-parseInt(height)+41;
			});
		}
	});
	
	// 更多选择 按钮点击事件
	$(".a_on")[0].onclick=function(){
		$(this).css("display","none");
		$(this).siblings(".a_off").css("display","block");
		var dls=$(".list_right_top .sort_bottom dl");
		var a=dls.length*41;
		$(".list_right_top .sort_bottom").css("maxHeight",a);
	}
	
	// 收起选择 按钮点击事件
	$(".a_off")[0].onclick=function(){
		$(this).css("display","none");
		$(this).siblings(".a_on").css("display","block");
		$(".list_right_top .sort_bottom").css("maxHeight",205);
	}
	
}

/* 加入购物车按钮 */ 
function addShoppingBtn(goodsId) {
	$(".shop a:nth-of-type(1)").click(function() {
		if(userId != undefined) {
			addShoppingCart(goodsId, userId);
		} else {
			window.location.href = "login.html";
		}
	});
}









