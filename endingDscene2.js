class EndingD2 {
  constructor(playerName) {
    // this.phase = 1;
    // this.phaseStartTime = 0;
    // this.fadeAlpha = 0;
    this.playerName = playerName;
    this.autoAdvanceTime = null;
    this.autoDelay = 1500;
    // this.lockInput = false;
    //글리치 시간 함수
    this.glitchStartTime = null;
    this.glitchDuration = 500;
    //문장 자동 작성 
    this.lockInput = false;

    this.texts = [ 
    { speaker: "PLAYER", text: "왠지 모르게 따스한 느낌이 드는 공간이다."}, //0
    { speaker: "PLAYER", text: "여기가 .. 어디지 .. ?"}, //1
    { speaker: "도재인", text: "깨어나셨나요? 인사이동부의 도재인입니다. 메일 드렸었는데 .."}, //2
    { speaker: "도재인", text: "다행히도 눈치 채시고 빠져 나오셨네요."}, //3
    { speaker: "도재인", text: "특별히 서류까지 보여드렸는데 .. 실망할 뻔 했어요."}, //4
    { speaker: "도재인", text: "많은 분들이 그냥 매뉴얼을 따라 얌전히 진행하시더구요."}, //5 
    { speaker: "도재인", text: "그 앞에 뭐가 기다리고 있는지도 모르고 ... 저로써는 안타까울 따름입니다."}, //6
    { speaker: "PLAYER", text: "매뉴얼이라면 .. ?"}, //7
    { speaker: "도재인", text: "첫 날 본 매뉴얼 기억 안 나시나요? 그게 ‘그것들’이 인간을 구분하는 방법이죠."}, //8
    { speaker: "도재인", text: "‘그것들’은 인간과 달리 매뉴얼을 볼 필요도 없고, 어떤 감정도 느끼지 못하거든요."}, //9
    { speaker: "도재인", text: "업무를 진행하며 이상한 점 못 느끼셨나요?"}, //10
     { speaker: "도재인", text: " 거기의 ‘직원들’.. 그들은 인간이 아니에요. 인간을 흉내내는 껍데기일 뿐이죠."}, //11
    { speaker: "도재인", text: "그것들은 인간의 공포를 에너지원으로 삼고 있어요."}, //12
    { speaker: "도재인", text: ` ${this.playerName} 님이 있던 곳은 그 에너지 전환 기술을 만들어낸 회사고요.`}, //13
    { speaker: "도재인", text: `회사는 매뉴얼과 숨겨진 메시지를 통해 ${this.playerName} 님에게 공포심을 주고, 그걸 통해서 에너지화에 적합한 인간을 찾아내고 있었던 거죠.`}, //14
    { speaker: "도재인", text: `아무튼, 구조 요청을 보내주셔서 ${this.playerName} 님을 빼올 수 있었어요.` },
    { speaker: "PLAYER", text: "그럼 구조 요청을 보내지 않으면 ..."},
    { speaker: "도재인", text: "... 때로는 필요한 희생도 있는 법이에요."}, //17
    { speaker: "도재인", text: "저희는 구조를 위해 최대한의 노력을 해요. 이 정도 단서조차 알아차리지 못하는 인간들을 위해 리스크를 감수할 수는 없죠."}, //18
    { speaker: "도재인", text: ".... 인간이 '그것'들에게 맞설 수 있는 방법은 없어요. 최대한 안전한 곳에 있는 것, 인간임을 들키지 않는 것만이 여러분이 할 수 있는 최선이에요."}, //19
    { speaker: "도재인", text: "하지만, 걱정하지 마세요! 여기는 회사가 전혀 모르는, 정말이지 ‘아주’ 안전한 곳이랍니다."}, //20
    { speaker: "도재인", text: "하하, 그렇게 겁에 질린 표정 하지 마세요."},//21
    { speaker: "도재인", text: "... 여긴, 안전한 곳이에요."}, //22
    { speaker: "PLAYER", text: "방금 .. 뭐였지?"}, //23
    { speaker: "도재인", text: `그러나 여기에서는 ${this.playerName} 님이 지켜주셔야 할 몇 가지 사항들이 있어요.`}, //24
    { speaker: "도재인", text: "여기 그 사항들을 적은 매뉴얼이에요."}, //25
    { speaker: "도재인", text: "반드시 매뉴얼을 따라주세요.",lockInput: true} //26
    ];

    this.currentTextIndex = 0;
    this.fullText = "";
    this.displayedText = "";
    this.charIndex = 0;
    this.lastUpdateTime = 0;
    this.delay = 50;
    this.isTyping = true;
    this.clickReady = false;

    //처음으로 가기
    this.endingShownTime = null; // 엔딩이 끝난 시점 저장
    this.canRestart = false;

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
    this.saveBg = loadImage('assets/구원 뒷 배경.png');
    this.janeMonster = loadImage('assets/도재인 괴인.png');
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
      text("#End C: New MANUAL Ending", width / 2, height / 2);

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

    let scale = 0.5; // 이미지 80% 크기로 줄이기
    imageMode(CENTER);
    if (this.currentTextIndex >= 24 && this.currentTextIndex<=25){
        let imgW = this.endingD1Bg.width * scale;
        let imgH = this.endingD1Bg.height * scale;
        image(this.endingD1Bg, width / 2, height / 2, imgW, imgH);
    } else if (this.currentTextIndex === 26) {
        let imgW = this.endingD1BgGlit.width * scale;
        let imgH = this.endingD1BgGlit.height * scale;
        image(this.endingD1BgGlit, width / 2, height / 2, imgW, imgH);
    } else{
      push;
      imageMode(CORNER);
        image(this.saveBg, 0, 0, windowWidth, windowHeight);
      pop;
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
      rect(boxX + 215, boxY + 5, 200, 50, 10);
      rectMode(CORNER);
      fill(255);
      textSize(30);
      textAlign(CENTER, CENTER);
      text("도재인", boxX + 215, boxY);
    }

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(30);
    let textMargin = 30;
    textFont(this.myFont);
  
    if (this.displayedText === "반드시 매뉴얼을 따라주세요.") {
      fill(255, 0, 0); // 빨간색
    } else {
      fill(0); // 검은색
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
    if (this.currentTextIndex === 15) {
      const w = 1500;
      const h = this.JainGlitImg.height * (w / this.JainGlitImg.width);
      const x = width/2;
      const y = height;
      imageMode(CENTER);  
      image(this.JainGlitImg, x, y, w, h);
    }else if( this.currentTextIndex ===17){
      imageMode(CORNER);
      const w = 550;
      const h = this.JainGlitImg.height * (w / this.JainGlitImg.width);
      const x = 20;
      const y = height - height / 4 - h + 200;
       
      image(this.JainGlitImg, x, y, w, h);
    }
     else if (this.currentTextIndex === 22) {
  // 글리치 시작 시점 저장
  if (this.glitchStartTime === null) {
    this.glitchStartTime = millis();
  }

  // 현재 시간 계산
  let elapsed = millis() - this.glitchStartTime;

  imageMode(CORNER);
  const w = 550;
  const h = this.janeMonster.height * (w / this.janeMonster.width);
  const x = 20;
  const y = height - height / 4 - h + 200;

  if (elapsed < this.glitchDuration) {
    // 3초 동안만 글리치 효과
    tint(255, random(50, 150)); // 깜박이는 효과
    image(this.janeMonster, x, y, w, h);
    noTint();

    for (let i = 0; i < 3; i++) {
      let offsetX = random(-10, 10); // 좌우 흔들림
      let offsetY = random(-8, 8);   // 상하 흔들림
      let tintColor;
      if (i === 0) tintColor = [255, 0, 0];     // 빨강
      else if (i === 1) tintColor = [0, 255, 255]; // 청록
      else tintColor = [255, 255, 255];         // 흰색

      tint(...tintColor, 160); // 반투명 컬러 채널
      image(this.janeMonster, x + offsetX, y + offsetY, w, h);
    }
    noTint();
  } else {
    // 3초가 지난 후 정상 이미지
    image(this.JainNormImg, x, y, w, h);
  }
}else{
      imageMode(CORNER);  
      const w = 550;
      const h = this.JainNormImg.height * (w / this.JainNormImg.width);
      const x = 20;
      const y = height - height / 4 - h + 200;  
      image(this.JainNormImg, x, y, w, h);
    }
  }
  //처음으로 이동
   handleClick() {
    if (this.canRestart) {
      stage = 0; // stage 0으로 복귀
    }
  }
}
