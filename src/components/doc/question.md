### 常见问题

#### 1. 关于地图初始化只展示一小块的问题

* 注意如果在初始化地图时，出现了加载异常，只是加载了一小块地图，这种问题通常是容
  器处于隐藏状态导致的，api 会认为地图宽高为 0。**建议等待容器处于可见状态后再初
  始化地图**。
* 另外百度地图开放平台提供
  了[地图生成器](http://api.map.baidu.com/lbsapi/createmap/index.html); 可以快速
  创建地图。

```python
//创建和初始化地图函数：
function initMap(){
  createMap();//创建地图
  setMapEvent();//设置地图事件
  addMapControl();//向地图添加控件
};
function createMap(){
    map = new BMap.Map("map", {
        enableMapClick:false //是否开启底图可点功能，默认启用
    });
    map.centerAndZoom(new BMap.Point(120.259277,30.233864),12);
    map.addEventListener("tilesloaded", function () {
        //去掉地图左下解的LOGO与文字
        $('.anchorBL').remove();
        $('.BMap_cpyCtrl').remove();
    });
};
function setMapEvent(){
  map.enableScrollWheelZoom();//启用滚轮放大缩小，默认禁用
};
//向地图添加控件
function addMapControl(){
    //添加切换城市控件
    var size = new BMap.Size(10, 20);
    var cityControl = new BMap.CityListControl({
        anchor: BMAP_ANCHOR_TOP_LEFT,
        offset: size,
        onChangeBefore: function(){},
        onChangeAfter: function(){},
        onChangeSuccess: function(){},
    });
    map.addControl(cityControl);
}

var map;
initMap();
```

#### 2. 根据关键字检索数据进行分页展示的问题

根据搜索结果自定义展示分页，在分页的时候需要用 gotoPage 返回数据。注意
：**gotoPage 分页展示不要跨页太大**，比如现在展示的是第 1 页的数据，如果要直接跨
页展示最后一页 190 页的数据会出现搜索无响应的现象。

```python
var resultList = [], city = '杭州', keyword = '酒店';
var local = new BMap.LocalSearch(city, {renderOptions:{selectFirstResult:false,autoViewport:false}});
local.setPageCapacity(20);//设置页数
local.search(keyword);
local.setSearchCompleteCallback(function(results){
    if(local.getStatus() == BMAP_STATUS_SUCCESS){
        for(var i=0; i < results.getCurrentNumPois(); i++){
            var poi = results.getPoi(i);
            var pt = {
                'source':'baidu',
                'name': poi.title || '',
                'address': poi.address || '',
                'lng': poi.point.lng,
                'lat': poi.point.lat
            };
            resultList[results.getPageIndex() * 4 + i] = pt;
            //将resultList展示在页面
        };
    });
});

//搜索结果分页，点击分页获取页码，如：第3页，调用gotoPage(page: Number)
local.gotoPage(pn - 1);
```

#### 3. 关于地图上鼠标经过时展示此时的坐标信息的控件

可以利用添加标注工
具[MarkerTool](http://api.map.baidu.com/library/MarkerTool/1.2/docs/help.html)，
引入 MarkerTool.js，

```python
var icon = 'http://api.map.baidu.com/library/MarkerTool/1.2/src/images/us_mk_icon.png';//图标地址
var mkrTool = '';
function mkrToolOpen(){
    mkrTool = new BMapLib.MarkerTool(map);
    mkrTool.open();
    var icon = newIcon(icon);
    mkrTool.setIcon(icon);
    return mkrTool
};

mkrTool.addEventListener("markend", function(e) {
    var mkr = e.marker;
    mkr.addEventListener("click",addClickHandler);
    mkr.addEventListener("dragend",addDragendHandler);
    addClickHandler(mkr);
});
```

#### 4. 如何设置 marker 的图标，并添加点击、拖动事件

newIcon 创建新
的[图标](http://lbsyun.baidu.com/cms/jsapi/class/jsapi_reference.html#a3b5)，此
时要配置好图片的哪个点对应 Marker 的经纬度，配置的方法是调用 Icon 的
icon.setImageSize(imageSize) 方法。

```python
function newIcon(icon){
    return new BMap.Icon(icon, new BMap.Size(21, 21),{
        anchor: new BMap.Size(6, 21),
        imageOffset: new BMap.Size(0, 0)
    });
};

function newMarker(data, icon){
    var lng = data.lng, lat = data.lat;
    var pt = new BMap.Point(lng, lat);
    var opts = icon;
    var icon = newIcon(opts);
    var mkr = new BMap.Marker(pt, {icon: icon});
    mkr.data = data;
    map.addOverlay(mkr);
    mkr.addEventListener("click",addClickHandler);
    mkr.addEventListener("dragend",addDragendHandler);
    return mkr
};

function addClickHandler(e){
    openInfoWin(e);
};
function addDragendHandler(e){
    openInfoWin(e);
};
```

注意：另外也可以用百度地图
的[富 Marker 类](http://api.map.baidu.com/library/RichMarker/1.2/docs/help.html),
可以自定义丰富的 Marker 展现，并添加点击、双击、拖拽等事件。富 Marker 类灵活易用
，在拖动 marker 的时候弹窗可以自动跟随。但是不能和聚合 marker 一起用，有 bug！！

#### 5. 包含信息的窗口 InfoWindow，如何修改内容和样式？

在移动的过程中，如果希望 infoWindow 一直处于打开的状态，可以在 marker 的 dragend
调用再次打开弹窗的函数。

```python
//修改弹窗内容
function openInfoWin(e){
    var mkr = e;
    if(e.currentTarget){
        mkr = e.currentTarget;
    };
    mkr.enableDragging();//开启移动
    var data = mkr.data;
    var con = infoWin(), pt = mkr.getPosition();
    //信息窗宽度，单位像素。取值范围：0,220-730。如果您指定宽度为0，则信息窗口的宽度将按照其内容自动调整
    var opts = {
        width: 0,
        height: 0,
        offset:{
            width: -16,
            height: -20
        }
    };
    var info = new BMap.InfoWindow(con, opts);
    info.addEventListener('open',function(){
    });
    map.openInfoWindow(info,pt);//打开信息窗口
};

function infoWin(data){
    var content = '';
    content += "<table>";
    content += "<tr>";
    content += "<td>地址：</td>";
    content += "<td>" + data.address + "</td>";
    content += "</tr>";
    content += "</table>";
};
```

InfoWindow ，此类表示地图上包含信息的窗口，信息窗口有几块拼成，可以根据 class
BMap_top 定位 child 进行适当的修改

```python
//修改圆角
.BMap_pop div:nth-child(1) div:nth-child(1){
	border-radius:6px 0 0 0 ;
}
.BMap_pop div:nth-child(3) div:nth-child(1){
	border-radius:0 6px 0 0 ;
}
.BMap_pop div:nth-child(5) div:nth-child(1){
	border-radius:0 0 0 6px ;
}
.BMap_pop div:nth-child(7) div:nth-child(1){
	border-radius:0 0 6px 0 ;
}
//隐藏阴影
.BMap_shadow{
    display: none;
}
.BMap_pop div:nth-child(8){
	background: url(./img/info.png) -204px -691px;//设置底部箭头的图片
}
//
.BMap_pop>img{
	display: none;
}
```

如果不用 infoWindow，也可以用百度地图
的[infoBox](http://api.map.baidu.com/library/InfoBox/1.2/docs/help.html)。类似于
infoWindow，比 infoWindow 更有灵活性，可以定制 border，关闭按钮样式等。

#### 6. 如何自定义覆盖物

百度地图 API 支持用
户[自定义覆盖物](http://lbsyun.baidu.com/index.php?title=jspopular/guide/cover#.E8.87.AA.E5.AE.9A.E4.B9.89.E8.A6.86.E7.9B.96.E7.89.A9)，
要创建自定义覆盖物，您需要做以下工作：

1. 定义一个自定义覆盖物的构造函数，通过构造函数参数可以传递一些自由的变量。
2. 设置自定义覆盖物对象的 prototype 属性为 Overlay 的实例，以便继承覆盖物基类。
3. 实现 initialize 方法，当调用 map.addOverlay 方法时，API 会调用此方法。
4. 实现 draw 方法。

#### 7. 如何使用绘制地图的点、线、面工具

[鼠标绘制管理类](http://api.map.baidu.com/library/DrawingManager/1.4/docs/symbols/BMapLib.DrawingManager.html)，
鼠标绘制管理的入口。 实例化该类后，即可调用该类提供的 open 方法开启绘制模式状态
。 也可加入工具栏进行选择操作。
[百度 demo 入口](http://developer.baidu.com/map/jsdemo.htm#f0_7)

```python
var styleOptions = {
    strokeColor:"rgb(255, 0, 0)",    //边线颜色。
    fillColor:"rgb(227, 0, 0)",      //填充颜色。当参数为空时，圆形将没有填充效果。
    strokeWeight: 1,       //边线的宽度，以像素为单位。
    strokeOpacity: 1,    //边线透明度，取值范围0 - 1。
    fillOpacity: 0.2,      //填充的透明度，取值范围0 - 1。
    strokeStyle: 'solid' //边线的样式，solid或dashed。
};
var drawingManage = new BMapLib.DrawingManager(map, {
    isOpen: false, //是否开启绘制模式
    enableDrawingTool: false, //是否显示工具栏
    drawingToolOptions: {
        anchor: BMAP_ANCHOR_TOP_RIGHT, //位置
        offset: new BMap.Size(5, 5), //偏离值
        scale: 0.8 //工具栏缩放比例
    },
    circleOptions: styleOptions, //圆的样式
    polygonOptions: styleOptions //多边形的样式
});
drawingManage.addEventListener('overlaycomplete', overlaycomplete); //鼠标绘制完成后，派发总事件的接口
function overlaycomplete(){

};

//开始绘制，多边形:BMAP_DRAWING_POLYGON，圆形:BMAP_DRAWING_CIRCLE
drawingManage.open();
drawingManage.setDrawingMode(BMAP_DRAWING_POLYGON);
```

#### 8. 绘制行政区划时，放大缩小地图时，不显示的问题

严格按照百度地图的 demo 绘制！百度添加行政区划
：http://developer.baidu.com/map/jsdemo.htm#c1_10

另外百度地图的行政区划 和高德的行政区划差别较大，具体可以看两者的 demo，以台湾为
例，比较直观。高德添加行政区划
：http://lbs.amap.com/api/javascript-api/guide/map-data/cministrative_division

#### 9. 如何获取多边形的面积

百度开源库 GeoUtils 类提供若干几何算法，用来帮助用户判断点与矩形、 圆形、多边形
线、多边形面的关系 , 并提供计算折线长度和多边形的面积的公式。注意
：BMapLib.GeoUtils.getPolygonArea(polygon) 不适合计算自相交多边形的面积 ( 封闭的
面积 ) 实例：
（http://api.map.baidu.com/library/GeoUtils/1.2/examples/simple.html）

#### 10. 关于驾车的数据展示问题

如果保存获取的结果、线路等信息，或者修改绘制线路的图标，样式等，可以自行对返回
的[检索结果](http://developer.baidu.com/map/jsdemo.htm#i5_5)进行处理

```python
var driving = new BMap.DrivingRoute($scope.map,{
    policy: BMAP_DRIVING_POLICY_LEAST_DISTANCE//最短距离
});
driving.search(markers[0].point, markers[1].point);
driving.setSearchCompleteCallback(function(results){
    onSearchComplete(results);
});

function onSearchComplete(results){
    var pts = driving.getResults().getPlan(0).getRoute(0).getPath();
    var line = new BMap.Polyline(pts);
    map.addOverlay(line);
};
```

另外一个关于获取百度地图两点的路线规划信息的 demo：
https://october-yan.github.io/driving/

#### 11. 关于动态设置驾车途径点的问题

注意：百度地图 API 官方提供的 waypoints 途经点集合，最多支持 10 个途经点。那么问
题来了，如果你超过 10 个途径点计算驾车路线，解决方法就要分段 search。以每 11 个
点之间做一次 search, 不足 11 个点的检索做一次 search。

动态设置驾车途径点： http://lbsyun.baidu.com/jsdemo.htm?a#i5_9

#### 12. 关于坐标转换几个概念

首先看以下几个概念

>
> 1、地球坐标 (WGS84)：
>
> * 国际标准，从专业 GPS 设备中取出的数据的坐标系，国际地图提供商使用的坐标系
>  
> 2、火星坐标 (GCJ-02) 也叫国测局坐标系:
> 
> * 中国标准，从国行移动设备中定位获取的坐标数据使用这个坐标系。、
> * 国家规定： 国内出版的各种地图系统（包括电子形式），必须至少采用 GCJ-02 对地
>   理位置进行首次加密。 
> 
> 3 、百度坐标 (BD-09)：
>
> * 百度标准，百度 SDK，百度地图，Geocoding 使用，百度又在火星坐标上来个二次加密。
>

从设备获取经纬度（GPS ）坐标 ：

* 如果使用的是百度 sdk 那么可以获得百度坐标（bd09 ）或者火星坐标（GCJ02), 默认是
  bd09
* 如果使用的是 ios 的原生定位库，那么获得的坐标是 WGS84
* 如果使用的是高德 sdk, 那么获取的坐标是 GCJ02

互联网在线地图使用的坐标系： 1 、火星坐标系：

* iOS 地图（其实是高德）
* Gogole 地图
* 搜搜、阿里云、高德地图 2、百度坐标系：当然只有百度地图 3、WGS84 坐标系：国际标
  准，谷歌国外地图、osm 地图等国外的地图一般都是这个。

坐标转换：http://developer.baidu.com/map/jsdemo.htm#a5_2

#### 13. 关于百度地图 API 缩放级别和比例尺关系的问题

百度地图 API 一共分为 19 级，相对应的比例尺展示可以在拾取坐标系统查看：
http://api.map.baidu.com/lbsapi/getpoint/index.html 注意：在 3 级缩放级别下，世
界地图大小已经和容器大小一致；

#### 14. 百度地图提供的一些很方便展示的工具

* 拾取坐标系统 http://api.map.baidu.com/lbsapi/getpoint/index.html
* 地图编辑工具 http://lbsyun.baidu.com/custom/

#### 15. 百度地图 API 提供类经常用到的一些类有哪些？

百度 API 提供了很多类，这里列举下经常用到的一些：

- 核心类：Map
- 基础类：Point 、 Bounds、Size ，
- 覆盖物类：Marker 、 Polygon、Polyline 、 Label、InfoWindow 、 Icon、Circle
- 工具类：DistanceTool 、 DragAndZoomTool
- 服务类：LocalSearch 、 DrivingRoute、Geocoder 、 Route、Boundary
