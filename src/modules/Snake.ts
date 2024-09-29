// 引入 Stage 模块
import { default as Stage } from "./Stage";
// 获取 信息
const {
  stageWidth,
  stageHeight,
  SnakeFoodSizeX,
  SnakeFoodSizeY,
  snake,
  head,
  bodies,
  maxBodies,
} = Stage;
class Snake {
  container: HTMLElement;
  private head: HTMLElement;
  private bodies: HTMLCollectionOf<HTMLDivElement>;
  private during!: number;
  constructor() {
    this.container = snake;
    // 蛇头部
    this.head = head;
    this.bodies = bodies;
  }
  // 获取蛇的坐标 X
  get X() {
    return this.head.offsetLeft;
  }
  // 获取蛇的坐标 Y
  get Y() {
    return this.head.offsetTop;
  }
  // 设置蛇的坐标 X
  set X(v: number) {
    // 如果新值和旧值一样退出
    if (this.X === v) return;
    // 撞墙死亡
    if (v < 0 || v > stageWidth - SnakeFoodSizeX) {
      throw new Error("蛇撞墙死了~~");
    }
    // 禁止掉头
    // 判断有没有 身体
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === v) {
      // 如果发生了掉头，让蛇向反方向继续移动
      if (v > this.X) {
        // 如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走 减去自身大小
        v = this.X - this.size;
      } else {
        // 向左走
        v = this.X + this.size;
      }
    }
    // 移动身体
    this.moveBody();
    this.head.style.left = `${v}px`;
    // 监测身体是否相撞
    this.checkCrash();
  }
  // 设置蛇的坐标 Y
  set Y(v: number) {
    // 如果新值和旧值一样退出
    if (this.Y === v) return;
    // 撞墙死亡
    if (v < 0 || v > stageHeight - SnakeFoodSizeY) {
      throw new Error("蛇撞墙死了~~");
    }
    // 禁止掉头
    // 判断有没有 身体
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === v) {
      // 如果发生了掉头，让蛇向反方向继续移动
      if (v > this.Y) {
        // 如果新值value大于旧值X，则说明蛇在向右走，此时发生掉头，应该使蛇继续向左走 减去自身大小
        v = this.Y - this.size;
      } else {
        // 向左走
        v = this.Y + this.size;
      }
    }
    // 移动身体
    this.moveBody();
    this.head.style.top = `${v}px`;
    // 监测身体是否相撞
    this.checkCrash();
  }
  // 获取蛇大小
  get size() {
    return this.head.offsetWidth;
  }
  // 获取速度
  get speed() {
    return this.during;
  }
  // 设置速度
  set speed(v: number) {
    if (this.during === v) return;
    this.during = v;
  }
  // 蛇增长
  addBody() {
    if (this.bodies.length >= maxBodies) throw new Error("你赢了");
    // 在容器中 最后增加个 div
    const div = document.createElement("div");
    div.className = "snakes";
    div.style.left = this.head.style.left;
    div.style.top = this.head.style.top;
    this.container.appendChild(div);
    // this.container.insertAdjacentHTML("beforeend","<div></div>")
  }
  // 蛇移动
  moveBody() {
    /* 
        将后边的身体设置为前边身体的位置
        举例子：
        第4节 = 第3节的位置
        第3节 = 第2节的位置
        第2节 = 蛇头的位置
    */
    // 遍历获取所有的身体 除了头部
    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前一个的位置值
      const preX = this.bodies[i - 1].offsetLeft;
      const preY = this.bodies[i - 1].offsetTop;
      // 将前一个设置到当前的位置上
      this.bodies[i].style.left = preX + "px";
      this.bodies[i].style.top = preY + "px";
    }
  }
  checkCrash() {
    for (let i = 1; i < this.bodies.length; i++) {
      const bd = this.bodies[i];
      // 判断蛇头是否和身体相撞
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        throw new Error("身体相撞了~~");
      }
    }
  }
}
export default Snake;
