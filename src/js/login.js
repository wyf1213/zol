requirejs.config({
    baseUrl:"./js",
    urlArgs:"va="+(new Date()).getTime(),
    paths:{
        "jquery" : ["./lib/jquery-1.11.1.min"],
        "jquery.validate" : ["./lib/jquery.validate"],
        "additional-methods" : ["./lib/additional-methods"],
        // "yzm" : ["./lib/verify-master/js/verify"],
        "jquery.cookie":["./lib/jquery.cookie"],
        // shim:{
        //     "yzm":{
        //         deps:["jquery"],
        //     },
        // }
    }
})

requirejs(["jquery","jquery.validate","jquery.cookie"],function($,a,b) {
    $(function () {
        //tab栏切换
        $(".login_content .login_header span").on("click",function () {
            $(this).addClass("current").siblings("span").removeClass("current");
            $index = $(this).index();
            $(".login_content .login_body li").eq($index).show().siblings("li").hide();
        });
        //登录
        $("form").validate({
            rules:{
                uname:{
                    required:true,
                },
                upwd:{
                    required:true,
                },
            },
            messages:{
                uname:{
                    required:"手机号不能为空",
                },
                upwd:{
                    required:"密码不能为空",
                },
            },
            submitHandler:function(){
                $.ajax({
                    url:"./../server/login.php",
                    type:"post",
                    dataType:"json",
                    data:$("form").serialize(),
                }).then(function (res) {
                    if(res.status==1){
                        //当登录成功后，把cookie中的数据加入到数据库中的购物车表中去
                        sessionStorage.setItem("login",JSON.stringify(res.data));
                        var ajaxList = [];//定义一个空数组，用于存放对象
                        //遍历cookie
                        var cookieList = JSON.parse($.cookie("cartInfo")||"[]");
                        var flag = 0;
                        cookieList.forEach((el,index)=>{
                            el.uId = res.data.uid;
                            ajaxList.push(
                                $.ajax({
                                    url:"./../server/cart.php",
                                    data:el,
                                    type:"post",
                                })
                            );
                            flag++;
                        });
                        console.log(flag);
                        if(flag>=cookieList.length){
                            $.cookie("cartInfo", "", {expires : -1000});
                            alert("登录成功");
                            location = "index.html";
                            return;
                        }
                        // Promise.all(ajaxList).then(function(){
                        //     $.cookie("cartInfo", "", {expires : -1000});
                        //     alert("登录成功");
                        //     location = "index.html";
                        // })
                    }else if(res.status==0){
                        $(".login_user i").css({
                            display:"block",
                        });
                        $(".login_user i").html("用户名或密码错误，请重新登录");
                    }else {
                        alert("不支持get请求");
                    }
                });
                return false;
            }
        });

    })
})
