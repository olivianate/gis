webpackJsonp([7],{622:function(t,n){t.exports='<!DOCTYPE html>\r\n<html>\r\n<head>\r\n\t<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\r\n\t<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />\r\n\t<title>地图展示</title>\r\n\t<style type="text/css">\r\n\t\tbody, html {    \r\n\t\t\tmargin: 0;\r\n\t\t\theight: 100%;\r\n\t\t\twidth: 100%;\r\n\t\t\tposition: absolute;\r\n\t\t}\r\n\t\t#map {\r\n\t\t\tposition: absolute;\r\n\t\t\ttop: 0;\r\n\t\t\tleft: 0;\r\n\t\t\tright: 0;\r\n\t\t\tbottom: 0;\r\n\t\t\twidth: 100%;\r\n\t\t\theight: 100%;\r\n\t\t}\r\n\t\t.drawingToolbar{\r\n\t\t\tz-index: 999;\r\n\t\t\tposition: absolute;\r\n\t\t\ttop: 10px;;\r\n\t\t\tleft: 10px;\r\n\t\t\tright: 10px;\r\n\t\t\twidth: 100%;\r\n\t\t\tline-height: 1;\r\n\t\t}\r\n\t\t.drawingToolbar a{\r\n\t\t\tfont-size: 14px;\r\n\t\t\tbackground: #fff;\r\n\t\t\tcursor: pointer;\r\n\t\t\tdisplay: inline-block;\r\n\t\t\twidth: auto;\r\n\t\t\tpadding: 10px;\r\n\t\t}\r\n\t</style>\r\n</head>\r\n<body>\r\n\t<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=您的密钥"><\/script>\r\n\t<div class="drawingToolbar">\r\n\t\t<a onclick="mkrToolOpen()">创建点</a>\r\n\t</div>\r\n\t<div id="map" style="width:100%;height:100%;"></div>\r\n</body>\r\n</html>\r\n<script type="text/javascript">\r\n\r\n\tvar map;\r\n\tvar curMkr = null; // 记录当前添加的Mkr\r\n\tvar infoWin = null; //记录弹窗\r\n\tvar mkrIcon = \'\';\r\n\r\n\t//创建和初始化地图函数：\r\n    function initMap(){\r\n      createMap();//创建地图\r\n      setMapEvent();//设置地图事件\r\n      addMapControl();//向地图添加控件\r\n      addMapOverlay();//向地图添加覆盖物\r\n    };\r\n    function createMap(){ \r\n      map = new BMap.Map("map"); \r\n      map.centerAndZoom(new BMap.Point(120.137323,30.232054),12);\r\n    };\r\n    function setMapEvent(){\r\n      map.enableScrollWheelZoom();\r\n      map.enableKeyboard();\r\n      map.enableDragging();\r\n      map.enableDoubleClickZoom()\r\n    };\r\n    function addMapOverlay(){\r\n    };\r\n    //向地图添加控件\r\n    function addMapControl(){\r\n    };\r\n    initMap();\r\n\t\t\t\t\t\t\t\t\t\t\r\n\tfunction mkrToolOpen(){\r\n\t\tvar mkrTool = new BMapLib.MarkerTool(map);\r\n\t\tmkrTool.open();\r\n\t\tvar icon = newMarkIcon(mkrIcon);\r\n\t\tmkrTool.setIcon(icon);\r\n\t\tmkrTool.addEventListener("markend", function(e) {\r\n\t\t\t\tvar mkr = e.marker;\r\n\t\t\t\tmkr.addEventListener("click",addClickHandler);\r\n\t\t\t\taddClickHandler(mkr);\r\n\t\t\t\tcurMkr = mkr;\r\n\t\t});\r\n\t};\r\n\r\n\tfunction newMarkIcon(icon) {\r\n\t\treturn new BMap.Icon(icon, new BMap.Size(22, 32),{\r\n\t\t\t\tanchor: new BMap.Size(10, 30), \r\n\t\t\t\timageOffset: new BMap.Size(0, 0)\r\n\t\t});\r\n\t};\r\n\r\n\tfunction infoHtml(data){\r\n\t\tvar content = \'\';\r\n\t\tcontent += "<table class=\'table-wrap\'>";\r\n\t\tcontent += "<tr>";\r\n\t\tcontent += "<td width=\'40px\'>*名称：</td>";\r\n\t\tcontent += "<td width=\'230px\'><input style=\'width:230px\' type=\'text\' id=\'txtName\' value=\'"+ data.name +"\'></td>";\r\n\t\tcontent += "</tr>";\r\n\t\tcontent += "<tr>";\r\n\t\tcontent += "<td width=\'40px\'>*地址：</td>";\r\n\t\tcontent += "<td width=\'230px\'><input style=\'width:230px\' type=\'text\' id=\'txtAddr\' value=\'"+ data.address +"\'></td>";\r\n\t\tcontent += "</tr>";\r\n\t\tcontent += "<tr>";\r\n\t\tcontent += "<td align=\'right\' colspan=\'2\'>";\r\n\t\tcontent += "<input type=\'button\' name=\'btnOK\' class=\'table-btn\' onclick=\'fnOK()\' value=\'确定\'>";\r\n\t\tcontent += "</td>";\r\n\t\tcontent += "</tr>";\r\n\t\tcontent += "</table>";\r\n\t\treturn content;\r\n\t};\r\n\r\n\tfunction addClickHandler(e){\r\n\t\tvar mkr = e;\r\n\t\tif(e.currentTarget){\r\n\t\t\t\tmkr = e.currentTarget;\r\n\t\t};\r\n\t\tvar data = mkr.data;\r\n\t\tdata.name = mkr.data.name || \'\';\r\n\t\tvar opts = {\r\n\t\t\t\twidth: 300,\r\n\t\t\t\theight: 0,\r\n\t\t\t\toffset:{\r\n\t\t\t\t\t\twidth: -0,\r\n\t\t\t\t\t\theight: -20\r\n\t\t\t\t}\r\n\t\t};\r\n\t\tvar content = infoHtml(data), pt = mkr.getPosition();\r\n\t\tinfoWin = new BMap.InfoWindow(content,opts);\r\n\t\tinfoWin.addEventListener(\'open\',function(){\r\n\t\t});\r\n\t\tmap.openInfoWindow(infoWin,pt);//打开信息窗口\r\n\t};\r\n\r\n\t//提交数据\r\n\tfunction fnOK(){\r\n\t\tvar name = document.getElementById("txtName").value;\r\n\t\tvar addr = document.getElementById("txtAddr").value;\r\n\r\n\t\tif(!name || !addr){\r\n\t\t\t\talert("星号字段必须填写");    \r\n\t\t\t\treturn;\r\n\t\t}\r\n\t\tcurMkr.data.name = name;\r\n\t\tcurMkr.data.addr = addr;\r\n\r\n\t\tif(infoWin.isOpen()){\r\n\t\t\tmap.closeInfoWindow();\r\n\t\t}\r\n\t}\r\n\r\n<\/script>'}});