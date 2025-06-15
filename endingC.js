class EndingC {
  constructor() {
    this.phase = 1;
    this.phaseStartTime = 0;
    this.fadeAlpha = 0;
    this.autoAdvanceTime = null;
    this.autoDelay = 1500;
    this.lockInput = false;

    this.texts = [ { speaker: "PLAYER", text: "소독약 냄새 ... 여긴 ... 어디지?" },
  { speaker: "PLAYER", text: "무언가가 머리에 연결되어 있어 몸을 움직일 수가 없다." },
  { speaker: "SYSTEM", text: "[SYSTEM MESSAGE: 실험체 0441 반응 기록 개시] \n실험체 0441: 고감도 공포 반응군" },
  { speaker: "SYSTEM", text: "안녕하세요. 편하게 계세요." },
  { speaker: "SYSTEM", text: "곧 당신에 대한 데이터 수집을 시작하겠습니다." },
  { speaker: "SYSTEM", text: "공포 반응이 적을 경우, 추가 자극이 투입됩니다." },
  { speaker: "PLAYER", text: "어째서?" },
  { speaker: "SYSTEM", text: "공포를 감각하세요. 공포는 인간의 당연한 본능이며 당신의 존재 이유입니다." },
  { speaker: "PLAYER", text: "이게 뭐야 .. ? 도대체 왜 ..." },
  { speaker: "PLAYER", text: "제발! 제발 멈춰 .. 나는 분명 .. ... 분명 ... " },
  { speaker: "PLAYER", text: "... ... ... 나는 누구였지?" },
  {
    speaker: "PLAYER",
    text: "소리가 들려. 아니, 아니, 아니지. 소리 같은 건 없어. 근데 그 소리가, 내 뼈 사이로 파고들어. 찢어, 비틀어, 부숴, 다시 붙여, 다시 찢어. 아, 너무 커. 너무 작아. 너무 조용해. 너무 시끄러워. 그게 소리야? 그게 날 말하고 있어.",
    lockInput: true,
    speedUp: true
  },
  { speaker: "SYSTEM", text: "[SYSTEM MESSAGE] 공포 지수 100% 달성.",
    lockInput: true
   },
  { speaker: "SYSTEM", text: "실험체 0441: 고감도 공포 반응군 데이터 수집 완료.",
    lockInput: true
   },
  { speaker: "SYSTEM", text: "에너지 변환 시작. 에너지 변환 중 ..." ,
    lockInput: true},
  { speaker: "SYSTEM", text: "변환 완료." ,
    lockInput: true},
  { speaker: "PLAYER", 
    text: "나는 이제 공포를 흘리는 관이다. 나는 기계이며 나는 양분이다. 나는 통로다. 나는 그들이다. 그들은 나를 본다. 나는 그들이 본 것을 본다. 나는 그들이 본 것을 느낀다.",
    lockInput: true
   },
  { speaker: "SYSTEM", text: "감정 및 기억 초기화 프로세스 시작.",
    lockInput: true},
  { speaker: "SYSTEM", text: "초기화 완료. 실험체 0441 변환 성공.",
    lockInput: true }
];

    this.currentTextIndex = 0;
    this.fullText = "";
    this.displayedText = "";
    this.charIndex = 0;
    this.lastUpdateTime = 0;
    this.delay = 50;
    this.isTyping = true;
    this.clickReady = false;

    this.noiseStartTime = null;
    this.noiseDuration = 30000;
    this.isNoising = false;

    this.endc1Reached = false;

    this.endingC1Img = null;
    //처음으로 가기
    this.endingShownTime = null; // 엔딩이 끝난 시점 저장
    this.canRestart = false;
  }

  preload() {
    this.endingC1Img = loadImage('assets/ending c-1.png');
  }

  start() {
    this.phaseStartTime = millis();
    this.loadNextText();
  }

  update() {
    if (this.endc1Reached) {
      background(0);
      fill(255);
      textSize(36);
      textAlign(CENTER, CENTER);
      textFont("Courier New");
      text("#End C: Fusion Ending", width / 2, height / 2);
     
      if (this.endingShownTime === null) {
        this.endingShownTime = millis();
      }

      if (!this.canRestart && millis() - this.endingShownTime > 5000) {
        this.canRestart = true;
      }

      if (this.canRestart) {
        textSize(20);
        text("Click to Restart", width / 2, height / 2 + 30);
        nameInput.value(''); //시작화면 이름 초기화
      }

      return;
    }

    this.fadeAlpha = constrain((millis() - this.phaseStartTime) / 2000 * 255, 0, 255);
    tint(255, this.fadeAlpha);
    let scale = 0.5; // 이미지 80% 크기로 줄이기
    let imgW = this.endingC1Img.width * scale;
    let imgH = this.endingC1Img.height * scale;
    imageMode(CENTER);
    image(this.endingC1Img, width / 2, height / 2, imgW, imgH);
    imageMode(CORNER); // 다른 이미지들에 영향 안 주게 복원
    //image(this.endingC1Img, 0, 0, width, height);
    noTint();

    this.drawTyping();

    if (this.currentTextIndex >= 11) {
      if (!this.isNoising) {
        this.noiseStartTime = millis();
        this.isNoising = true;
      }
      let elapsed = millis() - this.noiseStartTime;
      let progress = constrain(elapsed / this.noiseDuration, 0, 1);
      if (elapsed < this.noiseDuration) {
      this.drawNoise(progress);
      } else { background(255); // ← 완전한 흰 화면
      }
    }

    this.drawTextbox();
  }

  drawNoise(progress) {
    loadPixels();
    let alpha = map(progress, 1, 0, 0, 255);

    for (let i = 0; i < pixels.length; i += 4) {
      let val = random(0, 255);
      pixels[i] = val;
      pixels[i + 1] = val;
      pixels[i + 2] = val;
      pixels[i + 3] = alpha;
    }

    updatePixels();
  }

  drawTextbox() {
    let speaker = this.texts[this.currentTextIndex].speaker;
    
    let boxW = width * 0.9;
    let boxH = 160;
    let boxX = width / 2 - boxW / 2;
    let boxY = height - boxH - 50;
    
    //텍스트 박스 수정
    //noStroke();
    // fill(60, 220);
    // rect(boxX, boxY, boxW, boxH, 20);
    noStroke();
    fill(120);
    rect(0, height - height / 4, width, height / 4);


    if (speaker === "SYSTEM") {
      fill(60, 215);
      noStroke();
      rectMode(CENTER);
      rect(boxX + 215, boxY + 15, 200, 50, 10);
      rectMode(CORNER);
      fill(255);
      textSize(30);
      textAlign(CENTER, CENTER);
      text("SYSTEM", boxX + 215, boxY + 10);
    }

    
    textAlign(CENTER, CENTER);
    textSize(30);
    let textMargin = 30;
    if (this.currentTextIndex === 16){
      fill(255, 0, 0);
    } else { fill(0);}
    text(this.displayedText, boxX + textMargin, boxY + textMargin + 30, boxW - textMargin * 2, boxH - textMargin * 2);
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
      let currentObj = this.texts[this.currentTextIndex];

      if (currentObj.lockInput) {
        this.clickReady = false;
        if (this.autoAdvanceTime === null) {
          this.autoAdvanceTime = millis();
        }
      } else {
        this.clickReady = true;
      }
    }

    if (this.autoAdvanceTime !== null) {
      let elapsed = millis() - this.autoAdvanceTime;

      if (elapsed > this.autoDelay) {
        if (this.currentTextIndex < this.texts.length - 1) {
          this.currentTextIndex++;
          this.loadNextText();
        } else {
          this.endc1Reached = true;
        }

        this.autoAdvanceTime = null;
      }
    }
  }

  loadNextText() {
    let obj = this.texts[this.currentTextIndex];
    this.fullText = obj.text;
    this.displayedText = "";
    this.charIndex = 0;
    this.isTyping = true;
    this.clickReady = false;
    this.delay = obj.speedUp ? 60 : 80;
    this.lastUpdateTime = millis();
  }

  mousePressed() {
    if (this.phase !== 1) return;

    let currentObj = this.texts[this.currentTextIndex];
    if (currentObj.lockInput) return;

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
        this.endc1Reached = true;
      }
    }
  }
  handleClick() {
    if (this.canRestart) {
      stage = 0; // stage 0으로 복귀
    }
  }
}
