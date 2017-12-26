$(".repsd").click(function(){
	$(".lgwrappage").css("display","none");
	$(".lgwraprepsd").css("display","block");
})
$(".zhmessage").click(function(){
	$(".lgwrappage").css("display","block");
	$(".lgwraprepsd").css("display","none");
})
$(".checkphone").click(function(){
	$(".rephonenum").css("display","block");
	$(".lgwraprepsd").css("display","none");
})
$(".closebtn").click(function(){
	$(".rephonenum").css("display","none");
})
$(".cancel").click(function(){
	$(".rephonenum").css("display","none");
})


//获取userid
//var Ohref = window.location.href;
//var arrhref = Ohref.split("?a=");
var idnum = getCookie("userId");
console.log(idnum);

// 验证每个信息填写的是否有错误
function Checkone(){
    var A = 0;
	var na = /^[\u4E00-\u9FA5a-zA-Z0-9_]{4,20}$/;
	if(!(na.test($.trim($(".membername").val()))) && A == 0){
		ShowMess("请输入正确的昵称");
		A++;
	}

	var em = /^([a-zA-Z0-9_-])+\@([a-zA-Z0-9_-])+.([a-zA-Z]{2,4})+$/;
	if(!(em.test($.trim($(".email").val()))) && A == 0){
		ShowMess("邮箱格式不正确");
	}

	var tel = /^0\d{2,3}-?\d{7,8}$/;
	if(!(tel.test($.trim($(".telephone").val()))) && A == 0){
		ShowMess("电话号码格式不正确");
	}

	if($("#province").find("option:selected").text() =="" || $("#city").find("option:selected").text() == "" || $("#district").find("option:selected").text() == "" && A == 0){
		ShowMess("请选择城市");
		A++;
	}
	console.log(idnum)
	console.log($(".membername").val())
	console.log($("#province").find("option:selected").text() + "-" + $("#city").find("option:selected").text() + "-" +	$("#district").find("option:selected").text())	
    if (A == 0) { 
        //验证用户名，密码
        $.ajax({
            url: 'http://139.199.74.211:8081/new-maven/user/updateUser.do',
            data:{
            	userName: $(".phnum").val(),
				name: $(".membername").val(),					
				email: $(".email").val(),					
				city: $("#province").find("option:selected").text() + "-" + $("#city").find("option:selected").text() + "-" +	$("#district").find("option:selected").text(),			
				address: $(".address").val(),					
				telephone: $(".telephone").val(),
				userId:	idnum	
            },
            type: 'post',
            dataType: 'json',
            async: true,
            success: function(data){
	            	console.log(data);
	            	if(data){
						Showbox("修改成功!");
			    	}else{
						Showbox("修改失败!");
			    	}
            }
        })
        
    }
}
// 查询用户信息
if(idnum != undefined) {
	$.ajax({
		url: 'http://139.199.74.211:8081/new-maven/user/select.do',
		type: 'post',
		data:{userId:idnum},
	    dataType: 'json',
	    async: true,
	    success: function(data){
		    	console.log(data);
		    	$(".username").text(data.userName);
		    	$(".oldphonenum").text(data.userName);
			$(".membername").val(data.name);
			if(data.city){
	    		var cityarr = data.city.split("-");
	    		$("#province").find("option:selected").text(cityarr[0]);
				$("#city").find("option:selected").text(cityarr[1]);
				$("#district").find("option:selected").text(cityarr[2]);	
		    	}
		    	if(data.email){
		    		$(".email").val(data.email);	
		    	}
		    	if(data.address){
		    		$(".address").val(data.address);
		    	}
		    	if(data.telephone){
		    		$(".telephone").val(data.telephone);
		    	}
	    		if(data.telephoneNumber){
				$(".phnum").text(data.telephoneNumber);
			}else{
				$(".phnum").text(data.userName);
			}	
	   	}
	})
} else {
	window.location.href = "homePage.html";
}


// 修改密码
$(".repsdbtn").click(function(){
	$.ajax({
		url: 'http://139.199.74.211:8081/new-maven/user/updatePassword.do',
		type: 'post',
		data:{
			userId: idnum,
			password: $(".oldpsd").val(),
			password1: $(".newpsd").val()
		},
        dataType: 'json',
        async: true,
        success: function(data){
        	console.log(data);
        	if(data){
				Showbox("修改成功!");
		    }else{
				Showbox("修改失败!");
		    }
        }
    })
})

