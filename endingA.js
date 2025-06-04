class EndingA {
  constructor(x = 150, y = 150, lineHeight = 40) {
    this.lines = [
      "업무가 모두 완료되었습니다.",
      "에너지 변환 수준 미달.",
      "(플레이어명) == 부적합",
      "규정 7.13조에 따라, 신규 직원으로 등록됩니다.",
      "기억을 제거합니다.",
      "...",
      "...",
      "환영합니다. 연구부서로의 이동이 승인되었습니다."
    ];

    this.currentLine = 0;
    this.currentText = "";
    this.typingSpeed = 2;
    this.frameCountOffset = 0;
    this.lineDelayFrames = 60;
    this.waitingForNext = false;
    this.endReached = false;

    this.displayedLines = [];
    this.lineHeight = lineHeight;
    this.startX = x;
    this.startY = y;
  }

  setup() {
    this.frameCountOffset = frameCount;
  }

  update() {
    if (this.endReached || this.waitingForNext) return;

    let line = this.lines[this.currentLine];
    let numCharsToShow = min(line.length, floor((frameCount - this.frameCountOffset) / this.typingSpeed));
    this.currentText = line.substring(0, numCharsToShow);

    if (numCharsToShow === line.length && !this.waitingForNext) {
      this.waitingForNext = true;
      setTimeout(() => {
        this.displayedLines.push(line);
        this.currentLine++;
        if (this.currentLine >= this.lines.length) {
          this.endReached = true;
        } else {
          this.frameCountOffset = frameCount;
          this.waitingForNext = false;
        }
      }, this.lineDelayFrames * (1000 / 60));
    }
  }

  display() {
    background(0);
    
    //모니터 화면 그리기
    noStroke();
    rectMode(CENTER);
    fill(50); // 어두운 회색 모니터 배경
    rect(width/2, height/2, width-100, height-100, 20);
    fill(30); // 좀 더 진한 화면 안쪽
    rect(width/2, height/2, width-150, height-150, 20);
   
    // 텍스트 그리기
    fill(255);

    if (this.endReached) {
      background(0);
      textSize(36);
      textAlign(CENTER, CENTER);
      textFont("Courier New");
      text("#End A: Bad Ending", width / 2, height / 2);
      return;
    }
    
    textSize(30);
    textAlign(LEFT, TOP);
    for (let i = 0; i < this.displayedLines.length; i++) {
      text(this.displayedLines[i], this.startX, this.startY + i * this.lineHeight);
    }

    text(this.currentText, this.startX, this.startY + this.displayedLines.length * this.lineHeight);
  }
}
