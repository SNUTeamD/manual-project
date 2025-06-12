class EndingD2 {
  constructor(playerName) {
    // this.phase = 1;
    // this.phaseStartTime = 0;
    // this.fadeAlpha = 0;
    this.playerName = playerName;
    this.autoAdvanceTime = null;
    this.autoDelay = 1500;
    // this.lockInput = false;

    this.texts = [ 
    { speaker: "PLAYER", text: "왠지 모르게 따스한 느낌이 드는 공간이다." },
    { speaker: "PLAYER", text: "여기가 .. 어디지 .. ?" },
    { speaker: "도재인", text: "깨어나셨나요? 인사이동부의 도재인입니다. 메일 드렸었는데 .." },
    { speaker: "도재인", text: "다행히도 눈치 채시고 빠져 나오셨네요." },
    { speaker: "도재인", text: `시스템을 초기화해주신 틈을 타 ${this.playerName}님을 빼올 수 있었어요.` },
    { speaker: "PLAYER", text: "시스템이라면..?" },
    { speaker: "도재인", text: "거기서 준 그 ‘매뉴얼’ 말이에요. 그게 ‘그것들’이 인간을 구분하는 방법이죠." },
    { speaker: "도재인", text: "‘그것들’은 인간과 달리 매뉴얼을 어기지도 않고, 어떤 감정도 느끼지 못하거든요." },
    { speaker: "도재인", text: "업무를 진행하며 이상한 점 못 느끼셨나요? 거기의 ‘직원들’.. 그들은 인간이 아니에요. 인간을 흉내내는 껍데기일 뿐이죠." },
    { speaker: "PLAYER", text: "그럼 저와 함께 일하던 사람들은 모두 ..."},
    { speaker: "PLAYER", text: "그래도 그 중에 저처럼 실험당하는 사람은 없었나요?"},
    { speaker: "도재인", text: "....'그것'과 인간을 구분할 방법이요? 그런 건 없어요. 최대한 안전한 곳에 있는 것, 인간임을 들키지 않는 것만이 할 수 있는 최선이에요." },
    { speaker: "도재인", text: `그것들은 인간의 공포를 에너지원으로 삼고 있어요. ${this.playerName}님이 있던 곳은 그 에너지 전환 기술을 만들어낸 회사고요.` },
    { speaker: "도재인", text: `회사는 매뉴얼과 숨겨진 메시지를 통해 ${this.playerName}님에게 공포심을 주고, 그걸 통해서 에너지화에 적합한 인간을 찾아내고 있었던 거죠.`},
    { speaker: "도재인", text: "하지만, 걱정하지 마세요! 여기는 회사가 전혀 모르는 곳이에요. 정말이지, ‘아주’ 안전한 곳이랍니다."},
    { speaker: "도재인", text: "...여긴 안전한 곳이에요."},
    { speaker: "PLAYER", text: "방금 .. 뭐였지?"},
    { speaker: "도재인", text: `그러나 여기에서는 ${this.playerName}님이 지켜주셔야 할 몇 가지 사항들이 있어요. 여기 그 사항들을 적은 매뉴얼이에요.`},
    { speaker: "도재인", text: "반드시 매뉴얼을 따라주세요."}
    ];

    this.currentTextIndex = 0;
    this.fullText = "";
    this.displayedText = "";
    this.charIndex = 0;
    this.lastUpdateTime = 0;
    this.delay = 50;
    this.isTyping = true;
    this.clickReady = false;

    // 노이즈 관련 변수
    // this.noiseStartTime = null;
    // this.noiseDuration = 30000;
    // this.isNoising = false;

    this.endD1Reached = false;

    this.endingD1Bg = null;
    this.JainNormImg = null;
    this.JainGlitImg = null;
  }

  preload() {
    this.endingD1Bg = loadImage('assets/도재인 엔딩 C-1 (1).png');
    this.endingD1BgGlit = loadImage('assets/도재인 엔딩 C-1 (2).png');
    this.JainNormImg = loadImage('assets/도재인(생기있음).png');
    this.JainGlitImg = loadImage('assets/도재인(생기없음).png');
    this.myFont = loadFont('assets/DungGeunMo.ttf');
  }

  start() {
    this.phaseStartTime = millis();
    this.loadNextText();
  }

  update() {
    if (this.endD1Reached) {
      background(0);
      fill(255);
      textSize(36);
      textAlign(CENTER, CENTER);
      textFont("Courier New");
      text("#End D: New MANUAL Ending", width / 2, height / 2);
      return;
    }

    let scale = 0.5; // 이미지 80% 크기로 줄이기
    imageMode(CENTER);
    if (this.currentTextIndex === 16){
        let imgW = this.endingD1Bg.width * scale;
        let imgH = this.endingD1Bg.height * scale;
        image(this.endingD1Bg, width / 2, height / 2, imgW, imgH);
    } else if (this.currentTextIndex === 17) {
        let imgW = this.endingD1BgGlit.width * scale;
        let imgH = this.endingD1BgGlit.height * scale;
        image(this.endingD1BgGlit, width / 2, height / 2, imgW, imgH);
    } else{
      background(0);
      this.drawResearcher();
    }
    imageMode(CORNER); // 다른 이미지들에 영향 안 주게 복원
    this.drawTyping();
    this.drawTextbox();
  }

//   drawNoise(progress) {
//     loadPixels();
//     let alpha = map(progress, 1, 0, 0, 255);

//     for (let i = 0; i < pixels.length; i += 4) {
//       let val = random(0, 255);
//       pixels[i] = val;
//       pixels[i + 1] = val;
//       pixels[i + 2] = val;
//       pixels[i + 3] = alpha;
//     }

//     updatePixels();
//   }

  drawTextbox() {
    // 발화자 확인
    let speaker = this.texts[this.currentTextIndex].speaker;
    // 변수 설정
    let boxW = width * 0.9;
    let boxH = 160;
    let boxX = width / 2 - boxW / 2;
    let boxY = height - boxH - 50;
    
    // 텍스트박스
    noStroke();
    if (this.displayedText === "반드시 매뉴얼을 따라주세요.") {
      fill(50); // 검은색
    } else {
      fill(120); // 회색
    }
    rectMode(CORNER);
    rect(0, height - height / 4, width, height / 4);


    if (speaker === "도재인") {
      fill(60, 215);
      noStroke();
      rectMode(CENTER);
      rect(boxX + 215, boxY + 15, 200, 50, 10);
      rectMode(CORNER);
      fill(255);
      textSize(30);
      textAlign(CENTER, CENTER);
      text("도재인", boxX + 215, boxY + 10);
    }

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(30);
    let textMargin = 30;
    textFont(this.myFont);
  
    if (this.displayedText === "반드시 매뉴얼을 따라주세요.") {
      fill(255, 0, 0); // 빨간색
    } else {
      fill(255); // 흰색
    }
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
          this.endD1Reached = true;
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
    if (this.fullText === "반드시 매뉴얼을 따라주세요.") {
    this.displayedText = this.fullText;
    this.isTyping = false; // ← 타이핑 효과 생략
    } else {
    this.displayedText = "";
    this.isTyping = true;
    }
  }

  mousePressed() {
    // if (this.phase !== 1) return;

    // let currentObj = this.texts[this.currentTextIndex];
    // if (currentObj.lockInput) return;

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
        this.endD1Reached = true;
      }
    }
  }

  drawResearcher() {
    if (this.currentTextIndex === 14) {
      const w = 1500;
      const h = this.JainGlitImg.height * (w / this.JainGlitImg.width);
      const x = width/2;
      const y = height;
      imageMode(CENTER);  
      image(this.JainGlitImg, x, y, w, h);
    } else{
      imageMode(CORNER);  
      const w = 550;
      const h = this.JainNormImg.height * (w / this.JainNormImg.width);
      const x = 20;
      const y = height - height / 4 - h + 200;  
      image(this.JainNormImg, x, y, w, h);
    }
  }
}
