//아직 코드 변형을 안한 상태
class WrongAnswer {
  constructor() {
    // 상태 관련
    this.state = "blink"; // "blink" → "noise" → "dialogue"
    this.stateStartTime = millis();

    // 지속 시간 (단위: ms)
    this.blinkDuration = 2500;   // 2.5초 깜빡임
    this.noiseDuration = 1800;   // 1.8초 노이즈

    // 대사 관련
    this.texts = [
      { speaker: "PLAYER", text: "...헉. 잠깐 졸았나 ..?" },
      { speaker: "김철수", text: "첫 날부터 주무시는 거예요? 이제 일하셔야죠." },
      { speaker: "PLAYER", text: "아, 네 ... 죄송합니다." },
    ];

    this.currentTextIndex = 0;
    this.fullText = "";
    this.displayedText = "";
    this.charIndex = 0;
    this.lastUpdateTime = 0;
    this.delay = 50;
    this.isTyping = false;
    this.clickReady = false;

    // 이미지
    this.imgResearcher = null;
    this.backgroundImg = null;
  }

  preload() {
    this.whyWrong = loadImage("assets/왜틀려.png");
    this.backgroundImg = loadImage("assets/내 사무실 자리.png");
  }

  update() {
    if (this.state === "blink") {
      this.drawBlink();
      if (millis() - this.stateStartTime > this.blinkDuration) {
        this.state = "noise";
        this.stateStartTime = millis();
      }
    } else if (this.state === "noise") {
      this.drawNoise();
      if (millis() - this.stateStartTime > this.noiseDuration) {
        this.state = "dialogue";
        this.stateStartTime = millis();
        this.loadNextText(); // 첫 대사 로드
      }
    } else if (this.state === "dialogue") {
      this.drawTextbox();
      this.drawTyping();
    }
  }

  drawBlink() {
    background(250);
    let alpha = random(120, 255);
    fill(255, 0, 0, alpha);
    textSize(80);
    textAlign(CENTER, CENTER);
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
    let scale = 0.5; // 이미지 80% 크기로 줄이기
    let imgW = this.backgroundImg.width * scale;
    let imgH = this.backgroundImg.height * scale;
    imageMode(CENTER);
    image(this.backgroundImg, width / 2, height / 2, imgW, imgH);
    imageMode(CORNER); // 다른 이미지들에 영향 안 주게 복원
    //image(this.backgroundImg, 0, 0, width, height);
    this.drawResearcher();

    let boxW = width * 0.9;
    let boxH = 160;
    let boxX = width / 2 - boxW / 2;
    let boxY = height - boxH - 50;

    noStroke();
    fill(120);
    rect(0, height - height / 4, width, height / 4);

    let speaker = this.texts[this.currentTextIndex]?.speaker;

    if (speaker === "김철수") {
      noStroke();
      fill(60, 215);
      rectMode(CENTER);
      rect(boxX + 215, boxY + 15, 200, 50, 10);
      rectMode(CORNER);
      fill(255);
      textSize(30);
      textAlign(CENTER, CENTER);
      text("김철수", boxX + 215, boxY + 10);
    }

    fill(255);
    textSize(30);
    text(this.displayedText, width / 2, 7 / 8 * height);
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
    if (this.currentTextIndex >= this.texts.length) {
      this.fullText = "";
      this.displayedText = "";
      this.clickReady = false;
      noLoop(); // 대사 종료 후 멈춤
      return;
    }

    let obj = this.texts[this.currentTextIndex];
    this.fullText = obj.text;
    this.displayedText = "";
    this.charIndex = 0;
    this.lastUpdateTime = millis();
    this.isTyping = true;
    this.clickReady = false;
  }

  handleClick() {
    if (this.state !== "dialogue") return;

    if (this.isTyping) {
      this.displayedText = this.fullText;
      this.charIndex = this.fullText.length;
      this.isTyping = false;
      this.clickReady = true;
    } else if (this.clickReady) {
      this.currentTextIndex++;
      this.loadNextText();
    }
  }

  drawResearcher() {
    const w = 500;
    const h = this.imgResearcher.height * (w / this.imgResearcher.width);
    const x = 80;
    const y = height - height / 4 - h + 200;
    image(this.imgResearcher, x, y, w, h);
  }
}
