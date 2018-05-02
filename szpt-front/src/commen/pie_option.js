export default {
    title: {
        text: ''
    },
    color: ['#bb3127',
        '#45a63b',
        '#2e6ccf',
        '#c0c540',
        '#c25721',
        '#99cc33'
    ],
    tooltip: {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
    },
    // tooltip: {
    //     trigger: 'item',
    //     formatter: "{a} <br/>{b} : {c} ({d}%)"
    // },
    legend: {
        orient: 'vertical',
        left: '10px',
        top: 'center',
        itemGap: 40,
        itemHeight: 25,
        textStyle: {
            color: '#fff',
            fontSize: 14
        },
        data: ['基础设施', '设备采购', '日常教育经费', '师资队伍建设', '其他支出总额']
    },
    series: [{
        type: 'pie',
        radius: '80%',
        center: ['65%', '50%'],
        label: { // 饼图图形上的文本标签
            normal: {
                show: true,
                position: 'outer', // 标签的位置
                textStyle: {
                    fontWeight: 500,
                    fontSize: 16 // 文字的字体大小
                },
                formatter: '{b} \n{d}%'
            }
        },
        // selectedMode: 'single',
        data: [
            { value: 1548, name: '基础设施' },
            { value: 535, name: '设备采购' },
            { value: 510, name: '日常教育经费' },
            { value: 634, name: '师资队伍建设' },
            { value: 735, name: '其他支出总额' }
        ],
        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
}