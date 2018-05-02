export default { 
  title: { text: " " },
  tooltip: {},
  legend: {
    orient: "vertical",
    x: "left"
    // data: ["iphoneX"]
  },
  series: [
    {
      // name: "iphoneX",
      type: "map",
      mapType: "china",
      roam: false,
      zoom: 1.2,
      itemStyle: {
        normal: {
          label: { show: true },
          areaColor: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#291FA6" // 0% 处的颜色
              },
              {
                offset: 1,
                color: "#5B179E" // 100% 处的颜色
              }
            ],
            globalCoord: false // 缺省为 false
          }
        }
      },
      data: [
        { name: "北京", value: Math.round(Math.random() * 1000) },
        { name: "天津", value: Math.round(Math.random() * 1000) },
        { name: "上海", value: Math.round(Math.random() * 1000) },
        { name: "重庆", value: Math.round(Math.random() * 1000) },
        { name: "河北", value: Math.round(Math.random() * 1000) },
        { name: "河南", value: Math.round(Math.random() * 1000) },
        { name: "云南", value: Math.round(Math.random() * 1000) },
        { name: "辽宁", value: Math.round(Math.random() * 1000) },
        { name: "黑龙江", value: Math.round(Math.random() * 1000) },
        { name: "湖南", value: Math.round(Math.random() * 1000) },
        { name: "安徽", value: Math.round(Math.random() * 1000) },
        { name: "山东", value: Math.round(Math.random() * 1000) },
        { name: "新疆", value: Math.round(Math.random() * 1000) },
        { name: "江苏", value: Math.round(Math.random() * 1000) },
        { name: "浙江", value: Math.round(Math.random() * 1000) },
        { name: "江西", value: Math.round(Math.random() * 1000) },
        { name: "湖北", value: Math.round(Math.random() * 1000) },
        { name: "广西", value: Math.round(Math.random() * 1000) },
        { name: "甘肃", value: Math.round(Math.random() * 1000) },
        { name: "山西", value: Math.round(Math.random() * 1000) },
        { name: "内蒙古", value: Math.round(Math.random() * 1000) },
        { name: "陕西", value: Math.round(Math.random() * 1000) },
        { name: "吉林", value: Math.round(Math.random() * 1000) },
        { name: "福建", value: Math.round(Math.random() * 1000) },
        { name: "贵州", value: Math.round(Math.random() * 1000) },
        { name: "广东", value: Math.round(Math.random() * 1000) },
        { name: "青海", value: Math.round(Math.random() * 1000) },
        { name: "西藏", value: Math.round(Math.random() * 1000) },
        { name: "四川", value: Math.round(Math.random() * 1000) },
        { name: "宁夏", value: Math.round(Math.random() * 1000) },
        { name: "海南", value: Math.round(Math.random() * 1000) },
        { name: "台湾", value: Math.round(Math.random() * 1000) },
        { name: "香港", value: Math.round(Math.random() * 1000) },
        { name: "澳门", value: Math.round(Math.random() * 1000) }
      ]
    }
  ]

}