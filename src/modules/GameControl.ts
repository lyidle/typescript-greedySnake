// 引入 其他 类
import Food from "./Food";
import ScorePanel from "./ScorePanel";
import Snake from "./Snake";
// 引入 Stage 模块
import { default as Stage } from "./Stage";

// 获取 舞台的细分个数
const { btn, food, snake, maxBodies } = Stage;
class GameCOntrol {
  // 定义三个属性 Food Snake ScorePanel
  private snake: Snake;
  private food: Food;
  private scorePanel: ScorePanel;
  // 获得蛇的大小
  private size: number;
  // 创建一个属性来存储蛇的移动方向（也就是按键的方向）
  private direction: string = "ArrowRight";
  // 创建一个属性用来记录 蛇是否死亡
  private isLive: boolean = true;
  private isStart: boolean = false;
  // 设置等级上限  多少分升一级
  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    const levelRange = maxBodies;
    const howUpScore = 1;
    // 初始分数 并给默认值
    this.scorePanel = new ScorePanel(levelRange, howUpScore);
    // 设置蛇的大小
    this.size = this.snake.size;
    // 设置过渡和速度
    this.snake.speed = 300 - (this.scorePanel.level - 1) * 30;
    const head = snake.querySelector("div");
    head!.style.opacity = "0";
    // 监听是否点击开始游戏
    btn?.querySelector(".start")?.addEventListener("click", () => {
      food.style.opacity = "1";
      head!.style.opacity = "1";
      this.isStart = true;
      GameCOntrol.init(this);
    });
    btn?.querySelector(".finish")?.addEventListener("click", (e) => {
      this.isLive = false;
      alert("游戏结束，请刷新重新开始！！");
    });
    const _this = this;
    btn?.querySelector(".setSpeed")?.addEventListener("click", setLevel);
    function setLevel(e: any) {
      let promptFlag = true;
      let result;
      while (promptFlag) {
        result = parseInt(prompt("请输入一个整数")!);
        if (result && result > 0) promptFlag = false;
      }
      _this.scorePanel.setHowUpScore = result!;
    }
  }
  // 游戏初始化  游戏开始
  static init(_this: any) {
    if (!_this.isStart) return;
    if (!_this.isLive) return;
    // 食物位置初始化
    _this.food.change();
    // 调用 run 方法,使蛇移动
    _this.run();
    // 判定键盘按下事件
    document.addEventListener("keydown", _this.keydownHandler);
  }
  // 创建鼠标按下函数
  keydownHandler = (event: KeyboardEvent) => {
    // 限制 user 按键值是否合法
    let direct = "";
    switch (event.key) {
      case "ArrowUp":
        direct = "ArrowUp";
        break;
      case "ArrowDown":
        direct = "ArrowDown";
        break;
      case "ArrowLeft":
        direct = "ArrowLeft";
        break;
      case "ArrowRight":
        direct = "ArrowRight";
        break;
      default:
        direct = this.direction;
        break;
    }
    // 修改 direction 的属性
    this.direction = direct;
  };
  run = () => {
    /* 
      根据方向（this.direction）来使蛇的位置改变
      向上 top 减少
      向下 top 增加
      向左 left 减少
      向右 Left 增加
    */
    //  获取蛇现在坐标
    let X = this.snake.X;
    let Y = this.snake.Y;
    // 根据按键修改 X 和 Y
    switch (this.direction) {
      case "ArrowUp":
        Y -= this.size;
        break;
      case "ArrowDown":
        Y += this.size;
        break;
      case "ArrowLeft":
        X -= this.size;
        break;
      case "ArrowRight":
        X += this.size;
        break;
    }
    // 监测蛇是否吃到食物
    this.checkEat(X, Y);
    try {
      // 修改 X 和 Y
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e) {
      // 进入到catch，说明出现了异常，游戏结束，弹出一个提示信息
      alert(e);
      this.isLive = false;
    }
    // 存活时自我回调
    this.isLive && setTimeout(this.run, this.snake.speed);
  };
  // 监测蛇是否吃到食物
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      // 食物位置重置
      this.food.change();
      try {
        // 分数增加
        this.scorePanel.addScore();
      } catch (e) {
        alert(e);
      }
      try {
        // 蛇身体增加
        this.snake.addBody();
      } catch (e) {
        // 超出限制胜利
        this.isLive = false;
        setTimeout(() => {
          alert(e);
        }, this.snake.speed);
      }
      // 设置过渡和速度
      this.snake.speed = 300 - (this.scorePanel.level - 1) * 30;
    }
  }
}
export default GameCOntrol;
