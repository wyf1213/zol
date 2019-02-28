requirejs.config({
    baseUrl:"./js",
    urlArgs:"va="+(new Date()).getTime(),
    paths:{
        "jquery" : ["./lib/jquery-1.11.1.min"],
        "jquery.cookie":["./lib/jquery.cookie"],
        "popt": ["./lib/city/Popt"],
        "cityjson": ["./lib/city/cityJson"],
        "cityset": ["./lib/city/citySet"],
        // "showUname":["./showUname"],
        // "backtotop":["./backtotop"],
        // "cartNums":["./cartNums"],
        shim:{
            "popt":{
                deps:["jquery"],
            },
            "cityjson":{
                deps:["jquery"],
            },
            "cityset":{
                deps:["jquery"],
            },
            // "showUname" : {
            //     deps : ["jquery"]
            // },
            // "backtotop" : {
            //     deps : ["jquery"]
            // },
            // "cartNums":{
            //     deps:["jquery"],
            // }
        }
    }
});

requirejs(["jquery","backtotop","showUname","cartNums","jquery.cookie","popt","cityjson","cityset"],function($,a,b,c){
    $(function () {
        a.back();
        b.show();
        c.getNum();
        ////////////////////nav部分鼠标移动到全部分类上显示。。。/////////////////////////
        $(".nav .category_header").on("mouseenter",function () {
            $(this).siblings("div").show();
        });
        $(".category_body .category_item_hd").on("mouseenter",function () {
            $(this).addClass("hover").siblings("div").removeClass("hover");
            var $index = $(this).index();
            $(".category_body .category_content").show();
            $(".category_body .category_content li").eq($index).show().siblings("li").hide();
        });
        $(".category_body").on("mouseleave",function () {
            $(this).hide();
            $(".category_body .category_content").hide();
            $(".category_body .category_item_hd").removeClass("hover");
        });
        $(".category").on("mouseleave",function () {
            $(this).children(".category_body").hide();
        });

        ////////////////////////////放大镜//////////////////////
        //鼠标进入图片显示放大镜的div块
        $(".d_main_area").on("mouseenter",function () {
            $(".big_pup").show();
            $(".d_big_area").show();
            var oScale = $(".d_main_area").width()/$(".big_pup").width();
            $(document).on("mousemove",function (e) {
                var mX = e.clientX - $(".d_main_area").position().left-$(".d_focus_img").position().left-$(".big_pup").width()/2;
                if(mX<=0){
                    mX = 0;
                }
                if(mX >= $(".d_main_area").width()-$(".big_pup").width()){
                    mX = $(".d_main_area").width()-$(".big_pup").width();
                }
                var mY = e.clientY - $(".d_main_area").position().top-$(".big_pup").height()/2-15;
                if(mY<=0){
                    mY = 0;
                }
                if(mY >= $(".d_main_area").height()-$(".big_pup").height()){
                    mY = $(".d_main_area").height()-$(".big_pup").height();
                }
                $(".big_pup").css({
                    left:mX,
                    top:mY
                })

                $(".d_big_bg img").css({
                    left:-oScale*mX,
                    top:-oScale*mY
                })
            })
        });
        $(".d_main_area").on("mouseleave",function () {
            $(".big_pup").hide();
            $(".d_big_area").hide();
        });
        // //点击小图片，切换
        // $(".d_small_area li").on("click",function () {
        //     var $index = $(this).index();
        //     $(this).addClass("active").siblings("li").removeClass("active");
        //     $(".d_main_area img").attr("src","images/imgs/nova4/nova4_middle_pic"+($index+1)+".jpg");
        //     $(".d_big_bg img").attr("src","images/imgs/nova4/nova4_big_pic"+($index+1)+".jpg");
        //     return false;
        // });

        //点击小图片，切换
        $(".d_focus_img").on("click",".d_small_area li",function () {
            console.log(111);
            var $index = $(this).index();
            $(this).addClass("active").siblings("li").removeClass("active");
            const curData = JSON.parse($(".d_deal_wrap").attr("data-info"));
            console.log(curData.middleImg[$index]);
            $(".d_main_area img").attr("src",curData.middleImg[$index]);
            $(".d_big_bg img").attr("src",curData.bigImg[$index]);
            return false;
        });


        /////////////////省市县三级联动//////////
        $("#city").on("click",function (e) {
            SelCity(this,e);
        });


        ///////////////////选择商品颜色//////////////////
        $(".d_goodsinfo").on("click",".d_goodsinfo_details li",function () {
            $(this).addClass("current").siblings("li").removeClass("current");
            return false;
        })


        ///////////////////////商品数量加减////////////////////
        //减
        $("#d_goodsinfo_del").on("click",function () {
            let count = parseInt($("#d_goodsinfo_num").val());
            if(count==1){
                return false;
            }else {
                $("#d_goodsinfo_num").val(count-1);
            }
            return false;
        });
        //加
        $("#d_goodsinfo_add").on("click",function () {
            let count = parseInt($("#d_goodsinfo_num").val());
            $("#d_goodsinfo_num").val(count+1);
            return false;
        })


        /////////////tab栏切换//////////
        $("#d_gmain_tabbar ul li").on("click",function () {
            var $index = $(this).index();
            var $length = $("#d_gmain_tabbar ul li").length;
            if($index<=$length-2){
                $(this).addClass("current").siblings("li").removeClass("current");
                $(".d_maincontainer>div").eq($index).addClass("active").siblings("div").removeClass("active");
            }

            return false;
        });

        ////////////////固定到顶部////////////////
        var $height = $(".topbar").height()+90+$(".header").height()+$(".nav").height()+$(".d_main").height();
        $(window).scroll(function () {

            var top = $(this).scrollTop();
            if(top>$height){
                //var $navHeight = $("#d_gmain_tabbar").height();
                // $(".d_leftside").css({
                //     marginTop:50
                // });
                // $(".d_maincontainer").css({
                //     marginTop:50
                // });
                $("#d_gmain_tabbar").addClass("tabbar_fixed");
                $("#d_gmain_tabbar .d_gmain_buybtn").show();
            }else {
                $("#d_gmain_tabbar").removeClass("tabbar_fixed");
                $("#d_gmain_tabbar .d_gmain_buybtn").hide();
                // $(".d_leftside").css({
                //     marginTop:0
                // });
                // $(".d_maincontainer").css({
                //     marginTop:0
                // })
            }
        });

        ////////////购买咨询点击关闭按钮///////////
        $(".zs-enter-message .close").on("click",function () {
            $(".zs-enter-message").hide();
        });

        //////////////////动态加载数据/////////////////////
        //动态显示商品详情信息
        var $id = location.search.split("=")[1];
        $.ajax({
            url:"./../server/goodslist.php",
            dataType:"json",
            data:{"gId":$id},
        }).then(function (res) {
            // console.log(res);
            //////////////////////////将数据加载到页面中
            $(".d_deal_wrap").attr("data-info",JSON.stringify(res));
            //放大镜图片
            $(".d_main_area img").attr("src",res.middleImg[0]);
            $(".d_big_area img").attr("src",res.bigImg[0]);
            //放大镜小图片
            res.smallImg.forEach((el,index)=>{
                var small = `
                <li>
                    <a href="#">
                        <img src="${el}" alt="">
                    </a>
                </li>
                `;
                $(".d_small_area ul").append(small);
            });
            $(".d_small_area ul li:first").addClass("active");
            //商品名称、商品描述
            var strTitle = `${res.gName}<span>${res.gDes}</span>`;
            $(".d_inner .d_main_title").html(strTitle);
            //商品价格
            $(".d_inner .d_price_panel p span").text(res.gPrice);
            //商品颜色
            res.gColor.forEach((el,index)=>{
                var strColor = `
            <li>
                <span>${el}<i></i></span>
            </li>
            `;
                $(".d_goodsinfo_color .d_goodsinfo_details ul").append(strColor);
            });
            $(".d_goodsinfo_color .d_goodsinfo_details ul li:first").addClass("current");
            //内存容量
            res.gMemory.forEach((el,index)=>{
                var strMemory = `
            <li>
                <span>${el}<i></i></span>
            </li>
            `;
                $(".d_goodsinfo_big .d_goodsinfo_details ul").append(strMemory);
            });
            $(".d_goodsinfo_big .d_goodsinfo_details ul li:first").addClass("current");

            //购买方式
            res.gBuy.forEach((el,index)=>{
                var strBuy = `
            <li>
                <span>${el}<i></i></span>
            </li>
            `;
                $(".d_goodsinfo_buystyle .d_goodsinfo_details ul").append(strBuy);
            });
            $(".d_goodsinfo_buystyle .d_goodsinfo_details ul li:first").addClass("current");

            //套装
            res.gSuit.forEach((el,index)=>{
                var strSuit = `
            <li>
                <span>${el}<i></i></span>
            </li>
            `;
                $(".d_goodsinfo_suit .d_goodsinfo_details ul").append(strSuit);
            });
            $(".d_goodsinfo_suit .d_goodsinfo_details ul li:first").addClass("current");

        });


        /////////////////////////////加入购物车////////////
        $("#btn_addcart").on("click",function () {
            var isLogin = sessionStorage.getItem("login");
            var currentData = JSON.parse($(".d_deal_wrap").attr("data-info"));
            //获取数量框的值
            var oNum = parseInt($("#d_goodsinfo_num").val());
            //获取选中的商品颜色
            var oColor = $(".d_goodsinfo_color .d_goodsinfo_details li.current").text().trim();
            //修改颜色
            currentData.gColor = oColor;
            //获取选中的商品的内存容量
            var oMemory = $(".d_goodsinfo_big .d_goodsinfo_details li.current").text().trim();
            //修改内存容量
            currentData.gMemory = oMemory;
            //获取选中的商品的购买方式
            var oBuy = $(".d_goodsinfo_buystyle .d_goodsinfo_details li.current").text().trim();
            //修改购买方式
            currentData.gBuy = oBuy;
            //获取选中的商品的套装
            var oSuit = $(".d_goodsinfo_suit .d_goodsinfo_details li.current").text().trim();
            //修改套装
            currentData.gSuit = oSuit;
            //已登录用户的信息
            var loginList = JSON.parse(sessionStorage.getItem("login")||'{}');
            currentData.uId = loginList.uid;
            //console.log(currentData)
            if(isLogin!=null){
                //1、如果登录了，就将商品加入到购物车中
                currentData.gNum = oNum ;
                console.log("登录了");
                $.ajax({
                    url:"./../server/cart.php",
                    type:"post",
                    dataType:"json",
                    data:currentData,
                }).then(function (res) {
                    console.log(res.msg);
                    alert("加入购物车成功！");
                });
            }else {
                //2、如果没有登录，将商品保存至cookie中
                console.log("没有登录");
                //读取cookie
                var cookieList = JSON.parse($.cookie("cartInfo")||'[]');
                var flag = false;//默认cookie不存在此商品
                cookieList.forEach((el,index)=>{
                    if(el.gId==currentData.gId&&el.gColor==currentData.gColor&&el.gMemory==currentData.gMemory&&el.gBuy==currentData.gBuy&&el.gSuit==currentData.gSuit){
                        el.gNum = el.gNum+oNum;
                        flag = true;
                    }
                });
                if(!flag){
                    currentData.gNum = oNum ;
                    cookieList.push(currentData);
                }
                console.log(cookieList);
                $.cookie("cartInfo",JSON.stringify(cookieList),{expires:7});
                alert("加入购物车成功！");
                // if(confirm("加入购物车成功!")){
                //     location="login.html";
                // }
            }
        });


    });
})


