webpackJsonp([26],{592:function(t,n){t.exports='<!DOCTYPE html>\r\n<html>\r\n\r\n<head>\r\n\t<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\r\n\t<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />\r\n\t<title>地图展示</title>\r\n\t<style type="text/css">\r\n\t\tbody,\r\n\t\thtml {\r\n\t\t\tmargin: 0;\r\n\t\t\theight: 100%;\r\n\t\t\twidth: 100%;\r\n\t\t\tposition: absolute;\r\n\t\t}\r\n\r\n\t\t#map {\r\n\t\t\tposition: absolute;\r\n\t\t\ttop: 0;\r\n\t\t\tleft: 0;\r\n\t\t\tright: 0;\r\n\t\t\tbottom: 0;\r\n\t\t\twidth: 100%;\r\n\t\t\theight: 100%;\r\n\t\t}\r\n\t</style>\r\n</head>\r\n\r\n<body>\r\n\t<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=您的密钥"><\/script>\r\n\t<div id="map" style="width:100%;height:100%;"></div>\r\n</body>\r\n\r\n</html>\r\n<script type="text/javascript">\r\n\r\n\t// 定义自定义覆盖物的构造函数  \r\n\tfunction SquareOverlay(center, length, color) {\r\n\t\tthis._center = center;\r\n\t\tthis._length = length;\r\n\t\tthis._color = color;\r\n\t}\r\n\t// 继承API的BMap.Overlay    \r\n\tSquareOverlay.prototype = new BMap.Overlay();\r\n\r\n\t// 实现初始化方法  \r\n\tSquareOverlay.prototype.initialize = function (map) {\r\n\t\t// 保存map对象实例   \r\n\t\tthis._map = map;\r\n\t\t// 创建div元素，作为自定义覆盖物的容器   \r\n\t\tvar div = document.createElement("div");\r\n\t\tdiv.style.position = "absolute";\r\n\t\t// 可以根据参数设置元素外观   \r\n\t\tdiv.style.width = this._length + "px";\r\n\t\tdiv.style.height = this._length + "px";\r\n\t\tdiv.style.background = this._color;\r\n\t\t// 将div添加到覆盖物容器中   \r\n\t\tmap.getPanes().markerPane.appendChild(div);\r\n\t\t// 保存div实例   \r\n\t\tthis._div = div;\r\n\t\t// 需要将div元素作为方法的返回值，当调用该覆盖物的show、   \r\n\t\t// hide方法，或者对覆盖物进行移除时，API都将操作此元素。   \r\n\t\treturn div;\r\n\t}\r\n\t// 实现绘制方法   \r\n\tSquareOverlay.prototype.draw = function () {\r\n\t\t// 根据地理坐标转换为像素坐标，并设置给容器    \r\n\t\tvar position = this._map.pointToOverlayPixel(this._center);\r\n\t\tthis._div.style.left = position.x - this._length / 2 + "px";\r\n\t\tthis._div.style.top = position.y - this._length / 2 + "px";\r\n\t}\r\n\t// 实现显示方法    \r\n\tSquareOverlay.prototype.show = function () {\r\n\t\tif (this._div) {\r\n\t\t\tthis._div.style.display = "";\r\n\t\t}\r\n\t}\r\n\t// 实现隐藏方法  \r\n\tSquareOverlay.prototype.hide = function () {\r\n\t\tif (this._div) {\r\n\t\t\tthis._div.style.display = "none";\r\n\t\t}\r\n\t}\r\n\r\n\t// 添加自定义方法   \r\n\tSquareOverlay.prototype.toggle = function () {\r\n\t\tif (this._div) {\r\n\t\t\tif (this._div.style.display == "") {\r\n\t\t\t\tthis.hide();\r\n\t\t\t}\r\n\t\t\telse {\r\n\t\t\t\tthis.show();\r\n\t\t\t}\r\n\t\t}\r\n\t}\r\n\r\n\tvar map;\r\n\t//创建和初始化地图函数：\r\n\tfunction initMap() {\r\n\t\tmap = new BMap.Map("map");\r\n\t\tmap.centerAndZoom(new BMap.Point(120.137323, 30.232054), 12);\r\n\t\tmap.enableScrollWheelZoom();\r\n\t};\r\n\tinitMap();\r\n\r\n\tvar container;\r\n\tvar pt = new BMap.Point(120.247707, 30.22338);\r\n\tcontainer = document.createElement(\'div\');\r\n\t// 添加自定义覆盖物   \r\n\tvar mySquare = new SquareOverlay(map.getCenter(), 100, "red");\r\n\tmap.addOverlay(mySquare);\r\n\r\n\r\n<\/script>'}});