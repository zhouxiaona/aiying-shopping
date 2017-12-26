var userId=getCookie("userId");
//刚进入页面时，根据传给后台的uId，获得收货人信息
console.log(userId);


// 点击修改之后，info界面显示
$(".big_content>.orderOuter>li>p>a").each(function() {
	$(this).click(function() {
		var height = $(this).parent("p").siblings(".info").children(".infoInner").height();
		$(this).parent("p").siblings(".info").css("height", height + 52);
	});
});
// 支付方式(银行图片)动态生成
for(var i = 0; i < 15; i++) {
	var li = document.createElement("li");
	li.innerHTML = "<input type='radio' name='bankRadio' id='bank_" + i + 1 + "'><label for='bank_" + i + 1 + "'></label>";
	$(".big_content>.orderOuter>li:nth-of-type(3)>.choose>ul")[0].appendChild(li);
}
// 获取所有放图片的label标签
var labels = $(".big_content>.orderOuter>li:nth-of-type(3)>.choose>ul>li>label");
for(var i = 0; i < labels.length; i++) {
	labels[i].style.background = "url('../img/bank-logo.png') no-repeat 0 -" + (28 * i) + "px";
	//根据点击的支付方式图片获取到相应的cookie
	$(labels[i]).attr("Pos",28*i);
	labels[i].onclick=function(){
		var Pos=$(this).attr("Pos");
		var time=new Date();
		setCookie("Pos",Pos,time);
	}
}

//添加收货人地址操作------------------------------------------------------
var res=0;
var jageNum=1;

var lastAdressId=0;
//刚进入页面时，点击修改按钮传给后台的uId，获得收货人信息
$(".big_content>.orderOuter>li:nth-of-type(1)>p>a").click(function(){
	var _this = this;
	$.ajax({
		type: "post",
		url: "http://139.199.74.211:8081/new-maven/shoppingAddress/select.do",
		async: true,
		dataType: "json",
		data: {uId: userId},
		success: function(data) {
			console.log(data);
			$(".orderOuter>li:nth-of-type(1) .listRadio").html("");
			for(i in data) {
				var li = document.createElement("li");
				var arr = data[i]['city'].split("-");
				li.innerHTML = "<input type='radio' name='radioS' value='" + data[i]['addressId'] + "'><span class='name'>" + data[i]['name'] + "</span><span class='adress'>" + arr[0] + arr[1] + arr[2] + "</span><span class='adress2'>" + data[i]['address'] + "</span><span class='phoneNum1'>" + data[i]['phone'] + "</span><span class='none' style='display:none;'>" + data[i]['telephone'] + "</span><a class='edit'>编辑</a><a  class='delete'>删除</a>";
				$(".orderOuter>li:nth-of-type(1) .listRadio").append(li);
			}
			deletes();
			updates();
			var height = $(_this).parent("p").siblings(".info").children(".infoInner").height();
			$(_this).parent("p").siblings(".info").css("height", height + 52);
		}
	});
});

