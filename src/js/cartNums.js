define(function(require,exports,modules){
    modules.exports = {
        getNum: function () {
                //判断用户是否登录，如果登录，则读取购物车中的数量
                var oInfo = sessionStorage.getItem("login");
                console.log(oInfo);
                if (oInfo != null) {
                    var oUid = JSON.parse(oInfo).uid;
                    $.ajax({
                        url: "./../server/cartList.php",
                        type: "post",
                        dataType: "json",
                        data: {"uId": oUid},
                    }).then(function (res) {
                        console.log(res.cartnum);
                        var oCartNum = res.cartnum;
                        $(".cartnum").text(oCartNum);
                    })
                } else {
                    //如果没有登录，读取cookie
                    const cookieList = JSON.parse($.cookie("cartInfo") || '[]');
                    var cookieLength = cookieList.length;
                    $(".cartnum").text(cookieLength);
                }

            }
    }
})