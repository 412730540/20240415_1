let p = ["#7e7f83", "#d9c5b2"];
let bg = ["#f3f3f4"];
let score = 0; // 記錄碰到邊緣的次數
let scoredFlowers = new Set(); // 用來記錄已經得分的花朵

let flowers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(bg);

  let cols = floor(width / 100); // 計算列數
  let rows = floor(height / 120); // 計算行數
  let w = width / cols;
  let h = height / rows;

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let x = i * w + w / 2;
      let y = j * h + h / 2;

      let d = min(w, h) * 1.2; // 將直徑增大為格子寬高的 80%
      let c = random(p);

      let flower = new Flower(x, y, d, c);
      flowers.push(flower);
    }
  }

  // 在左上角新增記分板
  textAlign(LEFT, TOP);
  textSize(20);
  fill(0);
  rect(10, 10, 180, 40); // 白色背景
  fill(255);
  text("你現在的分數: " + score, 20, 20);
}

function draw() {
  background(bg);

  for (let flower of flowers) {
    flower.move();
    flower.display();

    // 檢查是否碰到螢幕邊緣且尚未得過分
    if (flower.checkBoundary() && !scoredFlowers.has(flower)) {
      score++; // 若碰到邊緣且尚未得過分，分數加 1
      scoredFlowers.add(flower); // 將此花朵加入已得分的集合中
    }
  }

  // 更新記分板顯示
  fill(0);
  rect(10, 10, 180, 40); // 白色背景
  fill(255);
  text("你現在的分數: " + score, 20, 20);
}

class Flower {
  constructor(x, y, diameter, color) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.color = color;
    this.speedX = random(-2, 2); // x 方向的初始速度
    this.speedY = random(-2, 2); // y 方向的初始速度
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  // 檢查是否碰到螢幕邊緣
  checkBoundary() {
    if (
      this.x <= this.diameter / 2 ||
      this.x >= width - this.diameter / 2 ||
      this.y <= this.diameter / 2 ||
      this.y >= height - this.diameter / 2
    ) {
      return true;
    } else {
      return false;
    }
  }

  display() {
    let d = this.diameter;
    let c = this.color;

    push();
    translate(this.x, this.y);

    strokeWeight(d / 8); // 將線條寬度減小為直徑的 1/8
    stroke(c);
    noFill();
    arc(0, d / 3, d * 0.8, d * 0.8, 190, 350);
    arc(0, d / 4, d, d * 0.9, 200, 340);
    arc(0, d / 5, d * 1.2, d * 1.1, 210, 330);

    noStroke();
    fill(c);
    ellipse(0, 0, d * 0.8, d * 0.8); // 中心圓圈變小

    fill("#34312d");
    circle(-d / 4, -d / 50, d / 15); // 將眼睛變小
    circle(d / 4, -d / 50, d / 15);

    fill("#34312d");
    ellipse(0, d / 15, d / 3, d / 3); // 將鼻子變小

    pop();
  }
}
