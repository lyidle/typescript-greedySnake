// 随机函数
function getRandom(max: number, min: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
// 封装 和 避免 getComputedStyle 可能引起的重排
function getStyles(ele: HTMLElement) {
  const arr: string[] = ['border', 'padding']
  let data: any = {}
  arr.forEach(v => {
    data[v] = parseFloat((getComputedStyle(ele) as any)[v])
  })
  return data
}
export default{
  getStyles,
  getRandom,
}