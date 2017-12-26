/* 获取购物车商品id */
var userId = getCookie("userId");
//console.log(userId);
//shoppingAllFun();
function shoppingAllFun() {	/* 全选中 */
	$("#selectAll").click(function() {
		$(".selectDan").each(function() {
			this.checked = $("#selectAll")[0].checked;
		});
		$("#selectAll_2")[0].checked = $("#selectAll")[0].checked;
		isCheckedAll();
	});
	
	/*单选*/
	$(".selectDan").click(function() {
		isCheckedAll();
	});
	
	/* 全选删除 */
	$("#selectAll_2").click(function() {
		$(".selectDan").each(function() {
			this.checked = $("#selectAll_2")[0].checked;
		});
		$("#selectAll")[0].checked = $("#selectAll_2")[0].checked;
		isCheckedAll();
	});
	
	/* 数量控制按钮 */
	$(".ys").click(function() {
		var index = parseInt($(this).index(".ys") / 2);
		$(".amount")[index].value = eval(Number($(".amount")[index].value) + this.value + 1);
		if($(".amount")[index].value <= 1) {
			$(".amount")[index].value = 1;
		}
		/* 优惠 */
		Number($('.discount i').eq(index).html());
		/* 数量 */
		var amountA = $(".amount")[index].value;
		/* 商品id */
		var goodsId = $(".amount").eq(index).prop("id");
		/* 修改数据库购物车 */
//		console.log(userId, goodsId, amountA);
		updataShopping(userId, goodsId, amountA);
		/* 合计 */
		var totleprice = Number($(".singlePrice i").eq(index).html()) * $(".amount")[index].value;
		$(".countPrice i").eq(index).html(parseFloat(totleprice).toFixed(2));
		isCheckedAll();
	});
	
	/*删除单个*/
	$(".table_2 .delete").click(function() {
		var index = $(this).index(".table_2 .delete");
		var goodsId = $(".delete").eq(index).prop("id");
		removeGoods($(".table_2 tr")[index]);
		$(".table_2 tr").eq(index).remove();	
		
		if($(".selectDan").length == 0) {
			window.location.href = "homePage.html";
		}
		/* 删除数据库 */
		removeShopping(goodsId);
		isCheckedAll();
	});
	
	/* 删除全部 */
	$(".deleteAll").eq(0).click(function() {
		$(".selectDan").each(function() {
			var index = $(this).index(".selectDan");
			if(this.checked == true) {
				/* 数据库删除 */
				var goodsId = $(".delete").eq(index).prop("id");
//				console.log(goodsId);
				removeShopping(goodsId);
				/* 节点删除 */
				removeGoods($(".table_2 tr").eq(index));
				$(".table_2 tr").eq(index).remove();
			}
		});
			
		if($(".selectDan").length == 0) {
			setTimeout(function() {
				window.location.href = "homePage.html";
			}, 1000);
		}
		isCheckedAll();
	});
	isCheckedAll();
}

/* 是否选中全部单选 */
function isCheckedAll() {
	/* 选中单选框数量 */
	var count = 0;
	/* 选中商品总价 */
	var allprice = 0;
	$(".selectDan").each(function(index) {
		if(this.checked == true) {
			count++;
			/* 选中商品价格加和 */
			var index = $(this).index(".selectDan");
			allprice += Number($(".table_2 .countPrice i")[index].innerText);
		}
		
		var totleprice = Number($(".singlePrice i").eq(index).html()) * $(".amount")[index].value
		$(".countPrice i").eq(index).html(parseFloat(totleprice).toFixed(2));
	});
	/* count是选中单选框数量,不为0是结算按钮变红 */
	if(count != 0) {
		$('.payMoney .p2 a:nth-of-type(2)').css("background", "red");
	} else {
		$('.payMoney .p2 a:nth-of-type(2)').css("background", "#A1A8B0");
	}
	
	if(count == $(".selectDan").length) {
		$("#selectAll")[0].checked = true;
		$("#selectAll_2")[0].checked = true;
	} else {
		$("#selectAll")[0].checked = false;
		$("#selectAll_2")[0].checked = false;
	}
	/* 更新全部商品费用信息 */
	$(".payMoney .p1 span b").html("￥" + parseFloat(allprice).toFixed(2));

	return parseFloat(allprice).toFixed(2);
}

/* 删除商品信息保留到底部 */
function removeGoods(goods) {
	var removename = $(goods).find(".goodsName a").html();
	var removeprice = $(goods).find(".singlePrice").html();
	var removeamount = $(goods).find(".amount")[0].value;
	$(".goods")[0].innerHTML += '<li><span><a href="###">' + removename + '</a></span><div><span>' + removeprice + '</span><span>' + removeamount + '</span><span><a href="###">重新购买</a><a href="###">关注</a></span></div></li>';
}

