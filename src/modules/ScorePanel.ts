// 引入 Stage 模块
import { default as Stage } from "./Stage";
// 获取 舞台的细分个数
const { scoreEle, levelELe } = Stage;
// 定义 计分盘
class ScorePanel {
  // 分数 和 等级
  score = 0;
  level = 1;
  // 设置等级上限
  private levelRange: number;
  private howUpScore: number;
  private scoreEle: HTMLElement;
  private levelELe: HTMLElement;
  constructor(levelRange: number, howUpScore: number) {
    this.scoreEle = scoreEle;
    this.levelELe = levelELe;
    this.levelRange = levelRange;
    this.howUpScore = howUpScore;
  }
  // 加分
  addScore() {
    // 设置等级上限
    if (this.level > this.levelRange) throw new Error("分数以达到上限~~");
    // 多少升级
    if (this.score % this.howUpScore === 0) this.levelUp();
    this.scoreEle.innerText = `${++this.score}`;
  }
  // 等级
  levelUp() {
    // 设置速度上限
    if (this.level > 5) return;
    this.levelELe.innerText = `${this.level++}`;
  }
  get rankRange() {
    return this.levelRange;
  }
  set setHowUpScore(v: number) {
    this.howUpScore = v;
  }
}
export default ScorePanel;
