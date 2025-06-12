class EndingA {
  constructor(name) {
    this.lines = [
      "업무가 모두 완료되었습니다.",
      "에너지 변환 수준 미달.",
      `${name} == 부적합`, // ← 여기!
      "규정 7.13조에 따라, 신규 직원으로 등록됩니다.",
      "기억을 제거합니다.",
      "...",
      "...",
      "환영합니다. 연구부서로의 이동이 승인되었습니다."
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
    this.endReached = false;

    this.displayedLines = [];

    this.startX = 120;
    this.startY = 120;
    this.lineHeight = 40;

    this.endingShownTime = null; // 엔딩이 끝난 시점 저장
    this.canRestart = false;
  }

  start() {
    this.loadNextText();
  }

  update() {
    background(0);

    if (this.endReached) {
      fill(255);
      textSize(36);
      textAlign(CENTER, CENTER);
      textFont("Courier New");
      text("#End A: Bad Ending", width / 2, height / 2);
      
      if (this.endingShownTime === null) {
        this.endingShownTime = millis();
      }

      if (!this.canRestart && millis() - this.endingShownTime > 5000) {
        this.canRestart = true;
      }

      if (this.canRestart) {
        textSize(20);
        text("Click to Restart", width / 2, height / 2 + 30);
      }

      return;
    }

    this.drawMonitor();
    this.drawTyping();
  }

  drawMonitor() {
     push(); // 상태 저장
    rectMode(CENTER);
    noStroke();
    fill(50);
    rect(width / 2, height / 2, width - 100, height - 100, 20);
    fill(30);
    rect(width / 2, height / 2, width - 150, height - 150, 20);
    pop(); // 상태 복원
  }

  drawTyping() {
    fill(255);
    textSize(24);
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
          this.endReached = true;
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
  handleClick() {
    if (this.canRestart) {
      stage = 0; // stage 0으로 복귀
    }
  }
}
