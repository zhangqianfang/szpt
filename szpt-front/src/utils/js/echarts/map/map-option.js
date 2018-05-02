export default {
  tooltip: {
    trigger: 'item',
    formatter: '{b}'
  },
  aspectScale: 1,
  layoutCenter: ['50%', '50%'],
  layoutSize: 640,
  series: [{
    type: 'map',
    map: '',
    selectedMode: 'single',
    mapLocation: {
      x: 'center',
      y: 'center'
    },
    label: {
      normal: {
        show: true,
        textStyle: {
          color: '#8e4f1a' // 正常字体颜色
        }
      },
      emphasis: {
        show: true,
        textStyle: {
          color: '#8e4f1a' // 鼠标悬浮时颜色
        }
      }
    },
    itemStyle: {
      normal: {
        label: {show: true},
        borderWidth: 1, // 区域的边框宽度
        borderColor: '#fbf0ee', // 区域的边框颜色
        areaColor: '#1e28a8' // 设置地图背景色的颜色设置
      },
      emphasis: {
        label: {show: true},
        areaColor: '#ffc000' // 设置选中地图背景色的颜色设置
      }
    }
  }]
}
