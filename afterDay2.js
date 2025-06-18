class AfterDay2 {
constructor() {
    this.phase = 1;
    this.phaseStartTime = 0;
    this.fadeAlpha = 0;
    this.autoAdvanceTime = null;
    this.autoDelay = 1500;
    this.lockInput = false;

    this.texts = [
  { speaker: "PLAYER", text: "휴우 힘들다 ... 오늘 하루도 수고 많았어, 내자신 ^^" },
  { speaker: "???", text: "커피 드실래요?" },
  { speaker: "PLAYER", text: "어제 날 안내해준 연구원이 갑자기 커피를 들고 나타났다." },
  { speaker: "김철수", text: "드시면서 하세요." },
  { speaker: "PLAYER", text: "감사합니다." },
  { speaker: "김철수", text: "매뉴얼 ... 잘 지키고 계시죠?" },
  { speaker: "김철수", text: "잘 지킬거라 믿습니다."},
  { speaker: "PLAYER", text: "내 대답도 듣지 않고 사라졌다." },
  { speaker: "PLAYER", text: "여기 사람들은 자기 할 말만 하고 사라지는 게 버릇인가 보다." },
  { speaker: "PLAYER", text: "이거 그만둘까 하는 생각이 또 들었지만 이미 발을 담군 이상 .." },
  { speaker: "PLAYER", text: "어쨌든 이게 내 일이니까. 하는 데까진 해보자 .." }
];

    this.currentTextIndex = 0;
    this.fullText = "";
    this.displayedText = "";
    this.charIndex = 0;
    this.lastUpdateTime = 0;
    this.delay = 50;
    this.isTyping = true;
    this.clickReady = false;


    this.endc1Reached = false;
    this.chulSuMonsterShown = false;
    this.afterDay1 = null;
  }

  preload() {
    this.afterDay2 = loadImage('assets/Day2가 끝나고.png');
    this.chulSuCommon = loadImage('assets/연구원.png');
    this.chulSuMonster = loadImage('assets/연구원 괴인.png');
  }

  start() {
     this.currentTextIndex = 0;
    this.fullText = "";
    this.displayedText = "";
    this.charIndex = 0;
    this.lastUpdateTime = 0;
    this.delay = 50;
    this.isTyping = true;
    this.clickReady = false;
    this.endc1Reached = false;
    this.chulSuMonsterShown = false;

    this.phaseStartTime = millis();
    this.loadNextText();
  }

  update() {

    this.fadeAlpha = constrain((millis() - this.phaseStartTime) / 2000 * 255, 0, 255);
    tint(255, this.fadeAlpha);
    noTint();

    this.drawTyping();

    if (this.currentTextIndex >= 2 && this.currentTextIndex <= 4) {
      let scale = 0.5; // 이미지 80% 크기로 줄이기

  let imgW = this.afterDay2.width * scale;
  let imgH = this.afterDay2.height * scale;

  tint(255, this.fadeAlpha);
  imageMode(CENTER);
  image(this.afterDay2, width / 2, height / 3, imgW, imgH);
  imageMode(CORNER); // 다른 이미지들에 영향 안 주게 복원

    } else if(this.currentTextIndex >4 && this.currentTextIndex <=6 ){
      this.drawChulSu();
    }
    
  // 철수 괴수화 코드
  // 👾 괴인 이미지 잠깐 등장
  if (this.showChulSuMonster) {
    let elapsed = millis() - this.chulSuMonsterStartTime;
    if (elapsed < 300) {
      this.drawChulSuMonster();
    } else {
      this.showChulSuMonster = false;
      this.chulSuMonsterShown = true; // ✅ 더 이상 안 나오게
    }
  }

// ✅ currentTextIndex가 7일 때 한 번만 showchulSuMonster를 true로
if (this.currentTextIndex === 5 && !this.chulSuMonsterShown && !this.showChulSuMonster) {
  this.showChulSuMonster = true;
  this.chulSuMonsterStartTime = millis();
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
    if (this.currentTextIndex >= this.texts.length) return;
    let speaker = this.texts[this.currentTextIndex].speaker;
    
    let boxW = width * 0.9;
    let boxH = 160;
    let boxX = width / 2 - boxW / 2;
    let boxY = height - boxH - 50;
    
    //텍스트 박스 수정
    //noStroke();
    // fill(60, 220);
    // rect(boxX, boxY, boxW, boxH, 20);
    fill(120);
    rect(0, height - height / 4, width, height / 4);

    if (speaker === "김철수") {
      fill(60, 215);
      noStroke();
      rectMode(CENTER);

      rect(boxX + 235, boxY + 5, 200, 50, 10);
      rectMode(CORNER);
      fill(255);
      textSize(30);
      textAlign(CENTER, CENTER);
      text("김철수", boxX + 235, boxY);
    }else if (speaker ==="???") {
      fill(60, 215);
      noStroke();
      rectMode(CENTER);
      rect(boxX + 235, boxY + 5, 200, 50, 10);
      rectMode(CORNER);
      fill(255);
      textSize(30);
      textAlign(CENTER, CENTER);
      text("???", boxX + 235, boxY); 
    }
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(30);
    let textMargin = 30;
    
    text(this.displayedText, boxX + textMargin, boxY + textMargin + 30, boxW - textMargin * 2, boxH - textMargin * 2);
  }
// 김철수 이미지 비율 유지하면서 표시하는 함수
drawChulSu() {
  let chulSuW = 500;
  let chulSuH = this.chulSuCommon.height * (chulSuW / this.chulSuCommon.width);
  let imgX = 80;
  let imgY = height - height / 4 - chulSuH + 200;
  image(this.chulSuCommon, imgX, imgY, chulSuW, chulSuH);
}
drawChulSuMonster() {
  let chulSuMonW = 500;
  let chulSuMonH = this.chulSuMonster.height * (chulSuMonW / this.chulSuMonster.width);
  let imgX = 80;
  let imgY = height - height / 4 -chulSuMonH + 200;
  image(this.chulSuMonster, imgX, imgY, chulSuMonW, chulSuMonH);

  for (let i = 0; i < 3; i++) {
     let offsetX = random(-10, 10); // 좌우 흔들림 확대
    let offsetY = random(-8, 8);   // 상하 흔들림 확대
    let tintColor;
    if (i === 0) tintColor = [255, 0, 0];     // 빨강
    else if (i === 1) tintColor = [0, 255, 255]; // 청록
    else tintColor = [255, 255, 255];         // 흰색

    tint(...tintColor, 160); // 투명도 조절
    image(this.chulSuMonster, imgX + offsetX, imgY + offsetY, chulSuMonW, chulSuMonH);
  }

  noTint();

  // 노이즈/글리치용 슬라이스 라인 효과 추가
  for (let i = 0; i < 5; i++) {
    let sliceY = int(random(imgY, imgY + chulSuMonH));
    let sliceH = int(random(5, 20));
    let glitchOffset = int(random(-20, 20));

    copy(
      this.chulSuMonster,
      0, sliceY - imgY, this.chulSuMonster.width, sliceH,
      imgX + glitchOffset, sliceY, chulSuMonW, sliceH
    );
  }
}


  drawTyping() {
    // 텍스트가 모두 끝났으면 더 이상 처리하지 않음
  if (this.currentTextIndex >= this.texts.length) return;
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
    if (this.currentTextIndex >= this.texts.length) return;
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

    if (this.currentTextIndex >= this.texts.length) return;

    let currentObj = this.texts[this.currentTextIndex];
    if (currentObj.lockInput) return;

    if (this.isTyping) {
      this.displayedText = this.fullText;
      this.charIndex = this.fullText.length;
      this.isTyping = false;
      this.clickReady = true;
    } else if (this.clickReady) {
      this.currentTextIndex ++;
      if (this.currentTextIndex < this.texts.length) {
        this.loadNextText();
      } else {
        this.endc1Reached = true;
        stage ++;
        return;
      }
    }
  }
}
