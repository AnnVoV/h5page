$(function(){function t(t,n){var e=$(".content:eq("+t+")"),i=e.data("path");if(e.attr("src",i),!(t>=s||0>t)){n?r.addClass("anim"):r.removeClass("anim");var c=-o.height()*t;r.css("transform","translateY("+c+"px)"),a!==t&&(a=t)}}var n,e,a=0,o=$("#wp"),r=$("#wp-inner"),i=$(".page"),s=($(".page.cur"),i.size());o.on("touchstart",function(t){t.preventDefault()}).on("touchmove",function(t){t.preventDefault()}),i.each(function(t,n){$(n).height(o.height())}),r.on("touchstart",function(t){t.preventDefault();var e=t.originalEvent;e.targetTouches.length>1||(n=e.targetTouches[0].pageY)}),r.on("touchend",function(o){o.preventDefault();var r=o.originalEvent;if(!(r.targetTouches.length>1)){e=r.changedTouches[0].pageY;var i=e-n,c=0;Math.abs(i)>30&&(i>0?0!==a&&(c=-1):a!==s-1&&(c=1),t(a+c,!0))}});var c={transition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(var u in c)u in document.body.style&&r.on(c[u],function(t){i.removeClass("cur").eq(a).addClass("cur")})});