// 滑动函数
    function moves(obj, target, callback) {
        window.clearInterval(obj.timer);
        obj.timer = window.setInterval(function() {
            var step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                window.clearInterval(obj.timer);
                if (callback) {
                    callback();
                }
            } else {
                obj.style.left = obj.offsetLeft + step + 'px';
            }
        }, 20)
    }
    // 移动到图片上的时候左右的箭头才显示出来 离开后又隐藏
    var focusing = document.querySelector('.focus');
    // 获取左箭头
    var arrowleft = document.querySelector('.arrow-left');
    // 获取右箭头
    var arrowright = document.querySelector('.arrow-right');
    var ul = document.querySelector('ul');
    // 获得图片张数
    var len = ul.children.length;
    // 动态生成下面的小圆点
    var ol = document.querySelector('ol');
    for (var i = 0; i < len - 1; i++) {
        var newcircle = document.createElement('li');
        ol.appendChild(newcircle);
    }
    // 把ol里面的第一个li的类名设置成current
    ol.children[0].className = 'current';
    // 收移动到focus的时候显示箭头
    focusing.addEventListener('mouseenter', function() {
            // 鼠标移动到图片的时候清除定时器
            window.clearInterval(timer);
            timer = null;
            arrowleft.style.display = 'block';
            arrowright.style.display = 'block';
  
        })
        // 鼠标离开又隐藏
    focusing.addEventListener('mouseleave', function() {
            // 鼠标离开又重新设置定时器
            // 自动播放轮播图
            timer = window.setInterval(function() {
                // 手动调用点击事件
                arrowright.click();
            }, 2000)
            arrowleft.style.display = 'none';
            arrowright.style.display = 'none';
        })
        // 给每个小圆点设置自定义属性
    for (var i = 0; i < len - 1; i++) {
        ol.children[i].setAttribute('index', i);
    }
    // 点击哪个小圆圈哪个小圆圈就变色 -排他思想
    for (var i = 0; i < len - 1; i++) {
        ol.children[i].addEventListener('click', function() {
            for (var j = 0; j < len - 1; j++) {
                ol.children[j].className = '';
            }
            // 点击第几个小圆点ul就移动小圆点坐标乘以图片宽度
            // alert(-(this.getAttribute('index') * ul.children[0].offsetWidth));
            moves(ul, -this.getAttribute('index') * ul.children[0].offsetWidth)
            num = this.getAttribute('index');
            circle = this.getAttribute('index');
            this.className = 'current';
            // ul.style.left = "-720px";
        })
    }
    // 点击右边箭头 设置一个num进行移动距离
    var num = 0;
    // 点击右边的箭头小圆圈也变色
    var circle = 0;
    arrowright.addEventListener('click', function() {
            if (num == len - 1) {
                ul.style.left = 0;
                num = 0;
                circle = 0
            }
            num++;
            moves(ul, -num * ul.children[0].offsetWidth);
            circle++;
            for (var i = 0; i < len - 1; i++) {
                ol.children[i].className = '';
            }
            // 在加到最后一张重复图片的时候就把第一个圆点变色
            if (circle == len - 1) {
                // alert('haha')
                ol.children[0].className = 'current';
            }
            ol.children[circle].className = 'current';
        })
        // 点击左边箭头
    arrowleft.addEventListener('click', function() {
            if (num == 0) {
                num = len - 1;
                ul.style.left = -num * ul.children[0].offsetWidth;
                circle = len - 1;
            }
            num--;
            moves(ul, -num * ul.children[0].offsetWidth);
            circle--;
            for (var i = 0; i < len - 1; i++) {
                ol.children[i].className = '';
            }
            // 在减到最后一张重复图片的时候就把第一个圆点变色
            if (circle == 0) {
                // alert('haha')
                ol.children[0].className = 'current';
            }
            ol.children[circle].className = 'current';
        })
        // 自动播放轮播图
    var timer = window.setInterval(function() {
        // 手动调用点击事件
        arrowright.click();
    }, 2000)