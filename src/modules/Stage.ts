// 引入 封装方法
import { default as modules } from "./Modules";
// 引入封装方法
const { getStyles } = modules;
// 获取元素
const stage = <HTMLElement>document.querySelector(".gamePanel>.main>.stage");
const food = <HTMLElement>stage.querySelector(".food");
const snake = <HTMLElement>stage.querySelector(".snake");
const scoreEle = <HTMLElement>(
  document.querySelector(".gamePanel .score-panel .score")
);
const levelELe = <HTMLElement>(
  document.querySelector(".gamePanel .score-panel .level")
);
// 蛇头部
const head = <HTMLElement>document.querySelector(".gamePanel .snake>div");
const bodies = snake?.getElementsByTagName("div");
// 获取btn
const btn = <HTMLElement>document.querySelector(".gamePanel>.footer");
// 获取stage 的border 和padding
const { border: stageBorder, padding: stagePadding } = getStyles(stage);
// 计算 stage 大小
const stageWidth = stage.offsetWidth - (stageBorder * 2 + stagePadding * 2);
const stageHeight = stage.offsetHeight - (stageBorder * 2 + stagePadding * 2);
// 获取蛇和食物的大小
const SnakeFoodSizeX = food.offsetWidth;
const SnakeFoodSizeY = food.offsetHeight;
// 获取水平和垂直个数 蛇和食物一样的
const stageEnumX = Math.floor(stageWidth / SnakeFoodSizeX);
const stageEnumY = Math.floor(stageHeight / SnakeFoodSizeY);
// 设置舞台大小 和蛇的大小成比例
const stageSizeX = stageEnumX * SnakeFoodSizeX;
const stageSizeY = stageEnumY * SnakeFoodSizeY;
stage.style.width = `${stageSizeX}px`;
stage.style.height = `${stageSizeY}px`;
// 获取最大多少个身体
const maxBodies = stageEnumX * stageEnumY - 1;
export default {
  // 水平和垂直个数
  stageEnumX,
  stageEnumY,
  // 蛇和食物的大小
  SnakeFoodSizeX,
  SnakeFoodSizeY,
  // 食物
  food,
  // 舞台大小
  stageWidth: stageSizeX,
  stageHeight: stageSizeY,
  // 蛇最大多少个身体
  maxBodies,
  // 元素获取
  snake,
  scoreEle,
  levelELe,
  head,
  bodies,
  btn,
};
