export default {
  data: [{
    key: 'tool1',
    title: '点、路线、区域',
    page: [
      {
        name: 'drawmarker',
        icon: 'drawmarker',
        title: '绘制点',
        parent: 'tool1',
      },
      {
        name: 'drawpolyline',
        icon: 'drawpolyline',
        title: '绘制折线',
        parent: 'tool1',
      },
      {
        name: 'drawpolygon',
        icon: 'drawpolygon',
        title: '绘制区域',
        parent: 'tool1',
      }],
  },{
    key: 'tool2',
    title: '坐标转换',
    page: [
      {
        name: 'convertor',
        icon: 'convertor',
        title: '坐标转换',
        parent: 'tool2',
      }],
  }],
};
