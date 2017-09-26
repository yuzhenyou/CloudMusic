function Node(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
    this.index = -1;
}

//双向循环列表
function LinkList() {
    var _nodes = [];
    this.head = null;
    this.last = null;

    if (typeof this.append !== "function") {
        LinkList.prototype.append = function (node) {
            if (this.head == null) {
                this.head = node;
                this.last = this.head;
            }
            else {
                this.head.prev = node;
                this.last.next = node;

                node.prev = this.last;
                node.next = this.head;

                this.last = node;
            }

            node.index = _nodes.length; //务必在push前设置node.index
            _nodes.push(node);
        }
    }
}

//单向循环列表
function SingleList() {
    var _nodes = [];
    this.head = null;
    this.last = null;

    if (typeof this.append !== "function") {
        SingleList.prototype.append = function (node) {
            if (this.head == null) {
                this.head = node;
                this.last = this.head;
            }
            else {
                this.last.next = node;
                node.prev = this.last;
                this.last = node;
            }

            node.index = _nodes.length; //务必在push前设置node.index
            _nodes.push(node);
        }
    }
}

function CreateCarousel(containerClass, itemClass, loop) {

    var _carousel = {};

    var _itemChangedHandler = null;

    var _container = document.querySelector("." + containerClass);
    var _items = document.querySelectorAll("." + itemClass);

    var list = loop ? new LinkList() : new SingleList();
    for(var i = 0; i < _items.length; i++) {
        list.append(new Node(_items[i]));
    }

    var _prev = null;
    var _current = list.head;

    var _normalZIndex = _current.data.style.zIndex;
    var _activeZIndex = _normalZIndex + 1;

    var _pageWidth = _current.data.offsetWidth; //页面宽度

    positionItems();
    zindexItems(_current, _activeZIndex);

    // console.log(_items[0]);
    // console.log("window.innerWidth:" + window.innerWidth);

    function transformItem(item, translate) {
        item.style.webkitTransform = "translate3d("+translate+"px,0,0)";
    };

    function zindexItems(node, zindex) {
        if (node.prev)
            zindexItem(node.prev.data, zindex);

        if (node.next)
            zindexItem(node.next.data, zindex);

        zindexItem(node.data, zindex);
    };

    function zindexItem(item, zindex) {
        item.style.zIndex = zindex;
    };

    function transitionItems(node, isTransition) {

        var transition = isTransition ? "0.3s ease -webkit-transform" : "";

        if (node !== null) {
            //使用动画过渡让页面滑动到最终的位置
            node.data.style.webkitTransition = transition;

            if (node.prev) {
                node.prev.data.style.webkitTransition = transition;
            }

            if (node.next) {
                node.next.data.style.webkitTransition = transition;
            }
        }
    }

    function moveItems(translate) {
        //页面向左滑动
        if(translate > 0) {
            if (_current.prev !== null) {
                transformItem(_current.prev.data, -_pageWidth + translate);
                transformItem(_current.data, translate);
            }
        }
        //页面向右滑动
        else if (translate < 0) {
            if (_current.next !== null) {
                transformItem(_current.next.data, _pageWidth + translate);
                transformItem(_current.data, translate);
            }
        }
        else {
            if (_current.prev !== null) {
                transformItem(_current.prev.data, -_pageWidth + translate);
                transformItem(_current.data, translate);
            }
            if (_current.next !== null) {
                transformItem(_current.next.data, _pageWidth + translate);
                transformItem(_current.data, translate);
            }
        }
    };

    function moveTo(translate, isRollback) {
        if (isRollback) {
            transitionItems(_current, true);  //为当前元素添加过渡
            positionItems();
            return;
        }
        else {
            var next = translate < 0 ? _current.next : _current.prev;

            if (next !== null) {
                transitionItems(_current, true);  //为当前元素添加过渡

                _prev = _current;
                _current = next;

                zindexItems(_prev, _normalZIndex);
                zindexItems(_current, _activeZIndex);

                positionItems();

                if(typeof _itemChangedHandler === "function") {
                    _itemChangedHandler(_prev.index, _current.index);
                }
            }
        }
    }

    function positionItems() {
        if (_current.prev) {
            transformItem(_current.prev.data, -_pageWidth);
        }

        if (_current.next) {
            transformItem(_current.next.data, _pageWidth);
        }

        transformItem(_current.data, 0);
    };

    _carousel.bindTouchEvent = function () {

        var startX,startY;
        var isMove = false;     //是否发生左右滑动
        var startT = 0;         //记录手指按下去的时间
        var translate = 0;

        /*手指按下时*/
        _container.addEventListener("touchstart", function(e) {
            // e.preventDefault();//取消此行代码的注释会在该元素内阻止页面纵向滚动
            var touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            _container.style.webkitTransition = ""; //取消动画效果
            startT = new Date().getTime();          //记录手指按下的开始时间
            isMove = false;
            transitionItems(_prev, false);             //取消之前元素的过渡
            transitionItems(_current, false);          //取消当前元素的过渡
        }, false);

        /*手指在屏幕上滑动，页面跟随手指移动*/
        _container.addEventListener("touchmove", function(e) {
            // e.preventDefault();//取消此行代码的注释会在该元素内阻止页面纵向滚动
            var touch = e.touches[0];
            var deltaX = touch.clientX - startX;
            var deltaY = touch.clientY - startY;
            //如果X方向上的位移大于Y方向，则认为是左右滑动
            if (Math.abs(deltaX) > Math.abs(deltaY)){
                translate = deltaX > _pageWidth ? _pageWidth : deltaX;
                translate = deltaX < -_pageWidth ? -_pageWidth : deltaX;

                moveItems(translate);

                isMove = true;
            }
        }, false);

        /*手指离开屏幕时，计算最终需要停留在哪一页*/
        _container.addEventListener("touchend",function(e) {
            // e.preventDefault();//取消此行代码的注释会在该元素内阻止页面纵向滚动

            //是否会滚
            var isRollback = false;

            //计算手指在屏幕上停留的时间
            var deltaT = new Date().getTime() - startT;
            if (isMove) { //发生了左右滑动
                //如果停留时间小于300ms,则认为是快速滑动，无论滑动距离是多少，都停留到下一页
                if(deltaT < 300){
                    translate = translate < 0 ? -_pageWidth : _pageWidth;
                }else {
                    //如果滑动距离小于屏幕的50%，则退回到上一页
                    if (Math.abs(translate) / _pageWidth < 0.5){
                        isRollback = true;
                    }else{
                        //如果滑动距离大于屏幕的50%，则滑动到下一页
                        translate = translate < 0 ? -_pageWidth : _pageWidth;
                    }
                }

                moveTo(translate, isRollback);
            }
        }, false);

        return _carousel;
    };

    _carousel.prev = function () {
        transitionItems(_prev, false);
        moveTo(_pageWidth);
    };

    _carousel.next = function () {
        transitionItems(_prev, false);
        moveTo(-_pageWidth);
    };

    _carousel.moveTo = function (dstIndex) {
      var offset = dstIndex - _current.index;
      if (offset !== 0) {
        var move = offset > 0 ? this.next : this.prev;
        offset = Math.abs(offset);
        while(offset > 0) {
          move();
          offset--;
        }
      }
    };

    _carousel.setItemChangedHandler = function (itemChangedHandler) {
        _itemChangedHandler = itemChangedHandler;
        return _carousel;
    };

    return _carousel;
}