// 验证码
var isFarr;
$('#mpanel1').codeVerify({
    type : 1,
    width : '100px',
    height : '25px',
    fontSize : '20px',
    codeLength : 5,
    btnId : 'conbtn',
    ready : function() {
    },
    success : function() {
        isFarr="true";
        console.log(isFarr); 
    },
    error : function() {
        isFarr="false";
        console.log(isFarr); 
    }
});

// 修改手机号
function Success(){
	var ph = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-3,5-9]))\d{8}$/;
	console.log($(".newphonenum").val())
	if(ph.test($.trim($(".newphonenum").val())) && isFarr){
		$.ajax({
			url: 'http://139.199.74.211:8081/new-maven/user/updateTelephoneNumber.do',
			type: 'post',
			data:{
				userId: idnum ,
				telephoneNumber	: $(".newphonenum").val()
			},
		    dataType: 'json',
		    async: true,
		    success: function(data){
		    	if(data){
		    		console.log(data);
		    		$(".phnum").text($(".newphonenum").val());
        			$(".oldphonenum").text($(".newphonenum").val()),
					Showbox("修改成功!");
		    	}else{
					Showbox("修改失败!");
		    	}
		    }
		})
	}else{
		$("#conbtn").click(function(){
			error();
		})
	}
}

$("#conbtn").click(function(){
	Success();
})

// 填写错误时的提示
function ShowMess(M) { 
	$("#Error span").text(M);
	$("#Error span").css("color","red");  
	$("#Error").show(); 
	setTimeout("$('#Error').hide()", 3000); 
}
// 修改成功时的提示
function Showbox(M){
	$(".rebox").text(M);
	$(".rebox").show();
	$(".rephonenum").css("display","none");
	setTimeout("$('.rebox').hide()", 3000); 
}
// 修改失败时的提示
function error(){
	Showbox("修改失败!");
}

// 会员名的失焦
$(".membername").blur(function(){
	var na = /^[\u4E00-\u9FA5a-zA-Z0-9_]{4,20}$/;
	if(!(na.test($.trim($(".membername").val())))){
		ShowMess("请输入正确的昵称");
	}
})

// 邮箱的正则
$(".email").blur(function(){
	var em = /^([a-zA-Z0-9_-])+\@([a-zA-Z0-9_-])+.([a-zA-Z]{2,4})+$/;
	if(!(em.test($.trim($(".email").val())))){
		ShowMess("邮箱格式不正确");
	}
})

// 电话的正则
$(".telephone").blur(function(){
	var tel = /^0\d{2,3}-?\d{7,8}$/;
	if(!(tel.test($.trim($(".telephone").val())))){
		ShowMess("电话号码格式不正确");
	}
})


// 选择省，市，县
// 省
var isF = true;
$("#province").click(function(){
	if(isF){
		$.ajax({
			url:'http://139.199.74.211:8081/new-maven/citys/select.do',
			type:'get',
			dataType:'json',
			data:{parentId:0},
			success:function(data){
				isF = false;
				for(i in data){
					var options = document.createElement('option');
					options.value = data[i].cityId;
					options.innerHTML = data[i].cityName; 
					$("#province").append(options);
				}	
			}
		})

	}
})
// 市
$("#province").change(function(){
	$.ajax({
		url:'http://139.199.74.211:8081/new-maven/citys/select.do',
		type:'get',
		dataType:'json',
		data:{parentId:this.value},
		success:function(data){
			for(i in data){
				var options = document.createElement('option');
				options.value = data[i].cityId;
				options.innerHTML = data[i].cityName; 
				$("#city").append(options);
			}
		}
	})
})
// 县
$("#city").change(function(){
	$.ajax({
		url:'http://139.199.74.211:8081/new-maven/citys/select.do',
		type:'get',
		dataType:'json',
		data:{parentId:this.value},
		success:function(data){
			for(i in data){
				var options = document.createElement('option');
				options.value = data[i].cityId;
				options.innerHTML = data[i].cityName; 
				$("#district").append(options);
			}
		}
	})
})




