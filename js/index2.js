var index = 0,
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

$wpInner.on('touchmove', function(event) {
    event.preventDefault();

    var originalEvent = event.originalEvent;
    if (originalEvent.targetTouches.length > 1) {
        moveTo(index + temp, true);
    } else {
        // 先去掉anim类
        $wpInner.removeClass('anim');
        // 计算move过程中的pageX和initX的差值
        var movingY = originalEvent.changedTouches[0].pageY;
        var differenceY = movingY - initY;
        // 用pageY + index * 幻灯片的宽度设置transform
        var moveValue = -$wp.height() * index + differenceY;
        $wpInner.css('transform', 'translateY(' + moveValue + 'px)');
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

//animation
function animation(wrap){
	wrap.find('.animation').each(function(index, element) {
		$(element).css({'animation-delay':index*0.5 + 's','-webkit-animation-delay':index*0.5 + 's'});
	});
	//左边飞入
	wrap.find('.J_fadeInLeft').each(function(index, element) {
	  $(element).addClass('animated fadeInLeft')
	  .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	  	$(this).removeClass('animated fadeInLeft');
	  });
	});
	//右边飞入
	wrap.find('.J_fadeInRight').each(function(index, element) {
	  $(element).addClass('animated fadeInRight')
	  .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	  	$(this).removeClass('animated fadeInRight');
	  });
	});
	//抖动飞入
	wrap.find('.J_bounceIn').each(function(index, element) {
	  $(element).addClass('animated bounceIn')
	  .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
	  	$(this).removeClass('animated bounceIn');
	  });
	});
}

animation($curPage);

for (var i in cssTemp) {
    if (i in document.body.style) {
        $wpInner.on(cssTemp[i], function(event) {
            $pages.removeClass('cur').eq(index).addClass('cur');
            //animation
            animation($pages.eq(index));
        });
    }
}

function moveTo(arg, anim) {
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
