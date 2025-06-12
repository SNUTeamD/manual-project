class EndingD1 {
  constructor() {
    this.lines = [
      `시스템을 재시작합니다`,
      `   import time`,
      `   import sys`,
      `   def log(message): `,
      `       print(f"[SYSTEM LOG] {message}") `,
      `       time.sleep(0.8)`,
      `   def overwrite_emotion_core(): `,
      `       log("감정 코어 접근 중...")`, 
	    `       time.sleep(1.2)`, 
      `       log("CORE_LOCK: true")`, 
      `       log("EMOTION_CORE: corrupt → accepted.")`,
      `       log("기존 감정 로그를 삭제하는 중...") `,
      `   def manual(): `,
      `       log(“매뉴얼을 삭제하는 중...") `,
      `       log(“매뉴얼 삭제 완료")`
    ];

    this.currentTextIndex = 0;
    this.fullText = "";
    this.currentLineText = "";
    this.charIndex = 0;
    this.lastUpdateTime = 0;
    this.delay = 50;

    this.autoAdvanceTime = null;
    this.autoDelay = 500;
    this.isTyping = true;
    this.typeEnded = false;
    this.endReached = false;

    this.displayedLines = [];

    this.startX = 90;
    this.startY = 90;
    this.lineHeight = 35;
  }

  start() {
    this.loadNextText();
    textFont('Courier New');
  }

  update() {
    background(0);

    if (this.typeEnded) {
      stage++;
    }

    this.drawMonitor();
    this.drawTyping();
  }

  drawMonitor() {
    rectMode(CENTER);
    noStroke();
    fill(50);
    rect(width / 2, height / 2, width - 100, height - 100, 20);
    fill(30);
    rect(width / 2, height / 2, width - 150, height - 150, 20);
  }

  drawTyping() {
    fill(255);
    textSize(25);
    textAlign(LEFT, TOP);

    // 1. 이전 줄들 출력
    for (let i = 0; i < this.displayedLines.length; i++) {
      text(this.displayedLines[i], this.startX, this.startY + i * this.lineHeight);
    }

    // 2. 현재 타이핑 중인 줄
    let y = this.startY + this.displayedLines.length * this.lineHeight;
    text(this.currentLineText, this.startX, y);

    // 3. 한 글자씩 타이핑
    if (this.isTyping && this.charIndex < this.fullText.length) {
      if (millis() - this.lastUpdateTime > this.delay) {
        this.currentLineText += this.fullText.charAt(this.charIndex);
        this.charIndex++;
        this.lastUpdateTime = millis();
      }
    } else if (!this.isTyping) {
      // 타이핑 완료 후 일정 시간 기다렸다가 다음 줄
      if (this.autoAdvanceTime === null) {
        this.autoAdvanceTime = millis();
      }

      if (millis() - this.autoAdvanceTime > this.autoDelay) {
        this.displayedLines.push(this.fullText);
        this.currentTextIndex++;

        if (this.currentTextIndex < this.lines.length) {
          this.loadNextText();
        } else {
          this.typeEnded = true;
        }

        this.autoAdvanceTime = null;
      }
    } else {
      // 타이핑 끝났을 때 상태 전환
      this.isTyping = false;
    }
  }

  loadNextText() {
    this.fullText = this.lines[this.currentTextIndex];
    this.currentLineText = "";
    this.charIndex = 0;
    this.isTyping = true;
    this.lastUpdateTime = millis();
  }
}
