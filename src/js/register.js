requirejs.config({
    baseUrl:"./js",
    urlArgs:"va="+(new Date()).getTime(),
    paths:{
        "jquery" : ["./lib/jquery-1.11.1.min"],
        "jquery.validate" : ["./lib/jquery.validate"],
        "additional-methods" : ["./lib/additional-methods"],
        "jquery.cookie":["./lib/jquery.cookie"],
        "yzm":["./lib/slide"],
    }
})

requirejs(["jquery","jquery.validate","additional-methods","yzm"],function($,a,b,c) {
    $(function () {

        $.validator.addMethod("checkName",function (el) {
            var reg = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/;
            return  reg.test(el);
        },"手机号格式有误");
        $("form").validate({
            rules:{
                uname:{
                    required:true,
                    checkName:true,
                    remote:{
                        url:"http://127.0.0.1:8080/zol/server/checkedName.php",
                        type:"get",
                        data:{
                            "username":function () {
                                return $("input[name=uname]").val();
                            }
                        }
                    },
                },
                upwd:{
                    required:true,
                    rangelength:[6,20],
                },
                upwd2:{
                    equalTo:"#upwd"
                },
                agree:{
                    required:true,
                },
            },
            messages:{
                uname:{
                    required:"手机号不能为空",
                    remote:"手机号已存在",
                },
                upwd:{
                    required:"密码不能为空",
                    rangelength:"密码长度为{0}-{1}",
                },
                upwd2:{
                    equalTo:"两次密码输入不一致",
                },
                agree:{
                    required:"请勾选协议",
                },
            },
            submitHandler:function () {
                var flag = $("#verify_box #btn img").hasClass("passVerity");
                if(flag){
                    $.ajax({
                        url:"./../server/register.php",
                        type:"post",
                        dataType:"json",
                        data:{
                            uname:$("input[name=uname]").val(),
                            upwd:$("input[name=upwd]").val(),
                        }
                    }).then(function (result) {
                        if(result.status==1){
                            alert("注册成功");
                            location="login.html";
                        }else if(result.status==0){
                            alert("注册失败");
                        }
                    });
                }else {
                    alert("请滑动滑块完成验证操作");
                }

                return false;
            }
        })

    })
})

