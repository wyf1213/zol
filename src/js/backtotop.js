define(function(require,exports,modules){
    modules.exports ={
        back:function () {
            $(".sidebar .sidebar_back").on("click",function () {
                $('body,html').animate({scrollTop:0},300);
                return false;
            })
        }
    }
})

