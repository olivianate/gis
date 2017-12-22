webpackJsonp([23],{595:function(t,n){t.exports='<!DOCTYPE html>\r\n<html>\r\n\r\n<head>\r\n\t<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\r\n\t<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />\r\n\t<title>地图展示</title>\r\n\t<style type="text/css">\r\n\t\tbody,\r\n\t\thtml {\r\n\t\t\tmargin: 0;\r\n\t\t\theight: 100%;\r\n\t\t\twidth: 100%;\r\n\t\t\tposition: absolute;\r\n\t\t}\r\n\r\n\t\t#map {\r\n\t\t\tposition: absolute;\r\n\t\t\ttop: 0;\r\n\t\t\tleft: 0;\r\n\t\t\tright: 0;\r\n\t\t\tbottom: 0;\r\n\t\t\twidth: 100%;\r\n\t\t\theight: 100%;\r\n\t\t\tfont-size: 14px;\r\n\t\t}\r\n\r\n\t\t.drawingToolbar {\r\n\t\t\tcolor: #666;\r\n\t\t\tbackground: #fff;\r\n\t\t\tz-index: 999;\r\n\t\t\tposition: absolute;\r\n\t\t\twidth: auto;\r\n\t\t\ttop: 10px;\r\n\t\t\tleft: 10px;\r\n\t\t\tline-height: 1;\r\n\t\t\theight: auto;\r\n\t\t\tpadding: 15px;\r\n\t\t}\r\n\r\n\t\tlabel {\r\n\t\t\tdisplay: block;\r\n\t\t\tmargin-bottom: 10px;\r\n\t\t}\r\n\r\n\t\ta {\r\n\t\t\tcursor: pointer;\r\n\t\t\tdisplay: block;\r\n\t\t\tmargin-bottom: 10px;\r\n\t\t}\r\n\t</style>\r\n</head>\r\n\r\n<body>\r\n\t<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=您的密钥"><\/script>\r\n\t<script src="https://libs.baidu.com/jquery/1.9.0/jquery.js"><\/script>\r\n\t<div id="map"></div>\r\n\t<div class="drawingToolbar">\r\n\t\t<div class="getCity">\r\n\t\t\t<label for="">数据格式： [[{ "lng": 119.96476082109066, "lat": 30.343381840299294 }, { "lng": 120.06767864200374, "lat": 30.301988799424937\r\n\t\t\t\t}, { "lng": 120.20569154660541, "lat": 30.321460781761544 } ],[ { "lng": 120.07630850806497, "lat": 30.438095684887397\r\n\t\t\t\t}, { "lng": 120.07630850806497, "lat": 30.438095684887397 }, { "lng": 119.96476082109066, "lat": 30.343381840299294 }]]\r\n\t\t\t</label>\r\n\t\t\t<textarea rows="10" cols="50" id="overlays">\r\n\t\t\t\t[[{\r\n\t\t\t\t\t\t"lng": 119.96476082109066,\r\n\t\t\t\t\t\t"lat": 30.343381840299294\r\n\t\t\t\t\t},\r\n\t\t\t\t\t{\r\n\t\t\t\t\t\t"lng": 120.06767864200374,\r\n\t\t\t\t\t\t"lat": 30.301988799424937\r\n\t\t\t\t\t},\r\n\t\t\t\t\t{\r\n\t\t\t\t\t\t"lng": 120.20569154660541,\r\n\t\t\t\t\t\t"lat": 30.321460781761544\r\n\t\t\t\t\t}]]\r\n\t\t\t</textarea>\r\n\t\t\t<div>\r\n\t\t\t\t<input type="button" onclick="add_overlay();" value="添加覆盖物" />\r\n\t\t\t\t<input type="button" onclick="remove_overlay();" value="删除覆盖物" />\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</body>\r\n\r\n</html>\r\n<script>\r\n\tvar map;\r\n\tvar os = document.getElementById("overlays");\r\n\t//创建和初始化地图函数：\r\n\tfunction initMap() {\r\n\t\tmap = new BMap.Map("map");\r\n\t\tmap.centerAndZoom(new BMap.Point(120.251157, 30.251835), 13);\r\n\t\tmap.enableScrollWheelZoom();\r\n\t};\r\n\tinitMap();\r\n\r\n\t//添加覆盖物\r\n\tfunction add_overlay() {\r\n\t\tvar data = os.value;\r\n\t\tvar pts = JSON.parse(data);\r\n\t\t// console.log(JSON.parse(pts));\r\n\t\tvar polygons = [];\r\n\t\tpts.forEach(function (v, i) {\r\n\t\t\tv.forEach(function (vq, iq) {\r\n\t\t\t\tpolygons.push(new BMap.Point(vq.lng, vq.lat));\r\n\t\t\t})\r\n\t\t\tvar polygon = new BMap.Polygon(polygons);\r\n\t\t\tmap.addOverlay(polygon);\r\n\t\t});\r\n\t\tmap.setViewport(polygons);\r\n\t};\r\n\r\n\t//清除覆盖物\r\n\tfunction remove_overlay() {\r\n\t\tmap.clearOverlays();\r\n\t}\r\n\r\n<\/script>'}});