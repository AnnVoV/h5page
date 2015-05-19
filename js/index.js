$(function(){
    var index = 0,
    width = $(window).width(),
    height = $(window).height(),
    screenHeight = window.screen.height,
    isNi = false,
    $wp = $("#wp"),
    $wpInner = $("#wp-inner"),
    $pages = $(".page"),
    $curPage = $(".page.cur"),


    // 为了touchmove的效果新增了这个变量
    maxLength = $pages.size(),
    initY,
    finalY;

    $wp.on('touchstart', function(event) {
        event.preventDefault();
    }).on('touchmove', function(event) {
        event.preventDefault();
    });

    $pages.each(function(index, element) {
        // 赋值高度
        $(element).height($wp.height());
    });

    $wpInner.on("touchstart", function(event) {
        event.preventDefault();
        var originalEvent = event.originalEvent;
        if (originalEvent.targetTouches.length > 1) {
            return;
        } else {
            initY = originalEvent.targetTouches[0].pageY;
        }
    });

$wpInner.on("touchend", function(event) {
    event.preventDefault();
    var originalEvent = event.originalEvent;
    if (originalEvent.targetTouches.length > 1) {
        return;
    } else {
        finalY = originalEvent.changedTouches[0].pageY;
        var differenceY = finalY - initY;
        // temp是确定index+1还是index-1的变量
        var temp = 0;
        if (Math.abs(differenceY) > 30) {
            if (differenceY > 0) {
                // 考虑第一张和最后一张
                if (index !== 0) {
                    temp = -1;
                }
            } else {
                if (index !== maxLength - 1) {
                    temp = 1;
                }
            }
            // moveTo一定要写在绝对值大于30的情况里面
            // 否则万一绝对值小于等于30，moveTo里面的index = arg会导致代码整个废掉
            moveTo(index + temp, true);
        }
    }
});

var cssTemp = {
    'transition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
};

for (var i in cssTemp) {
    if (i in document.body.style) {
        $wpInner.on(cssTemp[i], function(event) {
            $pages.removeClass('cur').eq(index).addClass('cur');
        });
    }
}

function moveTo(arg, anim) {
    var $obj = $('.content:eq('+arg+')');
    var path = $obj.data('path');
    $obj.attr('src',path);
    if (arg >= maxLength || arg < 0) {
        return;
    }

    if (anim) {
        $wpInner.addClass('anim');
    } else {
        $wpInner.removeClass('anim');
    }

    var moveValue = -$wp.height() * arg;
    $wpInner.css('transform', 'translateY(' + moveValue + 'px)');
    if (index !== arg) {
        index = arg;
    }
}

//对屏幕进行横屏旋转限制
$(window).on('orientationchange',function(){
   var nowHeight = screenHeight;
   if(!checkMobileIOS()){
        //android 设备
        nowHeight = $(window).height();
        $('#wp').css('width',nowHeight);
    }else{
        nowHeight = screenHeight;
        $('#wp').css('width',width);
    }




    if(window.orientation == 90){
        //alert('shunshizhen');
        isNi = true;
        $('#wp').css('height',screenHeight);
        $pages.each(function(index, element) {
            // 赋值高度因为高度会变化
            $(element).height(screenHeight);
         });
        $('#wp').css('webkitTransformOrigin','0% 0%');
        if(!checkMobileIOS()){
            //Android 设备
            var value = 'rotate(-90deg) translateX(-'+nowHeight+'px )';
            $('#wp').css('webkitTransform',value);
            document.body.width = nowHeight;
            
        }else{
            //IOS 设备
            var value = 'rotate(-90deg) translateX(-'+width+'px )';
            $('#wp').css('webkitTransform',value);
            document.body.width = width;
        }



    }else if(window.orientation == 0){
        $('#wp').css('width',width);
        $('#wp').css('height',height);
        $pages.each(function(index, element) {
            // 赋值高度因为高度会变化
            $(element).height(height);
         });
        $('#wp').css('webkitTransformOrigin','0% 0%');
        var value = 'rotate(0deg) translateX(0px)';
        $('#wp').css('webkitTransform',value);
        document.body.width = width;
    }else if(window.orientation == -90){
        isNi = false;
        $('#wp').css('height',screenHeight);
        $pages.each(function(index, element) {
            // 赋值高度
            $(element).height(screenHeight);
        });
        $('#wp').css('webkitTransformOrigin','0% 100%');
        var value = 'rotate(90deg) translateX(-'+screenHeight+'px )';
        $('#wp').css('webkitTransform',value);
        // document.body.width = width;
        if(!checkMobileIOS()){
            //Android 设备
            document.body.width = nowHeight;
        }else{
            //IOS
            document.body.width = width;
        }
    }
 });

    var u = navigator.userAgent, app = navigator.appVersion;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端或者uc浏览器
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    var checkMobileIOS = function(){
      if(isiOS){
        return true;
      }else{
        return false;
      }
    }

});
