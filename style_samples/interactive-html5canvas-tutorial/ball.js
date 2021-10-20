export class Ball {
  constructor(stageWidth, stageHeight, radius, speed) {
    this.radius = radius;
    this.vx = speed;
    this.vy = speed;

    const diameter = this.radius * 2;
    this.x = this.radius + (Math.random() * stageWidth - diameter);
    this.y = this.radius + (Math.random() * stageHeight - diameter);
  }

  draw(ctx, stageWidth, stageHeight, block) {
    this.x += this.vx;
    this.y += this.vy;

    this.bounceWindow(stageWidth, stageHeight);

    this.bounceBlock(block);

    ctx.fillStyle = '#FDD700'
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  bounceWindow(stageWidth, stageHeight) { // 공이 화면 모서리에 닿으면 반대로 움직이게 하는 함수
    const minX = this.radius; // x, y 좌표의 최소값 최대값은 반지름 길이를 고려해야 함
    const maxX = stageWidth - this.radius;
    const minY = this.radius;
    const maxY = stageHeight - this.radius;

    // 방향전환 조건문
    if (this.x <= minX || this.x >= maxX) { // x 가 최소, 최대값 범위 밖이면 vx 에 -1 을 곱함 '||' 은 or 연산자
      this.vx *= -1;
      this.x += this.vx;
    } else if (this.y <= minY || this.y >= maxY) { // y 가 최소, 최대값 범위 밖이면 vy에 -1을 곱함
      this.vy *= -1;
      this.y += this.vy;
    }
  }

  bounceBlock(block) {
    const minX = block.x - this.radius;
    const maxX = block.maxX + this.radius;
    const minY = block.y - this.radius;
    const maxY = block.maxY + this.radius;

    if (this.x > minX && this.x < maxX && this.y > minY && this.y < maxY) { // x 가 최소, 최대값 범위 밖이면 vx 에 -1 을 곱함 '||' 은 or 연산자
      const x1 = Math.abs(minX- this.x);
      const x2 = Math.abs(this.x - maxX);
      const y1 = Math.abs(minY - this.y);
      const y2 = Math.abs(this.y - maxY);
      const min1 = Math.min(x1, x2);
      const min2 = Math.min(y1, y2);
      const min = Math.min(min1, min2);

      if (min === min1) {
        this.vx *= -1;
        this.x += this.vx;
      } else if (min == min2) {
        this.vy *= -1;
        this.y += this.vy;
      }
    }
  }
}
