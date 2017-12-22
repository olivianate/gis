webpackJsonp([25],{593:function(t,n){t.exports='<!DOCTYPE html>\r\n<html>\r\n\r\n<head>\r\n\t<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\r\n\t<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />\r\n\t<title>地图展示</title>\r\n\t<style type="text/css">\r\n\t\tbody,\r\n\t\thtml {\r\n\t\t\tmargin: 0;\r\n\t\t\theight: 100%;\r\n\t\t\twidth: 100%;\r\n\t\t\tposition: absolute;\r\n\t\t}\r\n\r\n\t\t#map {\r\n\t\t\tposition: absolute;\r\n\t\t\ttop: 0;\r\n\t\t\tleft: 0;\r\n\t\t\tright: 0;\r\n\t\t\tbottom: 0;\r\n\t\t\twidth: 100%;\r\n\t\t\theight: 100%;\r\n\t\t}\r\n\r\n\t\t.drawingToolbar {\r\n\t\t\tcolor: #666;\r\n\t\t\tbackground: #fff;\r\n\t\t\tfont-size: 14px;\r\n\t\t\tz-index: 999;\r\n\t\t\tposition: absolute;\r\n\t\t\ttop: 10px;\r\n\t\t\t;\r\n\t\t\tleft: 10px;\r\n\t\t\twidth: auto;\r\n\t\t\tline-height: 1;\r\n\t\t\tpadding: 10px;\r\n\t\t}\r\n\t</style>\r\n</head>\r\n\r\n<body>\r\n\t<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=您的密钥"><\/script>\r\n\t<script src="https://libs.baidu.com/jquery/1.9.0/jquery.js"><\/script>\r\n\t<div id="map"></div>\r\n\t<div class="drawingToolbar">\r\n\t\t<table>\r\n\t\t\t<tr>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<span>策略</span>\r\n\t\t\t\t</td>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<div id="driving_way">\r\n\t\t\t\t\t\t<select>\r\n\t\t\t\t\t\t\t<option value="0">最少时间</option>\r\n\t\t\t\t\t\t\t<option value="1">最短距离</option>\r\n\t\t\t\t\t\t\t<option value="2">避开高速</option>\r\n\t\t\t\t\t\t</select>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<span>起点</span>\r\n\t\t\t\t</td>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<input type="text" id="sPoint" placeholder="120.290785,30.488837" value="120.290785,30.488837">\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<span>终点</span>\r\n\t\t\t\t</td>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<input type="text" id="ePoint" placeholder="120.208989,30.33758" value="120.208989,30.33758">\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<input type="button" value="查询" id="btnSearch" onclick="fnSearch()"> </td>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<input type="button" value="重置" id="btnReset" onclick="fnReset()"> </td>\r\n\t\t\t</tr>\r\n\t\t</table>\r\n\t\t<br/>\r\n\t\t<textarea id="result0" rows="1" cols="40"></textarea>\r\n\t\t<br />\r\n\t\t<textarea id="result1" rows="1" cols="40"></textarea>\r\n\t\t<br />\r\n\t\t<textarea id="result2" rows="1" cols="40"></textarea>\r\n\t</div>\r\n</body>\r\n\r\n</html>\r\n<script>\r\n\tvar map;\r\n\t//创建和初始化地图函数：\r\n\tfunction initMap() {\r\n\t\tcreateMap();//创建地图\r\n\t\tsetMapEvent();//设置地图事件\r\n\t};\r\n\tfunction createMap() {\r\n\t\tmap = new BMap.Map("map");\r\n\t\tmap.centerAndZoom(new BMap.Point(112.571757, 37.798085), 9);\r\n\t};\r\n\tfunction setMapEvent() {\r\n\t\tmap.enableScrollWheelZoom();\r\n\t};\r\n\tinitMap();\r\n\r\n\tfunction fnSearch() {\r\n\t\tvar sp = $("#sPoint").val();\r\n\t\tvar ep = $("#ePoint").val();\r\n\t\tvar i = $("#driving_way select").val();\r\n\t\t//三种驾车策略：最少时间，最短距离，避开高速\r\n\t\tvar routePolicy = [BMAP_DRIVING_POLICY_LEAST_TIME, BMAP_DRIVING_POLICY_LEAST_DISTANCE, BMAP_DRIVING_POLICY_AVOID_HIGHWAYS];\r\n\t\tif (sp && ep) {\r\n\t\t\tsearch(sp.split(",")[0], sp.split(",")[1],\r\n\t\t\t\tep.split(",")[0], ep.split(",")[1], routePolicy[i]);\r\n\t\t}\r\n\t};\r\n\r\n\tfunction fnReset() {\r\n\t\tvar sp = $("#sPoint").val("");\r\n\t\tvar ep = $("#ePoint").val("");\r\n\t\t$("#result0").html("");\r\n\t\t$("#result1").html("");\r\n\t\t$("#result2").html("");\r\n\t\tmap.clearOverlays();\r\n\t}\r\n\r\n\tfunction search(slng, slat, elng, elat, route, tujd) {\r\n\t\t//确定查询的策略，百度现在只支持最短时间，最短路程，不走高速三种策略\r\n\t\tif (slng && slat && elng && elat) {\r\n\t\t\tvar start = new BMap.Point(slng, slat);\r\n\t\t\tvar end = new BMap.Point(elng, elat);\r\n\r\n\t\t\tvar driving = new BMap.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true }, policy: route });\r\n\t\t\tif (tujd && tujd.length > 0) {\r\n\t\t\t\tdriving.search(start, end, { waypoints: tujd });\r\n\t\t\t} else {\r\n\t\t\t\tdriving.search(start, end);\r\n\t\t\t}\r\n\t\t\tdriving.setSearchCompleteCallback(function (results) {\r\n\t\t\t\tvar i = $("#driving_way select").val();\r\n\t\t\t\tif (i == 0) {\r\n\t\t\t\t\tpolicy = \'最少时间\';\r\n\t\t\t\t} else if (i == 1) {\r\n\t\t\t\t\tpolicy = \'最短距离\';\r\n\t\t\t\t} else {\r\n\t\t\t\t\tpolicy = \'避开高速\';\r\n\t\t\t\t}\r\n\t\t\t\t$(\'#result\' + i).html(policy + \'：\' + results.getPlan(0).getDistance(true));\r\n\t\t\t});\r\n\t\t}\r\n\t}\r\n<\/script>'}});