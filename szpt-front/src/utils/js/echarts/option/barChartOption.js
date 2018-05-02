export default {
  title: {
    text: '学校数（单位：所）',
    top: 20,
    left: 80,
    textStyle: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: 400
    }
  },
  xAxis: {
    type: 'category',
    axisLabel: {
      textStyle: { color: '#fff', fontSize: 14 }
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(42, 95, 207, 1)',
        width: 1
      }
    },
    data: []
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      textStyle: { color: '#fff', fontSize: 18 }
    },
    axisLine: {
      lineStyle: {
        color: 'rgba(42, 95, 207, 1)',
        width: 1
      }
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: ['#24378e'],
        width: 1,
        type: 'solid'
      }
    }
  },
  label: {
    normal: {
      show: true,
      position: 'top', // 标签的位置
      textStyle: { color: '#fff', fontSize: 14 }, // 文字的字体大小
      formatter: '{c}'
    }
  },
  opinionData: []
}
