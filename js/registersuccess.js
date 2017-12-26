//获取注册时的手机号
var Ohref = window.location.href;
var arrhref = Ohref.split("?tel=");
var phref = arrhref[1].split("&a=");
console.log(phref);
$(".phnum").html(phref[0]);

$(".text").focus(function(){
	$(".char").css("display","block");
})

// 修改昵称时发送的请求
$(".text").blur(function(){
	var na = /^[\u4E00-\u9FA5a-zA-Z0-9_]{4,20}$/;
	if(!(na.test($.trim($(".text").val())))){
		$(".char").css("display","none");
		ShowMess();	
	}else{
		$(".rebtn").click(function(){
			$(".erchar").css("display","none");
			$(".rethree").css("display","block");
			$(".rename").css("display","none");
			$.ajax({
				url: 'http://139.199.74.211:8081/new-maven/user/updateName.do',
				type: 'post',
				data:{userId:phref[1],name:$(".text").val()},
		        dataType: 'json',
		        async: true,
		        success: function(data){
		        	console.log(data);
		        }
			})
		})
	}
})

function ShowMess() { 
	$(".erchar").show();
	$(".erchar").css("color","red"); 
	setTimeout("$('.erchar').hide()", 3000); 
}

$(".newname").click(function(){
	$(".rethree").css("display","none");
	$(".rename").css("display","block");
})

reBtn(phref[1]);
function reBtn(userId) {
	$(".rebtn").click(function(){
		console.log(userId);
		var time = new Date();
		setCookie("userId", userId, time);
		window.location.href='loginsuccess.html';
	})
}


