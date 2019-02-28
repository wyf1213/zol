requirejs.config({
    baseUrl:"./js",
    urlArgs:"va="+(new Date()).getTime(),
    paths:{
        "jquery" : ["./lib/jquery-1.11.1.min"],
        "jquery.cookie":["./lib/jquery.cookie"],
        "backtotop":["./backtotop"],
        "showUname":["./showUname"],
        "cartNums":["./cartNums"],
        // shim : {
        //     "backtotop" : {
        //         deps : ["jquery"] // deps 对于当前的非模块的js文件是否依赖其他模块
        //     },
        //     "showUname" : {
        //         deps : ["jquery"] // deps 对于当前的非模块的js文件是否依赖其他模块
        //     },
        //     "cartNums":{
        //         deps:["jquery"]
        //     }
        // }
    }
})
requirejs(["jquery","jquery.cookie","backtotop","showUname","cartNums"],function($,a,b,c,d){
    $(function(){
        b.back();
        c.show();
        d.getNum();
        ///////////////////////////轮播图///////////////////////
        //第一张显示
        $(".banner ul li").eq(0).show();
        //鼠标滑过手动切换，淡入淡出
        $(".banner ol li").mouseover(function() {
            $(this).addClass('current').siblings().removeClass("current");
            var index = $(this).index();
            i = index;//不加这句有个bug，鼠标移出小圆点后，自动轮播不是小圆点的后一个
            // $(".pic li").eq(index).show().siblings().hide();
            $(".banner ul li").eq(index).fadeIn(500).siblings().fadeOut(500);
        });

        //向右切换
        var play=function(){
            i++;
            i = i > 2 ? 0 : i ;
            $(".banner ol li").eq(i).addClass('current').siblings().removeClass("current");
            $(".banner ul li").eq(i).fadeIn(500).siblings().fadeOut(500);
        }
        //向左切换
        var playLeft=function(){
            i--;
            i = i < 0 ? 2 : i ;
            $(".banner ol li").eq(i).addClass('current').siblings().removeClass("current");
            $(".banner ul li").eq(i).fadeIn(500).siblings().fadeOut(500);
        }
        //自动轮播
        var i=0;
        var timer=setInterval(play,2000);
        //鼠标移入移出效果
        $(".banner .container").hover(function() {
            clearInterval(timer);
        }, function() {
            timer=setInterval(play,2000);
        });
        //左右点击切换
        $(".banner #pre").click(function(){
            playLeft();
        })
        $(".banner #next").click(function(){
            play();
        });



        ///////////////////////////banner部分的tab切换///////////////////////
        $(".category_body .category_item_hd").on("mouseenter",function () {
            $(this).addClass("hover").siblings("div").removeClass("hover");
            $index = $(this).index();
            $(".category_body .category_content").show();
            $(".category_body .category_content li").eq($index).show().siblings("li").hide();
        });
        $(".category_body").on("mouseleave",function () {
            $(".category_body .category_content").hide();
            $(".category_body .category_item_hd").removeClass("hover");
        })


        //////////////////////////////z智选的tab栏切换部分///////////////////////
        $(".product_focus .product_focus_tab li").on("mouseenter",function () {
            $(this).addClass("active").siblings("li").removeClass("active");
            $index = $(this).index();
            $(".product_focus .product_focus_slide_list li").eq($index).show().siblings("li").hide();
        })


        //////////////////////////滑动时搜索栏固定在顶部////////////////////
        var topHight = $(".header").height();
        $(window).scroll(function () {
            var top = $(this).scrollTop();
            if(top>200){
                $(".header").addClass("header_move");
            }else {
                $(".header").removeClass("header_move");
            }
        });


        ////////////////////////商品信息动态显示////////////////////////////
        $.ajax({
            url:"./../server/goodslist.php",
            dataType:"json",
        }).then(function (res) {
            console.log(res);
            res.forEach((el,index)=>{
                var $strHtml = `
            <li class="hot_item">
                <div class="hot_region">
                    <a href="details.html?gId=${el.gId}" class="hot_pic">
                        <img src="${el.gImg}" alt="" width="200" height="200">
                    </a>
                </div>
                <p class="hot_warename"><a href="details.html?gId=${el.gId}">${el.gName}</a></p>
                <p class="hot_price">&yen;${el.gPrice}</p>
            </li>
            `;
                $(".hot .hot_list").append($strHtml);
            })
        })

    })
})
