class Error1 {
  constructor(img, textBefore30s, textAfter30s) {
    this.img = img;
    this.textBefore30s = textBefore30s;
    this.textAfter30s = textAfter30s;
    this.animationSpeed = 20;
    this.isVisible = true;
    this.startTime = millis();
    this.resize();
  }

  resize() {
    this.w = width * 0.3;
    this.h = this.w * (this.img.height / this.img.width);
    this.x = width - this.w;
    this.targetY = height - this.h;
    this.y = height + 50;

    this.isVisible = true;
    this.startTime = millis();
  }

  display() {
    if (!this.isVisible) return;

    const elapsed = millis() - this.startTime;

    // 30초 지나면 숨기기
    if (elapsed > 25000) {
      this.isVisible = false;
      return;
    }

    // 애니메이션 이동
    if (this.y > this.targetY) {
      this.y -= this.animationSpeed;
      if (this.y < this.targetY) this.y = this.targetY;
    }

    // 이미지 그리기
    image(this.img, this.x, this.y, this.w, this.h);

    // 텍스트 박스
   // 텍스트 박스 배경 그리기 (반투명 흰색 사각형)
// 텍스트 박스 배경 그리기 (반투명 흰색 사각형)
push();
noStroke();

let boxWidth = this.w * 1;

// 30초 이전 텍스트가 길어서 충분히 크게 잡음
let fontSize = this.h * 0.07;      // 글자 크기
let lineCount = 8;                 // 예상 최대 줄 수
let lineSpacing = 1.3;             // 줄 간격 배수
let boxHeight = fontSize * lineCount * lineSpacing;

let boxX = this.x + this.w * 0.05;
let boxY = this.y + this.h * 0.2;

fill(elapsed > 20000 ? 'red' : 0);  // 20초 이후엔 빨간색, 아니면 검정색
textAlign(LEFT, TOP);
textSize(fontSize);
textLeading(fontSize * lineSpacing);

let displayText = (elapsed > 20000) ? this.textAfter30s : this.textBefore30s;

// 글자가 영역 밖으로 넘지 않도록 최대 높이도 충분히 크게 지정
text(displayText, boxX + 10, boxY + 10, boxWidth - 20, boxHeight - 20);
pop();



  }

  isClicked(mx, my) {
    return this.isVisible &&
           mx >= this.x && mx <= this.x + this.w &&
           my >= this.y && my <= this.y + this.h;
  }
}