// 添加收货人地址，点击保存收货人信息按钮 的时候
$(".save1 a").click(function(){
	// 判断使用新地址的按钮被选中，才能成功添加新地址
	if($(".orderOuter>li:nth-of-type(1) .info input:radio[name='radioS']:checked").val() == "newAdres" && jageNum==1) {
		// 判断基本信息是否添加完整且格式正确
		if(!isNull($(".orderOuter>li:nth-of-type(1) .tipForm input:text[name='goodsPeople']").val())) {
			alert("请您填写收货人姓名");
		} else if($(".privence").val() == "n" || $(".city").val() == "n" || $(".town").val() == "n") {
			alert("请您填写完整的地区信息");
		} else if(!isNull($(".orderOuter>li:nth-of-type(1) .tipForm input:text[name='adress']").val())) {
			alert("请您填写收货人的详细地址");
		} else if(!isNull($(".orderOuter>li:nth-of-type(1) .tipForm input:text[name='phoneNum1']").val()) || !checkMobile($(".orderOuter>li:nth-of-type(1) .tipForm input:text[name='phoneNum1']").val())) {
			alert("收货人手机号码格式不正确");
		} else if(!checkTel($(".orderOuter>li:nth-of-type(1) .tipForm input:text[name='phoneNum2']").val())) {
			alert("收货人手机号码格式不正确");
		} else {
			//判断是否有5条记录，如果有，则不能继续添加。反之可以添加
			var liArr = $(".orderOuter>li:nth-of-type(1) .listRadio>li");
			if(liArr.length < 5) {
				var name = $(".orderOuter>li:nth-of-type(1) .tipForm input:text[name='goodsPeople']").val();
				var citys = $(".infoAdres").html() + "-" + $(".infoAdres2").html() + "-" + $(".infoAdres3").html();
				console.log(citys);
				var adresss = $("input:text[name='adress']").val();
				var adress = citys + adresss;
				var phoneNum1 = $(".orderOuter>li:nth-of-type(1) .tipForm input:text[name='phoneNum1']").val();
				var phoneNum2 = $(".orderOuter>li:nth-of-type(1) .tipForm input:text[name='phoneNum2']").val();
				//向后台提交新添加的收货人记录
				var dataObj = {
					uId: userId,
					name: name,
					city: citys,
					address: adresss,
					phone: phoneNum1,
					telephone: phoneNum2
				};
				request("http://139.199.74.211:8081/new-maven/shoppingAddress/add.do", dataObj);
				change(name, phoneNum1, adress);
				hidden();
			} else {
				alert("最多保存5个收货地址");
			}
		}
	} else if($(".orderOuter>li:nth-of-type(1) .info input:radio[name='radioS']:checked").val() != "newAdres" && jageNum==2){
		if(!isNull($(".orderOuter>li:nth-of-type(1) .tipForm input:text[name='goodsPeople']").val())) {
			alert("请您填写收货人姓名");
		} else if($(".privence").val() == "n" || $(".city").val() == "n" || $(".town").val() == "n") {
			alert("请您填写完整的地区信息");
		} else if(!isNull($(".orderOuter>li:nth-of-type(1) .tipForm input:text[name='adress']").val())) {
			alert("请您填写收货人的详细地址");
		} else if(!isNull($(".orderOuter>li:nth-of-type(1) .tipForm input:text[name='phoneNum1']").val()) || !checkMobile($(".orderOuter>li:nth-of-type(1) .tipForm input:text[name='phoneNum1']").val())) {
			alert("收货人手机号码格式不正确");
		} else if(!checkTel($(".orderOuter>li:nth-of-type(1) .tipForm input:text[name='phoneNum2']").val())) {
			alert("收货人手机号码格式不正确");
		} else {
			var name = $(".orderOuter>li:nth-of-type(1) .tipForm input:text[name='goodsPeople']").val();
			var citys = $(".infoAdres").html() + "-" + $(".infoAdres2").html() + "-" + $(".infoAdres3").html();
			var adresss = $("input:text[name='adress']").val();
			var adress = citys + adresss;
			var phoneNum1 = $(".orderOuter>li:nth-of-type(1) .tipForm input:text[name='phoneNum1']").val();
			var phoneNum2 = $(".orderOuter>li:nth-of-type(1) .tipForm input:text[name='phoneNum2']").val();
			var objs = {
				name: name,
				city: citys,
				address: adresss,
				phone: phoneNum1,
				telephone: phoneNum2,
				addressId: res,
			};
			request("http://139.199.74.211:8081/new-maven/shoppingAddress/update.do", objs);
			change(name, phoneNum1, adress);
			hidden();
			jageNum=1;
		}
	}else{
		deRadio();
		hidden();
		jageNum=1;
	}
});
//更改记录与添加新纪录
function request(url, datas) {
	$.ajax({
		type: "post",
		url: url,
		async: true,
		dataType: "json",
		data: datas,
		success: function(data) {
			console.log(data);
		}
	});
}
//点击删除按钮，删除收货地址记录
function deletes() {
	$(".orderOuter>li:nth-of-type(1) .listRadio .delete").each(function() {
		$(this).click(function() {
			var addressId = $(this).siblings("input").val();
			$.ajax({
				url: "http://139.199.74.211:8081/new-maven/shoppingAddress/delete.do",
				type: "post",
				dataType: "json",
				async: true,
				data: {
					addressId: addressId
				},
				success: function(data) {
					console.log(data);
				}
			});
			$(this).parent("li").remove();
			if($(this).siblings("input").prop("checked")) {
				change("", "", "");
			}
			hidden();
		});
	});
}
//点击更改按钮，重新编辑收货地址记录
function updates(){
	$(".orderOuter>li:nth-of-type(1) .listRadio .edit").each(function() {
		$(this).click(function(){
			jageNum=2;
			$(this).siblings("input:radio[name='radioS']").prop("checked", true);
			res = $(this).siblings("input:radio[name='radioS']").val();
			$.ajax({
				type: "post",
				url: "http://139.199.74.211:8081/new-maven/shoppingAddress/selectAddress.do",
				async: true,
				dataType: "json",
				data: {
					addressId: res,
				},
				success: function(data) {
					console.log(data);
					var arr = data['city'].split('-');
					$(".orderOuter>li:nth-of-type(1) .tipForm input:text[name='goodsPeople']").val(data['name']);
					$(".privence").find("option:selected").text(arr[0]);
					$(".city").find("option:selected").text(arr[1]);
					$(".town").find("option:selected").text(arr[2]);
					$(".infoAdres").html(arr[0]);
					$(".infoAdres2").html(arr[1]);
					$(".infoAdres3").html(arr[2]);
					$("input:text[name='adress']").val(data['address']);
					$(".orderOuter>li:nth-of-type(1) .tipForm input:text[name='phoneNum1']").val(data['phone']);
					$(".orderOuter>li:nth-of-type(1) .tipForm input:text[name='phoneNum2']").val(data['telephone']);	
				}
			});	
		});
	});
}
//遍历单选框，让 选择收货地址 中的信息为默认选中状态的那个单选框
function deRadio(){
	var radios = $(".orderOuter .listRadio input:radio[name='radioS']");
	for(i in radios) {
		if(radios[i].checked) {
			var adressId=$(radios[i]).val();
			lastAdressId=Number(adressId);
			var Na = $(radios[i]).siblings(".name").html();
			var Ph = $(radios[i]).siblings(".phoneNum1").html();
			var Ad = $(radios[i]).siblings(".adress").html()+$(radios[i]).siblings(".adress2").html();
			change(Na, Ph, Ad);
		}
	}
}
//动态改变 选择收货地址 中的信息为最近保存的
function change(name, phoneNum1, adress) {
	$(".orderOuter>li:nth-of-type(1) .orderInner>li")[0].innerHTML = "<p><span class='lastName'>" + name + "</span><span class='lastPhone1'>" + phoneNum1 + "</span></p><p>" + adress + "</p>";
}
//没有选中添加新地址按钮的话，清空所填写的内容，并隐藏info页面
function hidden() {
	$(".orderOuter>li:nth-of-type(1) .info").css("height", 0);
	$(".orderOuter>li:nth-of-type(1) input:text").val("");
	$(".orderOuter>li:nth-of-type(1) select").val("n");
	$(".infoAdres").html("");
	$(".infoAdres2").html("");
	$(".infoAdres3").html("");
}
// 判断输入框中的值是否为空或空格
function isNull(str){
	var regu = "^[ ]+$";
	var re = new RegExp(regu);
	if(str.length == 0 || re.test(str)) {
		return false;
	} else {
		return true;
	}
}
//判断电话号码的正则表达式
function checkMobile(phoneNum) {
	if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phoneNum))) {
		return false;
	} else {
		return true;
	}
}
//判断固定电话格式的正则表达式函数
function checkTel(tel) {
	var arrNum = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	for(i in tel) {
		if(arrNum.indexOf(tel[i]) == -1) {
			return false;
		}
	}
	return true;
}
// 地址多选框的获取
// privence
var arrPrivence = [];
var arrCity = [];
var arrTown = [];
var isF = true;
var adresArr = ["", "", ""];
$(".privence").click(function() {
	if(isF) {
		$.ajax({
			url: "http://139.199.74.211:8081/new-maven/citys/select.do",
			type: "get",
			dataType: "json",
			async: true,
			data: {
				parentId: 0
			},
			success: function(data) {
				for(i in data) {
					arrPrivence[i] = data[i];
					var option = document.createElement("option");
					option.innerHTML = data[i]['cityName'];
					option['value'] = data[i]['cityId'];
					$(".privence").append(option);
				}
			}
		});
		isF = false;
	}
});
$(".privence").change(function() {
	$(".city")[0].innerHTML = "<option value='n'>请选择：</option>";
	$.ajax({
		url: "http://139.199.74.211:8081/new-maven/citys/select.do",
		type: "get",
		dataType: "json",
		async: true,
		data: {
			parentId: this.value
		},
		success: function(data) {
			for(i in data) {
				arrCity[i] = data[i];
				var option = document.createElement("option");
				option.innerHTML = data[i]['cityName'];
				option['value'] = data[i]['cityId'];
				$(".city").append(option);
			}
		}
	});
	adresArr[1] = adresArr[2] = "";
	$(".town").val("n");
	for(i in arrPrivence) {
		if(this.value == arrPrivence[i]['cityId']) {
			adresArr[0] = arrPrivence[i]['cityName'];
			$(".infoAdres").html(adresArr[0]);
			$(".infoAdres2").html(adresArr[1]);
			$(".infoAdres3").html(adresArr[2]);
		}
	}
});
// city
$(".city").change(function() {
	$(".town")[0].innerHTML = "<option value='n'>请选择：</option>";
	$.ajax({
		url: "http://139.199.74.211:8081/new-maven/citys/select.do",
		type: "get",
		dataType: "json",
		async: true,
		data: {
			parentId: this.value
		},
		success: function(data) {
			for(i in data) {
				arrTown[i] = data[i];
				var option = document.createElement("option");
				option.innerHTML = data[i]['cityName'];
				option['value'] = data[i]['cityId'];
				$(".town").append(option);
			}
		}
	});
	adresArr[2] = "";
	for(i in arrCity){
		if(this.value == arrCity[i]['cityId']) {
			adresArr[1] = arrCity[i]['cityName'];
			$(".infoAdres").html(adresArr[0]);
			$(".infoAdres2").html(adresArr[1]);
			$(".infoAdres3").html(adresArr[2]);
		}
	}
});
// town
$(".town").change(function() {
	for(i in arrTown) {
		if(this.value == arrTown[i]['cityId']) {
			adresArr[2] = arrTown[i]['cityName'];
			$(".infoAdres").html(adresArr[0]);
			$(".infoAdres2").html(adresArr[1]);
			$(".infoAdres3").html(adresArr[2]);
		}
	}
});


