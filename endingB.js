// class EndingB {
//   constructor() {
//     this.phase = 0;
//     this.phaseStartTime = millis();
//     this.blinkAlpha = 0;

//     this.texts = [
//         {speaker: "PLAYER", text:"...헉. 잠깐 졸았나..?"},
//         {speaker: "도재인", text:"첫 날부터 주무시는 거예요? 이제 일하셔야죠."},
//         {speaker: "PLAYER", text:"아, 네... 죄송합니다."},
//     ];
    

//     this.currentTextIndex = 0;
//     this.fullText = "";
//     this.displayedText = "";
//     this.charIndex = 0;
//     this.lastUpdateTime = 0;
//     this.delay = 50;
//     this.isTyping = true;
//     this.clickReady = false;

//     this.noiseStartTime = 0;
//     this.noiseDuration = 1500;
//     this.isNoising = false;
//   }

//   preload(){
//     this.imgResearcher = loadImage('assets/연구원.png');
//     this.backgroundImg = loadImage('assets/내 사무실 자리.png');
//   }

//   update() {
//     if (this.phase === 0) {
//       // 1단계: 깜빡이는 경고 문구
//       this.drawBlink();
//       if (millis() - this.phaseStartTime > 2000 && !this.isNoising) {
//         this.isNoising = true;
//         this.noiseStartTime = millis();
//       }
//       // 2단계: 노이즈 효과
//       if (this.isNoising) {
//         this.drawNoise();
//         if (millis() - this.noiseStartTime > this.noiseDuration) {
//           this.phase = 1;
//           this.loadNextText();
//         }
//       }
//     } else if (this.phase === 1) {
//       // 3단계: 대사 출력
//       this.drawTextbox();
//       this.drawTyping();
//     }
//   }

//   drawBlink() {
//     background(250);
//     this.blinkAlpha = random(120, 255);
//     fill(255, 0, 0, this.blinkAlpha);
//     textSize(80);
//     //textfont('Courier New');
//     text("매뉴얼을 지키라고 했잖아", width / 2, height / 2);
//   }

//   drawNoise() {
//     loadPixels();
//     for (let i = 0; i < pixels.length; i += 4) {
//       let val = random(0, 255);
//       pixels[i] = val;
//       pixels[i + 1] = val;
//       pixels[i + 2] = val;
//       pixels[i + 3] = 255;
//     }
//     updatePixels();
//   }

//   drawTextbox() {
//     let speaker = this.texts[this.currentTextIndex].speaker;
//     image(this.backgroundImg, 0, 0, width, height);
//     this.drawResearcher();
//     let boxW = width * 0.9;
//     let boxH = 160;
//     let boxX = width / 2 - boxW / 2;
//     let boxY = height - boxH - 50;
//     // fill(60);
//     // rect(boxX, boxY, boxW, boxH, 20);
//     // 민서님처럼 텍스트 박스 수정
//     fill(120);
//     rect(0, height - height / 4, width, height / 4);
    
//     //도재인 판별
//     if (speaker === "도재인") {
//       fill(40);
//       rect(boxX + 20, boxY - 40, 200, 50, 10);
//       fill(255);
//       textSize(30);
//       textAlign(CENTER, CENTER);
//       text("도재인", boxX + 120, boxY-20);
//     }

//     // 대사 텍스트
//     fill(255);
//     textAlign(LEFT, TOP);
//     textSize(30);
//     text(this.displayedText, boxX + 30, boxY + 30);
//   }

//   drawTyping() {
//     if (this.isTyping && this.charIndex < this.fullText.length) {
//       if (millis() - this.lastUpdateTime > this.delay) {
//         this.displayedText += this.fullText.charAt(this.charIndex);
//         this.charIndex++;
//         this.lastUpdateTime = millis();
//       }
//     } else {
//       this.isTyping = false;
//       this.clickReady = true;
//     }
//   }

//   loadNextText() {
//     this.fullText = this.texts[this.currentTextIndex].text;
//     this.displayedText = "";
//     this.charIndex = 0;
//     this.isTyping = true;
//     this.clickReady = false;
//     this.lastUpdateTime = millis();
//   }

//   handleClick() {
//     if (this.phase !== 1) return;

//     if (this.isTyping) {
//       this.displayedText = this.fullText;
//       this.charIndex = this.fullText.length;
//       this.isTyping = false;
//       this.clickReady = true;
//     } else if (this.clickReady) {
//       this.currentTextIndex++;
//       if (this.currentTextIndex < this.texts.length) {
//         this.loadNextText();
//       } else {
//         noLoop();
//       }
//     }
//   }
  
//   drawResearcher() {
//   // 연구원 이미지 비율 유지하면서 표시
//   this.researcherW = 500;
//   this.researcherH = this.imgResearcher.height * (this.researcherW / this.imgResearcher.width);
//   this.imgX = 80;
//   this.imgY = height - height / 4 - this.researcherH + 200;
//   image(this.imgResearcher, this.imgX, this.imgY, this.researcherW, this.researcherH);
//   }
// }


class EndingB {
  constructor() {
    // 상태 관련
    this.state = "blink"; // "blink" → "noise" → "dialogue"
    this.stateStartTime = millis();

    // 지속 시간 (단위: ms)
    this.blinkDuration = 3000;   // 3초 깜빡임
    this.noiseDuration = 2000;   // 2초 노이즈

    // 대사 관련
    this.texts = [
      { speaker: "PLAYER", text: "헉, 잠깐 졸았나 .. ?" },
      { speaker: "김철수", text: "첫 날부터 주무시는 거예요? 이제 일하셔야죠." },
      { speaker: "PLAYER", text: "아, 네 ... 죄송합니다." },
    ];

    this.currentTextIndex = 0;
    this.fullText = "";
    this.displayedText = "";
    this.charIndex = 0;
    this.lastUpdateTime = 0;
    this.delay = 85;
    this.isTyping = false;
    this.clickReady = false;

    // 이미지
    this.imgResearcher = null;
    this.backgroundImg = null;
  }

  preload() {
    this.imgResearcher = loadImage("assets/연구원.png");
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

  start() {
  this.state = "blink";
  this.stateStartTime = millis();
  this.currentTextIndex = 0;
  this.fullText = "";
  this.displayedText = "";
  this.charIndex = 0;
  this.lastUpdateTime = 0;
  this.isTyping = false;
  this.clickReady = false;
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
      rect(boxX + 230, boxY + 15, 200, 50, 10);
      rectMode(CORNER);
      fill(255);
      textSize(30);
      textAlign(CENTER, CENTER);
      text("김철수", boxX + 230, boxY + 10);
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
      // noLoop(); // 대사 종료 후 멈춤
      stage = returnStage;
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
