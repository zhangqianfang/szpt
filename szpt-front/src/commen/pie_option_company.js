export default {
    title: {
        text: ''
    },
   color:['#bb3127','#45a63b','#1344a5'],
  tooltip: {
      trigger: 'item',
      formatter: "{b} : {c} ({d}%)"
  },
  legend: {
        orient: 'vertical',
        left: '10px',
        top: 'center',
        itemGap:40,
        itemHeight:25,
        textStyle: {
            color: '#fff',
            fontSize:14
        },
        data: ['满意或基本满意人数', '一般满意人数', '不满意人数']
    },
    series: [
        {
            type: 'pie',
            radius: '80%',
            center: ['65%', '50%'],
            // selectedMode: 'single',
            data: [
                { value: 1548, name: '满意或基本满意' },
                { value: 535, name: '一般满意' },
                { value: 510, name: '不满意' }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}