//点击配送方式按钮，生成配送方式
$(".save2 a").click(function(){
	if($(".orderOuter li:nth-of-type(2) .info input:radio[name='radioS']:checked").val()==0){
		var names=$(".orderOuter li:nth-of-type(2) .info ul li .names").html();
		var adres=$(".orderOuter li:nth-of-type(2) .info ul li .adres").html();
		var timeInfo=$(".orderOuter li:nth-of-type(2) .info ul li .timeInfo").html();
		$(".orderOuter li:nth-of-type(2) .orderInner li>.names").html(names);
		$(".orderOuter li:nth-of-type(2) .orderInner li>.adres").html(adres);
		$(".orderOuter li:nth-of-type(2) .orderInner li>.timeInfo").html(timeInfo);
		$(".orderOuter>li:nth-of-type(2) .info").css("height", 0);
	}else{
		$(".orderOuter>li:nth-of-type(2) .info").css("height", 0);
	}
});
//点击发票保存方式
$(".save3 a").click(function(){
	$(".orderOuter>li:nth-of-type(4) .info").css("height", 0);
});

var orderId=0;
//获取orderId
$.ajax({
	type:"post",
	url:"http://139.199.74.211:8081/new-maven/orders/addOrders.do",
	async:true,
	dataType:"json",
	data:{userId:userId},
	success:function(data){
		console.log(data);
		orderId=data['orderId'];
	}
});

