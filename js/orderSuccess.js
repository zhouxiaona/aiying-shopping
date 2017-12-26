//获取订单页面传过来的userId和orderId
var userId = getCookie("userId");
var orderId = GetQueryString("orderId");
console.log(userId,orderId);
//订单号
$(".menuTitle .listNum a").html(orderId);
//根据orderId查询此用户当前的收货地址
window.onload = function() {
	$.ajax({
		type:"get",
		url:"http://139.199.74.211:8081/new-maven/orders/findOrdersOne.do",
		async:true,
		dataType:"html",
		data:{orderId:orderId},
		success:function(data){
			console.log(JSON.parse(data));
			var obj=JSON.parse(data);
			$(".outer .top .address").html(obj['orders']['shoppingAddress']['name']+"  "+obj['orders']['shoppingAddress']['city']+obj['orders']['shoppingAddress']['address']);
			$(".bill b").html("￥"+obj['orders']['trueTotalPrice']);
		}
	});
}

loadHtml();
function loadHtml() {
	//点击订单号，跳到详细订单页面
	$(".menuBo .menuInner .menuTitle .listNum a").click(function(){
		window.location.href="orderSingle.html?userId="+userId+"&orderId="+orderId;
	});
	
	//点击收起，显示快递页面
	var isF=true;
	$(".menuInner .outer .top a").click(function(){
		if(isF){
			$(this).css("background",'url("../img/jiantou2.png") no-repeat scroll right');
			$(".outer").css("height","185px");
			isF=false;
		}else{
			$(this).css("background",'url("../img/jiantou2_1.png") no-repeat scroll right');
			$(".outer").css("height","48px");
			isF=true;
		}	
	});
	//点击修改支付方式
	var isO=true;
	$(".payForm .payTitle a").click(function(){
		if(isO){
			$(this).css("background",'url("../img/jiantou2.png") no-repeat scroll right');
			$(".payForm").css("height",280);
			$(".nowPay").css("display","none");
			isO=false;
		}else{
			$(this).css("background",'url("../img/jiantou2_1.png") no-repeat scroll right');
			$(".payForm").css("height",100);
			cookie();
			$(".nowPay").css("display","block");
			isO=true;
		}
	});
	//判断cookie值来获取支付方式相应的图片
	function cookie(){
		var Pos=getCookie("Pos");
		if(Pos){
			var Poss=Number(Pos);
			$(".nowPay .img_box").css("background",'url("../img/bank-logo.png") no-repeat 0 -'+Poss+'px');
		}else{
			$(".nowPay .img_box").html("您还没有选择支付方式");
		}
	}
	cookie();
	
	// 支付方式(银行图片)动态生成
	for(var i = 0; i < 15; i++) {
		var li = document.createElement("li");
		li.innerHTML = "<input type='radio' name='bankRadio' id='bank_" + i + 1 + "'><label for='bank_" + i + 1 + "'></label>";
		$(".payInner>ul").append(li);
	}
	// 获取所有放图片的label标签
	var labels = $(".payInner>ul>li>label");
	for(var i = 0; i < labels.length; i++){
		labels[i].style.background = "url('../img/bank-logo.png') no-repeat 0 -" + 28 * i + "px";
		//根据点击的支付方式图片获取到相应的cookie
		$(labels[i]).attr("Pos",28*i);
		labels[i].onclick=function(){
			var Pos=$(this).attr("Pos");
			var time=new Date();
			setCookie("Pos",Pos,time);
		}
	}

	console.log($(".cart_inner ul li:nth-of-type(1)"));
	$(".cart_inner ul li:nth-of-type(1)").click(function() {
		window.location.href = "orderSingle.html?orderId=" + orderId;
	});
}

