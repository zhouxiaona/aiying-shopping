var userId=getCookie("userId");
console.log(userId);
//userId=48;
//分页的设置
function pager(data){
	
	$(".content .Cright .Cbom .pager .pagerInner b:nth-of-type(1)").html();
	$(".content .Cright .Cbom .pager .pagerInner b:nth-of-type(2)").html();
	$(".content .Cright .Cbom .pager .pagerInner i").html();
}
if(userId != undefined) {
	$.ajax({
		type:"post",
		url:"http://139.199.74.211:8081/new-maven/orders/findOrders.do?",
		async:true,
		dataType:"json",
		data:{userId: userId},
		success:function(data){
			console.log(data);
			orderData(data);
		}
	});
} else {
	$(".content .Cright .Cbom1").html("<div>用户未登录！</div>");
}
//转换时间戳的函数
 function getLocalTime(nS) { 
    var unixTimestamp = new Date(nS) ;
	var commonTime = unixTimestamp.toLocaleString();
	return commonTime;
}
//判断订单是否删除废除
function jugerOrder(buyId){
	if(buyId==0){
		return "订单未支付";
	}else if(buyId==1){
		return "订单已付款";
	}else{
		return "订单作废";
	}
}
//渲染中间商品
function goods(orderGoods){
	var lis="";
	for(var i=0;i<orderGoods.length;i++){
		lis+=`<li>
				<a href="###">
					<img src="../img/adv.jpg" alt="" />
				</a>
			  </li>`;
	}
	return lis;
}

function orderData(data){
	$(".pagerInner").html(function() {
		var pageAll = 3;
		if(data.length <= 8) {
			pageAll = 1;
		} else if(data.length <= 16) {
			pageAll = 2;
		}
		return `<span>共有<b>${data.length}</b>条记录</span>
				<span><b>1</b>/<i>${pageAll}</i></span>
				<a href="###">上一页</a>
				<a href="###">下一页</a>`;
	});
	for(var i=data.length-1;i>0;i--){
		var div=document.createElement("div");
		div.className="li clearfix";
		//转换时间戳
		var time=getLocalTime(data[i]['startTime']);
		//计算总的商品件数
		var orderGoods=data[i]['orderGoods'];
		var goodsNum=0;
		for(var j=0;j<orderGoods.length;j++){
			goodsNum+=Number(orderGoods[j]['goodsCount']);
		}
		//判断该订单是否废除
		var buyRes=jugerOrder(data[i]['buyId']);
		//判断有多少个商品
		var good=goods(data[i]['orderGoods']);
		
		div.innerHTML=`<div class="liLeft fl">
									<p class="createDate">${time}</p>
									<p class="totalPrice">￥${data[i]['trueTotalPrice']}</p>
								</div>
								<div class="liRight fl">
									<div class="liTop clearfix">
										<div class="orderId fl">
											<span>订单号：<b>${data[i]['orderId']}</b></span>
										</div>
										<div class="owner fl">收货人</div>
										<div class="orderState fl">订单状态</div>
										<div class="control fl">操作</div>
									</div>
									<div class="liBom clearfix">
										<div class="orderIds fl">
											<ul class="fl">
												${good}
											</ul>
											<div class="infos fl">
												<a href="###">查看全部</a>
												<p>共${goodsNum}件</p>
											</div>
										</div>
										<div class="owners fl">${data[i]['shoppingAddress']['name']}</div>
										<div class="orderStates fl">${buyRes}</div>
										<div class="control fl">
											<a href="###">再次购买</a>
											</br>
											<a href="###">查看</a>
										</div>
									</div>
								</div>`;
		$(".content .Cright .Cbom2").append(div);
		$(".control").eq(i).find("a:nth-of-type(1)").click(function() {
			buyAgain(data[i]['orderGoods']);
		});
		$(".control").eq(i).find("a:nth-of-type(2)").click(function() {
			window.location.href = "orderSingle.html?orderId="+data[i]['orderId'];
		});
	}
}
function buyAgain(goodsIds){
	for(i in goodsIds) {
		addShoppingCart(goodsIds[i].goods.goodsId, userId);
	}
	setTimeout(function() {
		window.location.href = "shoppingCart.html";
	}, 200);
}
