//获取从成功添加订单页面传来的userId和orderId
var userId=getCookie("userId");
var orderId=GetQueryString("orderId");
console.log(userId,orderId);

//页眉的订单号
$(".content .Ctitle a:last b").html(orderId);
$(".content .line span:first b").html(orderId);
//根据orderId来渲染详细信息页面
$.ajax({
	type:"get",
	url:"http://139.199.74.211:8081/new-maven/orders/findOrdersOne.do",
	async:true,
	dataType:"html",
	data:{orderId:orderId},
	success:function(data){
		console.log(JSON.parse(data));
		var obj=JSON.parse(data);
		//渲染收货人详细信息--------------------------------
		$(".Corder .CorderIn .CorderInTop .name").html(obj['orders']['shoppingAddress']['name']);
		$(".Corder .CorderIn .CorderInTop .addres").html(obj['orders']['shoppingAddress']['city']+obj['orders']['shoppingAddress']['address']);
		$(".Corder .CorderIn .CorderInTop .phone").html(obj['orders']['shoppingAddress']['telephone']);
		$(".Corder .CorderIn .CorderInTop .telephone").html(obj['orders']['shoppingAddress']['phone']);
		$(".Corder .CorderIn .CorderInTop .mes").html(obj['orders']['mes']);
		//渲染总计算的金额-----------------------------
		$(".sum .sumDiv p:first span:nth-child(2)").html("￥"+obj['orders']['totalPrice']);
		$(".sum .sumDiv p:nth-of-type(3) span:nth-child(2)").html("￥"+obj['orders']['fare']);
		$(".sum .sumDiv p:last span:nth-child(2)").html("￥"+obj['orders']['trueTotalPrice']);
		//渲染商品列表
		var orderList=obj['orders']['orderGoods'];
		$("table")[0].innerHTML=`<table>
									<tr>
										<th>商品编号</th>
										<th colspan="3">商品名称</th>
										<th>单价</th>
										<th>数量</th>
										<th>重量</th>
										<th>操作</th>
									</tr>
								</table>`;
		for(var i=0;i<orderList.length;i++){
			var tr=document.createElement("tr");
			$(tr).attr("goodsId",orderList[i]['goods'][0]['goodsId']);
			tr.innerHTML=`<td>${orderList[i]['goods'][0]['goodsId']}</td>
						  <td colspan="3">
							<span class="img_wrap">
								<a>
									<img src="../img/main_left_top.jpg" alt="" />
								</a>
							</span>
							<span class="goods_title">
								<a>${orderList[i]['goods'][0]['goodsName']}</a>
							</span>
						  </td>
						  <td>￥${orderList[i]['goods'][0]['goodsMemberPrice']}</td>
						  <td>${orderList[i]['goodsCount']}</td>
						  <td>1.5kg</td>
						  <td>
							<a>再次购买</a>
						  </td>`;
			$("table").append(tr);
		}
		
		//点击商品图片跳到商品详情页面(发送参数)
		$("table tr:nth-child(n+2) td:nth-child(2) span a").each(function(){
			$(this).click(function(){
				var num=Number($(this).parents("tr").attr("goodsId"));
				console.log(num);
		//		window.location.href="";
			});
		});
		
		$("table tr:nth-child(n+2) td>a").each(function(){
			$(this).click(function(){
				var num=Number($(this).parents("tr").attr("goodsId"));
				console.log(num);
		//		window.location.href="";
			});
		});
	}
});































