let myFont;
let imgManual, imgResearcher, imgCompany;

let stage = 0;
let buttonX, buttonY, buttonW, buttonH;

let part = 0;       // 현재 문장 인덱스
let linePart = 0;   // 현재 줄 인덱스
let letterCount = 0;  // 현재 줄에서 타자 친 글자 수

let lastTime = 0;
let typingSpeed = 120;  // 한 글자당 100ms
let waitTime = 1200;    // 문장 끝나고 기다리는 시간
let isWaiting = false;
let finishText = false;  

// 이미지 위치와 크기 변수
let researcherX, researcherY, researcherW, researcherH;
let manualX, manualY, manualW, manualH;

function preload() {
  myFont = loadFont('assets/fonts/DungGeunMo.ttf');
  imgManual =  loadImage("assets/매뉴얼.png");
  imgResearcher = loadImage("assets/연구원.png");
  imgCompany = loadImage("assets/우리 회사다! 반짝.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(myFont);
  textSize(35);
  textAlign(CENTER, CENTER);
  
  myInput = createInput();

  resizeImagesAndPositions(); // 초기 위치 계산
}

function draw() {
  background(0);
  cursor(ARROW);
  
  switch (stage) {
    case 0: 
      //연구원
      image(imgResearcher, researcherX, researcherY, researcherW, researcherH);

      // 화면 아래 회색 박스
      fill(120);
      rect(0, height - height / 4, width, height / 4);
      
      fill(0);
      typeText([
        [myInput.value() + " 씨 맞으신가요?"],
        ["저는 연구 부서의 (   ) 연구원이라고 합니다."],
        ["해야 할 업무를 설명해드리겠습니다.", "이전에 안내드린 바와 같이, 업무는 간단할 거에요."],
        ["컴퓨터 화면에 그날 해야 할 업무 리스트가 있습니다.", "순서대로 업무를 수행해주시기만 하면 돼요.", "각 업무에 대한 설명은 업무를 시작할 때 주어지니 참고해주세요."],
        ["따라주셔야 할 매뉴얼은 여기 있습니다!"],
        ["매뉴얼을 따르지 않아 발생하는 문제는 회사에서 책임지지 않으므로,", "업무를 수행하며 반드시 매뉴얼을 지켜주시길 바랍니다."]
      ]);
      break;
  
    case 1:
      image(imgResearcher, researcherX, researcherY, researcherW, researcherH);

      //매뉴얼
      image(imgManual, manualX, manualY, manualW, manualH);

      // 화면 아래 회색 박스
      fill(120);
      rect(0, height - height / 4, width, height / 4);
      
      fill(30);
      
      typeText([
        ["이제부터 [m]키를 눌러 매뉴얼을 확인할 수 있습니다."],
      ]);
      break;
  }
}

function mouseClicked() {
  if (finishText) {
    stage++;
    part = 0;
    linePart = 0;
    letterCount = 0;
    isWaiting = false;
    finishText = false;
    lastTime = millis();

    resizeImagesAndPositions();
  }
}

function typeText(texts) {
  let lines = texts[part];
  let boxTop = height - height / 4;
  let base = min(width, height);
  let lineHeight = base * 0.04;
  let totalTextHeight = lines.length * lineHeight;
  let startY = boxTop + (height / 4 - totalTextHeight) / 2 + 10;

  for (let i = 0; i < lines.length; i++) {
    let txtToShow = "";
    if (i < linePart) {
      txtToShow = lines[i];
    } else if (i === linePart) {
      txtToShow = lines[i].substring(0, letterCount);
    }
    text(txtToShow, width / 2, startY + i * lineHeight);
  }

  if (!isWaiting && millis() - lastTime > typingSpeed) {
    if (letterCount < lines[linePart].length) {
      letterCount++;
      lastTime = millis();
    } else {
      linePart++;
      letterCount = 0;
      lastTime = millis();
      if (linePart >= lines.length) {
        isWaiting = true;
      }
    }
  }

  if (isWaiting && millis() - lastTime > waitTime) {
    if (part < texts.length - 1) {
      part++;
      linePart = 0;
      letterCount = 0;
      isWaiting = false;
      lastTime = millis();
    } else {
      finishText = true;
    }
  }
}

function resizeImagesAndPositions() {
  let centerX = width * 0.2;
  researcherW = width * 0.4;
  researcherH = researcherW * (imgResearcher.height / imgResearcher.width);
  researcherX = centerX - researcherW / 2;
  researcherY = height * 0.65 - researcherH / 2;

  manualH = height * 0.7;
  manualW = manualH * (imgManual.width / imgManual.height);
  manualX = width / 2 - manualW / 2;
  manualY = height * 0.1;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  adjustTextSize();
  resizeImagesAndPositions();
}

function adjustTextSize() {
  let base = min(width, height);
  textSize(base * 0.025); // 비율 기반 글자 크기
}