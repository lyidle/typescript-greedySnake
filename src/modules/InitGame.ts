export default function MapInit() {
  const snake = document.createElement("div");
  const food = document.createDocumentFragment();
  food.appendChild(document.createElement("div"));
  food.appendChild(document.createElement("div"));
  food.appendChild(document.createElement("div"));
  food.appendChild(document.createElement("div"));
  const gamePanel = document.querySelector(".gamePanel");
  gamePanel?.querySelector(".main>.stage>.snake")?.appendChild(snake);
  gamePanel?.querySelector(".main>.stage>.food")?.appendChild(food);
}
