class EndingB {
  constructor() {
    this.phase = 0;
    this.phaseStartTime = millis();
    this.blinkAlpha = 0;

    this.texts = [
        {speaker: "PLAYER", text:"(잠깐 졸았나..?)"},
        {speaker: "도재인", text:"첫 날부터 주무시는 거에요? 이제 일하셔야죠."}
    ];

    this.currentTextIndex = 0;
    this.fullText = "";
    this.displayedText = "";
    this.charIndex = 0;
    this.lastUpdateTime = 0;
    this.delay = 50;
    this.isTyping = true;
    this.clickReady = false;

    this.noiseStartTime = 0;
    this.noiseDuration = 800;
    this.isNoising = false;
  }
  preload(){
     this.endingAImg = loadImage('assets/연구원.png');
  }

  update() {
    if (this.phase === 0) {
      // 1단계: 깜빡이는 경고 문구
      this.drawBlink();
      if (millis() - this.phaseStartTime > 2000 && !this.isNoising) {
        this.isNoising = true;
        this.noiseStartTime = millis();
      }
      // 2단계: 노이즈 효과
      if (this.isNoising) {
        this.drawNoise();
        if (millis() - this.noiseStartTime > this.noiseDuration) {
          this.phase = 1;
          this.loadNextText();
        }
      }
    } else if (this.phase === 1) {
      // 3단계: 대사 출력
      this.drawTextbox();
      this.drawTyping();
    }
  }

  drawBlink() {
    background(0);
    this.blinkAlpha = random(120, 255);
    fill(255, 0, 0, this.blinkAlpha);
    textSize(80);
    text("매뉴얼을 지키라고 했잖아", width / 2, height / 2);
  }

  drawNoise() {
    loadPixels();
    for (let i = 0; i < pixels.length; i += 4) {
      let val = random(0, 255);
      pixels[i] = val;
      pixels[i + 1] = val;
      pixels[i + 2] = val;
      pixels[i + 3] = 255;
    }
    updatePixels();
  }

  drawTextbox() {
    background(0);
    let boxW = width * 0.9;
    let boxH = 160;
    let boxX = width / 2 - boxW / 2;
    let boxY = height - boxH - 50;
    // fill(60);
    // rect(boxX, boxY, boxW, boxH, 20);
    // 민서님처럼 텍스트 박스 수정
    fill(120);
    rect(0, height - height / 4, width, height / 4);

    // 대사 텍스트
    fill(255);
    textAlign(LEFT, TOP);
    textSize(28);
    text(this.displayedText, boxX + 30, boxY + 30);
  }

  drawTyping() {
    if (this.isTyping && this.charIndex < this.fullText.length) {
      if (millis() - this.lastUpdateTime > this.delay) {
        this.displayedText += this.fullText.charAt(this.charIndex);
        this.charIndex++;
        this.lastUpdateTime = millis();
      }
    } else {
      this.isTyping = false;
      this.clickReady = true;
    }
  }

  loadNextText() {
    this.fullText = this.texts[this.currentTextIndex];
    this.displayedText = "";
    this.charIndex = 0;
    this.isTyping = true;
    this.clickReady = false;
    this.lastUpdateTime = millis();
  }

  handleClick() {
    if (this.phase !== 1) return;

    if (this.isTyping) {
      this.displayedText = this.fullText;
      this.charIndex = this.fullText.length;
      this.isTyping = false;
      this.clickReady = true;
    } else if (this.clickReady) {
      this.currentTextIndex++;
      if (this.currentTextIndex < this.texts.length) {
        this.loadNextText();
      } else {
        noLoop();
      }
    }
  }
}
