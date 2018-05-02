import * as echarts from 'echarts';
let color1=new echarts.graphic.LinearGradient(
  0, 0, 0, 1,
  [
    {offset: 0, color: '#1AC3F1'},
    {offset: 0.5, color: '#1385D7'},
    {offset: 1, color: '#0E51C2'}
  ]
)
let color2=new echarts.graphic.LinearGradient(
  0, 0, 0, 1,
  [
    {offset: 0, color: '#C52591'},
    {offset: 0.5, color: '#981E97'},
    {offset: 1, color: '#6A169C'}
  ]
)
let color3=new echarts.graphic.LinearGradient(
  0, 0, 0, 1,
  [
    {offset: 0, color: '#C0BF3D'},
    {offset: 0.5, color: '#BFA431'},
    {offset: 1, color: '#BD7E21'}
  ]
)
let color4=new echarts.graphic.LinearGradient(
  0, 0, 0, 1,
  [
    {offset: 0, color: '#2EF22E'},
    {offset: 0.5, color: '#1DBF1D'},
    {offset: 1, color: '#077B07'}
  ]
)
export {
  color1,
  color2,
  color3,
  color4
}
