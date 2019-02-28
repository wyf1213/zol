define(function(require,exports,modules){
    modules.exports ={
        show:function () {
            $(function () {
                //////////////////////////显示用户名///////////////////////////
                var $JsonloginInfo = sessionStorage.getItem("login");
                var $loginInfo = JSON.parse($JsonloginInfo);
                if($loginInfo!=undefined){
                    var strHtml =`
                        您好
                        <span>${$loginInfo.uname}</span>
                        <a href="#" id="exit">退出</a>
                    `;
                    $(".topbar .zol_login").html(strHtml);
                }
                //退出
                $(".topbar").on("click","#exit",function () {
                    if(confirm("确定退出吗？")){
                        sessionStorage.removeItem("login");
                        var strHtml = `
                Hi~欢迎来到Z商城，请<a href="login.html">登录</a>
                <a href="register.html">免费注册</a>
                `;
                        $(".topbar .zol_login").html(strHtml);
                    }
                    return false;
                })
            })
        }
    }
})
