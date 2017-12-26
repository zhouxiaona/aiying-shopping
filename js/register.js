// 聚焦时input框的变化
$("input").focus(function(){
	$(this).css({"background":"#faf8e0","border":"1px solid #0098ad","color":"#333"});
})
$("input").blur(function(){
	$(this).css({"background":"#fff","border":"1px solid #aeaeae","color":"#999999"});
})

// 验证码
var isFarr;
$('#mpanel2').codeVerify({
    type : 1,
    width : '100px',
    height : '28px',
    fontSize : '20px',
    codeLength : 5,
    btnId : 'zucebtn',
    ready : function() {
    },
    success : function() {
        isFarr = "true";
    },
    error : function() {
        isFarr = "false";
    }
});


// 检查输入的文本是否符合要求
 function Check(){
    var A = 0;
    if ($.trim($("#userName").val()) == "" && A == 0){ 
    	ShowMess("请输入账号名"); 
    	$("#userName").focus(); 
    	A++;
    }

    var ph = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-3,5-9]))\d{8}$/;
    if(!(ph.test($.trim($("#userName").val()))) && A == 0){
        ShowMess("请输入正确的手机号"); 
        $("#userName").focus(); 
        A++;
    }
        
    if ($.trim($("#password").val()) == "" && A == 0){ 
    	ShowMess("请输入密码"); 
    	$("#password").focus();
    	 A++; 
    }
    if ($.trim($("#confirmpassword").val()) == "" && A == 0) { 
    	ShowMess("请确认您输入的密码"); 
    	$("#confirmpassword").focus(); 
    	A++;
    }
    if ($.trim($("#confirmpassword").val()) != $.trim($("#password").val()) && A == 0) {
     ShowMess("两次密码输入不一致"); 
     $("#confirmpassword").focus(); 
     	A++;
 	}
    var ps = /^(\w){6,20}$/;
    if(!(ps.test($.trim($("#password").val()))) && A == 0){
        ShowMess("请输入6-22位的密码，由字母，数字，下划线组成"); 
        $("#password").focus(); 
        A++;
    }
    
	if ($.trim($("#imgreminder").val()) == "" && A == 0) { 
		ShowMess("验证码不能为空"); 
		$("#imgreminder").focus(); 
		A++;
       
	} 

    if(!isFarr && A == 0){
        ShowMess("验证码错误"); 
        $("#imgreminder").focus(); 
        A++;
    }
    if(!($("input[type='checkbox']").prop("checked"))){
        ShowMess("请仔细阅读用户协议并同意"); 
        A++;
    }
    
    if (A == 0) { 
        //验证用户名，密码
        $.ajax({
            url:'http://139.199.74.211:8081/new-maven/user/addUser.do',
            data:{userName:$("#userName").val(),password:$("#password").val()},
            type:'post',
            dataType:'json',
            async:true,
            success:function(data){
                if(data.mes){
                    console.log(data);
                    $("#isLoading").css("display","block");
                    window.location.href = "registersuccess.html?tel=" + $("#userName").val() + "&a=" + data.userId; 
                }
            }
        })
    }
}
$("#zucebtn").click(function(){
    Check();
})

// 填写出现错误时弹出的消息
function ShowMess(M) { 
	$("#Error span").text(M); 
	$("#Error").show(); 
	setTimeout("$('#Error').hide()", 3000); 
}
function error(){
    ShowMess("注册失败，请重新注册");
}

//失焦时发送请求
$("#userName").blur(function(){
    $.ajax({
        url:'http://139.199.74.211:8081/new-maven/user/selectUserName.do',
        data:{userName:$("#userName").val()},
        type:'post',
        dataType:'json',
        async:true,
        success:function(data){
            console.log(data);
            if(!data){
                ShowMess("该手机号已存在，立即登录？"); 
               $("#zucebtn").click(function(){
                    error();
                })
            } else{
               $("#zucebtn").click(function(){
                    Check();
                })
            }
        }
    })
})

// 失焦时弹出的消息
$("#userName").blur(function(){
    var ph = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-3,5-9]))\d{8}$/;
    if(!(ph.test($.trim($("#userName").val())))){
        ShowMess("请输入正确的手机号"); 
    }
})

$("#password").blur(function(){
    var ps = /^(\w){6,20}$/;
    if(!(ps.test($.trim($("#password").val())))){
        ShowMess("请输入6-22位的密码，由字母，数字，下划线组成"); 
    }
})