//根据购物车页面生成订单页面
var goodId=[];
var goodsCount=[];
var totalPrice=0;
var trueTotalPrice=0;
$.ajax({
	url:"http://139.199.74.211:8081/new-maven/shoppingCar/findShoppingCar.do",
	type:"post",
	dataType:"json",
	async:true,
	data:{userId:userId},
	success:function(data){
		console.log(data);
		for(var i=0;i<data.length;i++){
			var li=document.createElement("li");
			$(li).attr("goodsId",data[i]['goods']['goodsId']);
			li.innerHTML=`<div class="img_wrap">
								<a href="###"><img src="../img/main_left_top.jpg" alt=""></a>
						  </div>
						  <a href="###">
							   ${data[i]['goods']['goodsName']}</a>
						  <span class="price">￥${data[i]['goods']['goodsMemberPrice']}</span>
						  <span class="amount">${data[i]['goodsCount']}</span>
						  <span class="weight">0.3kg</span>
						  <span class="num">有</span>`;
			totalPrice+=Number(data[i]['goods']['goodsMemberPrice'])*Number(data[i]['goodsCount']);
			goodId[i]=Number($(li).attr("goodsId"));
			goodsCount[i]=data[i]['goodsCount'];
			$(".goods_cart").append(li);
		}
		//最终商品金额
		$(".countRight p:eq(1) span:eq(1)").html("￥"+totalPrice);
		$(".countRight .big:eq(1) span:eq(1)").html("￥"+(totalPrice+12));
		trueTotalPrice=totalPrice+12;
	}
});




//点击提交订单
$(".submit").click(function(){
	var mes=$(".countLeft input:text").val();
	console.log(mes);
	console.log(lastAdressId);
	console.log(goodId);
	console.log(goodsCount);
	console.log(orderId);
	console.log(totalPrice);
	console.log(trueTotalPrice);
	var str="";
	for(var i=0;i<goodId.length;i++){
		str+="goodsId="+goodId[i]+"&";
	}
	for(var j=0;j<goodsCount.length;j++){
		str+="goodsCount="+goodsCount[j]+"&";
	}
	var str2=str.substring(0,str.length-1);
	console.log(str2);
	$.ajax({
		type:"get",
		url:"http://139.199.74.211:8081/new-maven/orders/addOrderGoods.do?"+str2,
		async:true,
		dataType:"json",
		data:{
			orderId:orderId,
			addressId:lastAdressId,
			mes:mes,
			totalPrice:totalPrice,
			trueTotalPrice:trueTotalPrice,
			fare:12,
			balance:0
		},
		success:function(data){
			console.log(data+"订单提交成功");
		}
	});
});

//点击提交订单按钮，跳转到我的订单页面
$(".submit").click(function(){
	setTimeout(function() {
		window.location.href="orderSuccess.html?userId="+userId+"&orderId="+orderId;
	},200);
});