/* 修改购物车请求 */
function updataShopping(userId, goodsId, amount) {
	$.ajax({
		type:"get",
		url:"http://139.199.74.211:8081/new-maven/shoppingCar/updateGoodsCount.do",
		async:true,
		dataType:"json",
		data:{userId: userId, goodsId: goodsId, goodsCount: amount},
		success:function(data) {
//			console.log(data);
		}
	});
}

/* 删除购物车请求 */
/* shoppingCarIds 为商品id数组 */
//function removeShopping();
function removeShopping(shoppingCarIds) {
	var _list = {};
	for (var i = 0; i < shoppingCarIds.length; i++) {  
	    _list["selectedIDs[" + i + "]"] = shoppingCarIds[i];  
	}

	$.ajax({
		type:"get",
		url:"http://139.199.74.211:8081/new-maven/shoppingCar/deleteRecord.do",
		async:true,
		data:{shoppingCarIds: shoppingCarIds},
		success:function(data) {
		}
	});
}

/* 获得购物车信息 */
function getShoppingCartThing() {
	$.ajax({
		type:"get",
		url:"http://139.199.74.211:8081/new-maven/shoppingCar/findShoppingCar.do",
		data:{userId: userId},
		async:true,
		success:function(data) {
			var shoppingContent = JSON.parse(data);
			console.log(shoppingContent);
			$(".table_2").html("");
			var shoppingHtml = "";
			$(".spinner").remove();
			for(var i = 0; i < shoppingContent.length; i++) {
				shoppingHtml += `<tr>
						<td>
							<input type="checkbox" checked name="selectDan" class="selectDan">
						</td>
						<td>
							<a href="###"><img src="" alt="img"></a>
						</td>
						<td colspan="2" class="goodsName">
							<a href="###">${shoppingContent[i].goods.goodsName}</a>
						</td>
						<td>
							<span class="singlePrice">￥<i>${shoppingContent[i].goods.goodsMemberPrice}</i></span>
						</td>
						<td>
							<span class="discount">优惠￥<i>0.00</i></span>
						</td>
						<td>
							<input type="button" name="ys" class="ys" value="-">
							<input type="text" id="${shoppingContent[i].goods.goodsId}" name="amount" class="amount" value="${shoppingContent[i].goodsCount}">
							<input type="button" name="ys" class="ys" value="+">
						</td>
						<td>
							<span class="countPrice">￥<i>${isCheckedAll()}</i></span>
						</td>
						<td>
							<a href="###" class="delete" id="${shoppingContent[i].shoppingCarId}">删除</a>
						</td>
					</tr>`;
			}
			$(".table_2").html(shoppingHtml);
			$(".payMoney .p2 a:nth-of-type(2)").click(payBtn);
			$(".payMoney .p2 a:nth-of-type(1)").click(function() {
				window.location.href = "homePage.html";
			});
			shoppingAllFun();
			isCheckedAll();
		}
	});
}
/* 是否登录 */
if(userId != undefined) {
//	console.log("ok");
	userNews(userId);
	getShoppingCartThing(userId);
} else {
	window.location.href = "homePage.html";
}

/* 点击结算 */
function payBtn() {
	console.log("ok");
	var countNum = 0;
	$(".selectDan").each(function(index) {
		if(this.checked == true) {
			countNum += 1;
//			window.location.href = "homePage.html";
		} else {
			/* 数据库删除 */
			var goodsId = $(".delete").eq(index).prop("id");
			removeShopping(goodsId);
		}
	});
	if(countNum != 0) {
		window.location.href = "order.html?userId=" + userId;
	}
}

/* 结算按钮实现 */
//payMoney(24, 4, 5);
//function payMoney(userId, goodsId, goodsCount) {
//	$.ajax({
//		type:"get",
//		url:"http://139.199.74.211:8081/new-maven/shoppingCar/updateGoodsCount.do",
//		async:true,
//		data:{userId:userId, goodsId:goodsId, goodsCount:goodsCount},
//		success:function(data) {
//			console.log(JSON.parse(data));
//		}
//	});
//}

function userNews(userId) {
	$.ajax({
		type:"get",
		url:"http://139.199.74.211:8081/new-maven/user/select.do",
		data:{userId: userId},
		dataType:"json",
		async:true,
		success:function(data) {
			$(".cart_inner_left").html(function() {
				return `<span>您好 <i>${data.name}</i> 欢迎回到爱婴室！ <a href="" onclick="(function() {clearCookie('userId');})()">[退出]</a>`;
			});
		}
	});
}






