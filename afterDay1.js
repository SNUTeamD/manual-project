class AfterDay1 {
  constructor() {
    this.phase = 1;
    this.phaseStartTime = 0;
    this.fadeAlpha = 0;
    this.autoAdvanceTime = null;
    this.autoDelay = 1500;
    this.lockInput = false;

    this.texts = [
  { speaker: "PLAYER", text: "(무언가 이상한 보고서다)"},
  { speaker: "???", text: "어! 잠시만요!!" },
  { speaker: "PLAYER", text: "(갑자기 나타난 저 여자가 내 책상 위의 보고서를 뺏었다.)" },
  { speaker: "???", text: "아 ... 이게 왜 여기있지 ..." },
  { speaker: "???", text: "이건 오늘 작업 안하셔도 돼요." },
  { speaker: "도재인", text: "제 소개가 늦었네요. 인사이동부의 도재인이라고 합니다." },
  { speaker: "PLAYER", text: "방금 보고서에 이상한 게 보였는데요..?" },
  { speaker: "도재인", text: "네? 무슨 말씀인지 모르겠어요."},
  { speaker: "도재인", text: "제가 작업해야 하는 보고서인데, 실수로 이쪽으로 넘겨졌나 봐요." },
  { speaker: "도재인", text: "오늘은 데이터 처리를 안 하셔도 됩니다."},
  { speaker: "도재인", text: "좋은 하루 되세요." },
  { speaker: "PLAYER", text: "갑자기 나타나더니 일을 뺏어갔다." },
  { speaker: "PLAYER", text: "그만두고 싶다는 생각이 다시 들기 시작했다." },
  { speaker: "PLAYER", text: "뭐 그래도 해야할 일이 줄은 거니까 .. 좋은 건가?" }
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
    this.janeMonsterShown = false;
    this.afterDay1 = null;
  }

  preload() {
    this.afterDay1 = loadImage('assets/Day1이 끝나고.png');
    this.janeCommon = loadImage('assets/도재인(생기있음).png');
    this.janeMonster = loadImage('assets/도재인 괴인.png');
  }

  start() {
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

  let imgW = this.afterDay1.width * scale;
  let imgH = this.afterDay1.height * scale;

  tint(255, this.fadeAlpha);
  imageMode(CENTER);
  image(this.afterDay1, width / 2, height / 2, imgW, imgH);
  imageMode(CORNER); // 다른 이미지들에 영향 안 주게 복원

    }else if(this.currentTextIndex >4 && this.currentTextIndex <=8 ){
      this.drawJane();
    }
    //재인 괴수화 코드
    // 👾 괴인 이미지 잠깐 등장
if (this.showJaneMonster) {
  let elapsed = millis() - this.janeMonsterStartTime;
  if (elapsed < 300) {
    this.drawJaneMonster();
  } else {
    this.showJaneMonster = false;
    this.janeMonsterShown = true; // ✅ 더 이상 안 나오게
  }
}

// ✅ currentTextIndex가 7일 때 한 번만 showJaneMonster를 true로
if (this.currentTextIndex === 8 && !this.janeMonsterShown && !this.showJaneMonster) {
  this.showJaneMonster = true;
  this.janeMonsterStartTime = millis();
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
    fill(120);
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
    }else if (speaker ==="???") {
      fill(60, 215);
      noStroke();
      rectMode(CENTER);
      rect(boxX + 215, boxY + 15, 200, 50, 10);
      rectMode(CORNER);
      fill(255);
      textSize(30);
      textAlign(CENTER, CENTER);
      text("???", boxX + 215, boxY + 10); 
    }
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(35);
    let textMargin = 30;
    
    text(this.displayedText, boxX + textMargin, boxY + textMargin + 30, boxW - textMargin * 2, boxH - textMargin * 2);
  }
// 도재인 이미지 비율 유지하면서 표시하는 함수
drawJane() {
  let janeW = 550;
  let janeH = this.janeCommon.height * (janeW / this.janeCommon.width);
  let imgX = 20;
  let imgY = height - height / 4 - janeH + 185;
  image(this.janeCommon, imgX, imgY, janeW, janeH);
}
drawJaneMonster() {
  let janeMonW = 550;
  let janeMonH = this.janeMonster.height * (janeMonW / this.janeMonster.width);
  let imgX = 20;
  let imgY = height - height / 4 -janeMonH + 185;
  image(this.janeMonster, imgX, imgY, janeMonW, janeMonH);

  for (let i = 0; i < 3; i++) {
    let offsetX = random(-5, 5); // 좌우 랜덤 흔들림
    let offsetY = random(-5, 5);
    let tintColor;
    if (i === 0) tintColor = [255, 0, 0];     // 빨강
    else if (i === 1) tintColor = [0, 255, 255]; // 청록
    else tintColor = [255, 255, 255];         // 흰색

    tint(...tintColor, 180); // 투명도 조절
    image(this.janeMonster, imgX + offsetX, imgY + offsetY, janeMonW, janeMonH);
  }

  noTint(); // 이후 이미지에 영향 안 주게
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
