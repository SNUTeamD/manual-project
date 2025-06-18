class ErrorWindow {
  constructor(img, relX, relY, relW, text, highlightChars = []) {
    this.img = img;
    this.relX = relX;
    this.relY = relY;
    this.relW = relW;
    this.text = text;
    this.highlightChars = highlightChars;
    this.alpha = 0;
    this.fadeSpeed = 30;
    this.playedSound = false; // ✅ 사운드 재생 여부 체크
    this.resize();
    
    this.playSoundOnce(); // ✅ 생성 시 사운드 재생
  }

playSoundOnce() {
  if (!this.playedSound && errorSound && errorSound.isLoaded()) {
    errorSound.setVolume(1);  // 원하는 크기로 조절 
    errorSound.play();
    this.playedSound = true;
  }
}

  resize() {
    this.w = width * this.relW;
    this.h = this.w * (this.img.height / this.img.width);
    this.x = width * this.relX;
    this.y = height * this.relY;

    if (this.x + this.w > width) this.x = width - this.w;
    if (this.y + this.h > height) this.y = height - this.h;

    this.xBtnSize = this.w * 0.1;
    this.xBtnX = this.x + this.w - this.xBtnSize - 10;
    this.xBtnY = this.y + this.h - this.xBtnSize - 10;

    this.detailBtnW = this.w * 0.25;  // 너비는 이미지 너비의 25%
    this.detailBtnH = this.xBtnSize; // 높이는 X버튼과 같게
    this.detailBtnX = this.xBtnX - this.detailBtnW - 10; // X버튼 왼쪽에 위치
    this.detailBtnY = this.xBtnY;

  }

  display() {

    //효과음
    this.playSoundOnce();

    // ✨ 페이드 인 효과
    if (this.alpha < 255) {
      this.alpha += this.fadeSpeed;
    }

    push();
    tint(255, this.alpha);
    image(this.img, this.x, this.y, this.w, this.h);
    pop();

    // 텍스트 표시
    // 텍스트 표시 (두 줄 처리 + 마지막 글자 빨간색)
    // 텍스트 표시 (두 줄 처리 + 각 줄 마지막 글자 빨간색)
push();
textAlign(LEFT, CENTER);
textSize(this.w * 0.04);
textLeading(this.w * 0.06);  // 줄 간격

let lines = this.text.split("/");  // 🔄 '/'로 줄 나눔
let centerX = this.x + this.w / 2;
let centerY = this.y + this.h * 0.25;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  if (line.length === 0) continue;

  let centerX = this.x + this.w / 2;
  let yOffset = i * this.w * 0.06;
  let startX = centerX - textWidth(line) / 2;
  let x = startX;

  for (let j = 0; j < line.length; j++) {
    let ch = line[j];
    let w = textWidth(ch);

    // 🔴 강조할 문자일 경우 빨간색
    if (this.highlightChars.includes(ch)) {
      fill(255, 0, 0, this.alpha);
    } else {
      fill(0, this.alpha);
    }

    text(ch, x, centerY + yOffset);
    x += w;
  }
}
  pop();




    // ✨ X 버튼 마우스 오버 효과
    let xHover = this.isXBtnClicked(mouseX, mouseY);
    let xBtnAlpha = xHover ? this.alpha * 0.7 : this.alpha;

    fill(255, 0, 0, xBtnAlpha);
    noStroke();
    rect(this.xBtnX, this.xBtnY, this.xBtnSize, this.xBtnSize, 5);

    stroke(255, xBtnAlpha);
   strokeWeight(3);
   line(this.xBtnX + 5, this.xBtnY + 5, this.xBtnX + this.xBtnSize - 5, this.xBtnY + this.xBtnSize - 5);
   line(this.xBtnX + this.xBtnSize - 5, this.xBtnY + 5, this.xBtnX + 5, this.xBtnY + this.xBtnSize - 5);
   noStroke();


    // 🔵 자세히보기 버튼 마우스 오버 효과
  let detailHover = this.isDetailBtnClicked(mouseX, mouseY);
  let minAlpha = 50;  // 최소 투명도 보장
  let detailAlpha = detailHover ? max(this.alpha * 0.7, minAlpha) : max(this.alpha, minAlpha);

  // 버튼 배경
  fill(0, 102, 255, detailAlpha);
  noStroke();
  rect(this.detailBtnX, this.detailBtnY, this.detailBtnW, this.detailBtnH, 5);

  // 버튼 텍스트
  fill(255, detailAlpha);
  textSize(this.detailBtnH * 0.32);
  textAlign(CENTER, CENTER);
  text("자세히보기", this.detailBtnX + this.detailBtnW / 2, this.detailBtnY + this.detailBtnH / 2);



  }

  isXBtnClicked(mx, my) {
    return (
      mx >= this.xBtnX && mx <= this.xBtnX + this.xBtnSize &&
      my >= this.xBtnY && my <= this.xBtnY + this.xBtnSize
    );
  }

  isDetailBtnClicked(mx, my) {
  return (
    mx >= this.detailBtnX && mx <= this.detailBtnX + this.detailBtnW &&
    my >= this.detailBtnY && my <= this.detailBtnY + this.detailBtnH
  );
  }

}

