// 引入 封装方法
import { default as modules } from "./Modules"
// 引入 Stage 模块
import { default as Stage } from "./Stage"
// 获取随机函数
const { getRandom } = modules
// 获取食物大小 食物元素 舞台个数（舞台大小/食物大小）
const { SnakeFoodSizeX, SnakeFoodSizeY,
  food, stageEnumX, stageEnumY } = Stage
// 定义食物
class Food {
  element: HTMLElement
  constructor() {
    this.element = food
  }
  // 获取食物 x 位置
  get X() {
    return this.element.offsetLeft
  }
  // 获取食物 x 位置
  get Y() {
    return this.element.offsetTop
  }
  change() {
    // 随机位置 先随机 0-舞台个数的数字 再乘以食物的大小
    // 舞台范围随机 按自身大小 格子分布
    // 个数减一 防止进墙壁
    const X = `${getRandom(stageEnumX - 1, 0) * SnakeFoodSizeX}px`
    const Y = `${getRandom(stageEnumY - 1, 0) * SnakeFoodSizeY}px`
    // 改变food 位置
    this.element.style.left = X
    this.element.style.top = Y
  }
}
export default Food