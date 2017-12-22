export default {
  data: {
    tool: [
      {
        key: "tool1",
        title: "点、路线、区域",
        page: [
          {
            name: "drawmarker",
            icon: "drawmarker",
            title: "绘制点",
            parent: "tool1"
          },
          {
            name: "drawpolyline",
            icon: "drawpolyline",
            title: "绘制折线",
            parent: "tool1"
          },
          {
            name: "drawpolygon",
            icon: "drawpolygon",
            title: "绘制区域",
            parent: "tool1"
          }
        ]
      },
      {
        key: "tool2",
        title: "路线规划",
        page: [
          {
            name: "drawline",
            icon: "drawline",
            title: "驾车路线",
            parent: "tool2"
          }
        ]
      }
    ],
    component: [
      {
        key: "sub1",
        title: "地图显示",
        page: [
          {
            name: "scaleControl",
            icon: "scaleControl",
            title: "地图级别和比例尺关系",
            parent: "sub1"
          },
          {
            name: "getCity",
            icon: "getCity",
            title: "获取地图当前所在的行政区",
            parent: "sub1"
          },
          {
            name: "setCursor",
            icon: "setCursor",
            title: "设置鼠标样式",
            parent: "sub1"
          }
        ]
      },
      {
        key: "sub2",
        title: "点线面",
        page: [
          // {
          //   name: "overlay",
          //   icon: "overlay",
          //   title: "自定义覆盖物",
          //   parent: "sub2"
          // },
          {
            name: "marker",
            icon: "marker",
            title: "创建点",
            parent: "sub2"
          },
          {
            name: "polygonCenter",
            icon: "polygonCenter",
            title: "获取多边形中心点",
            parent: "sub2"
          },
          {
            name: "drawing",
            icon: "drawing",
            title: "创建多边形,圆",
            parent: "sub2"
          }
        ]
      },
      {
        key: "sub3",
        title: "信息窗口",
        page: [
          {
            name: "infoWindow",
            icon: "infoWindow",
            title: "信息窗口皮肤设置",
            parent: "sub3"
          }
        ]
      },
      {
        key: "sub4",
        title: "驾车路线规划",
        page: [
          {
            name: "policy",
            icon: "policy",
            title: "驾车策略比对",
            parent: "sub4"
          },
          {
            name: "drivingRoute",
            icon: "drivingRoute",
            title: "驾车起终点/途径点",
            parent: "sub4"
          }
        ]
      },
      {
        key: "sub5",
        title: "坐标转换",
        page: [
          {
            name: "convertor",
            icon: "convertor",
            title: "坐标转换",
            parent: "sub5"
          }
        ]
      },
      {
        key: "sub6",
        title: "echarts数据可视化",
        page: [
          {
            name: "echartsProvince",
            icon: "echartsProvince",
            title: "底图编辑",
            parent: "sub6"
          }
        ]
      }
    ]
  }
};
