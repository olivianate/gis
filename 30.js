webpackJsonp([30],{588:function(t,r){t.exports='<!DOCTYPE html>\r\n<html>\r\n\r\n<head>\r\n\t<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\r\n\t<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />\r\n\t<title>地图展示</title>\r\n\t<style type="text/css">\r\n\t\tbody,\r\n\t\thtml {\r\n\t\t\tmargin: 0;\r\n\t\t\theight: 100%;\r\n\t\t\twidth: 100%;\r\n\t\t\tposition: absolute;\r\n\t\t}\r\n\r\n\t\t#main {\r\n\t\t\theight: 100vh;\r\n\t\t\twidth: 100%;\r\n\t\t}\r\n\t</style>\r\n</head>\r\n\r\n<body>\r\n\t<script type="text/javascript" src="https://api.map.baidu.com/api?v=2.0&ak=您的密钥"><\/script>\r\n\t<script src="https://cdn.bootcss.com/echarts/3.8.4/echarts.js"><\/script>\r\n\t<script src="https://cdn.bootcss.com/echarts/3.8.4/extension/bmap.js"><\/script>\r\n\t<script src="https://libs.baidu.com/jquery/1.9.0/jquery.js"><\/script>\r\n\t<div id="main"></div>\r\n</body>\r\n\r\n</html>\r\n<script>\r\n\tvar myChart = echarts.init(document.getElementById(\'main\'));\r\n\tvar option = {\r\n\t\tbackgroundColor: \'#404a59\',\r\n\t\ttooltip: {\r\n\t\t\ttrigger: \'item\'\r\n\t\t},\r\n\t\tbmap: {\r\n\t\t\tcenter: [104.114129, 37.550339],\r\n\t\t\tzoom: 5,\r\n\t\t\troam: true,\r\n\t\t\tmapStyle: {\r\n\t\t\t\tstyleJson: [\r\n\t\t\t\t\t{\r\n\t\t\t\t\t\t"featureType": "all",\r\n\t\t\t\t\t\t"elementType": "geometry",\r\n\t\t\t\t\t\t"stylers": {\r\n\t\t\t\t\t\t\t"hue": "#007fff",\r\n\t\t\t\t\t\t\t"saturation": 89\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t},\r\n\t\t\t\t\t{\r\n\t\t\t\t\t\t"featureType": "water",\r\n\t\t\t\t\t\t"elementType": "all",\r\n\t\t\t\t\t\t"stylers": {\r\n\t\t\t\t\t\t\t"color": "#ffffff"\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t]\r\n\t\t\t}\r\n\t\t}\r\n\t};\r\n\tmyChart.setOption(option, true);\r\n<\/script>'}});