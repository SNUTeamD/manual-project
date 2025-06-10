class Error1 {
  constructor(img, textBefore30s, textAfter30s) {
    this.img = img;
    this.textBefore30s = textBefore30s;
    this.textAfter30s = textAfter30s;
    this.animationSpeed = 20;
    this.isVisible = false;
    this.isReady = false;
  }

  start() {
    this.isVisible = true;
    // 이미지가 준비되었으면 바로 세팅, 아니면 준비 대기
    if (this.img.width > 0 && this.img.height > 0) {
      this.setSizes();
      this.isReady = true;
      this.startTime = millis();  // 이미지 준비 후 시간 초기화
    } else {
      this.waitForImage();
    }
    this.y = height + 50;  // 초기 위치 설정 (아래)
  }

  waitForImage() {
    // p5 draw에서 체크하게 하려면 flag만 설정하고 draw 쪽에서 확인해도 됩니다.
    let check = setInterval(() => {
      if (this.img.width > 0 && this.img.height > 0) {
        clearInterval(check);
        this.setSizes();
        this.isReady = true;
        this.startTime = millis();
      }
    }, 50);
  }

  setSizes() {
    this.w = width * 0.3;
    this.h = this.w * (this.img.height / this.img.width);
    this.x = width - this.w;
    this.targetY = height - this.h;
  }

  display() {
    if (!this.isVisible || !this.isReady) return;

    let elapsed = millis() - this.startTime;

    if (elapsed > 25000) {
      this.isVisible = false;
      return;
    }

    if (this.y > this.targetY) {
      this.y -= this.animationSpeed;
      if (this.y < this.targetY) this.y = this.targetY;
    }

    image(this.img, this.x, this.y, this.w, this.h);

    push();
    noStroke();

    let boxWidth = this.w;
    let fontSize = this.h * 0.07;
    let lineCount = 8;
    let lineSpacing = 1.3;
    let boxHeight = fontSize * lineCount * lineSpacing;

    let boxX = this.x + this.w * 0.05;
    let boxY = this.y + this.h * 0.2;

    fill(elapsed > 10000 ? 'red' : 0);
    textAlign(LEFT, TOP);
    textSize(fontSize);
    textLeading(fontSize * lineSpacing);

    let displayText = (elapsed > 10000) ? this.textAfter30s : this.textBefore30s;
    text(displayText, boxX + 10, boxY + 10, boxWidth - 20, boxHeight - 20);

    pop();
  }

  isClicked(mx, my) {
    return this.isVisible &&
           mx >= this.x && mx <= this.x + this.w &&
           my >= this.y && my <= this.y + this.h;
  }
}
