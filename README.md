# h5page
h5 手指滑动滚动页面
````
<body onorientationchange="updateOrientation();">
 
当用户旋转屏幕的时候，会进入到你的监听方法中，然后通过window.orientation来获取当前屏幕的状态：
0 - 竖屏 
90 - 逆时针旋转横屏 
-90 - 顺时针旋转横屏 
180 - 竖屏，上下颠倒

如果你不希望用户使用横屏方式查看你的网页，你可以在设备旋转时间监听里面对body使用CSS3里面的transition中的旋转来保持页面竖向。但是目前很少见到限制用户横屏查看的页面

注意：$(window).on('orientationchange',function(){......});

转屏幕以后，把内容旋转90 度
if(window.orientation == 90){
        $('#wp').css('webkitTransformOrigin','0% 0%');
        var value = 'rotate(-90deg) translateX(-'+width+'px )';
        $('#wp').css('webkitTransform',value);
      ..........
}else if(window.orientation == -90){
         $('#wp').css('webkitTransformOrigin','0% 100%');
        var value = 'rotate(90deg) translateX(-'+window.screen.height+'px )';
        $('#wp').css('webkitTransform',value);
.............
}else if(window.oritentation == 0){
       var value = 'rotate(0deg) translateX(0px )';
       $('#wp').css('webkitTransform',value);
}
这种方法只能适用于单个滚屏页面
