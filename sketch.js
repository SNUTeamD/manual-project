let myFont;
let imgManual, imgResearcher, imgCompany, imgCode;

let stage = 5;

let part = 0;
let linePart = 0;
let letterCount = 0;

let lastTime = 0;
let typingSpeed = 120;
let waitTime = 1200;
let isWaiting = false;
let finishText = false;

let showManual = false;

let nameInput, codeInput;

let error1;
let imgError;//에러1유형 이미지
let errorImg;//에러2번 이미지

function preload() {
  myFont = loadFont('assets/DungGeunMo.ttf');
  imgManual = loadImage("assets/매뉴얼.png");
  imgResearcher = loadImage("assets/연구원.png");
  imgCompany = loadImage("assets/우리 회사다! 반짝.png");
  activeFileIcon = loadImage("assets/파일 아이콘.png");
  inactiveFileIcon = loadImage("assets/파일 아이콘 비활성화.png");
  activeDocIcon = loadImage("assets/문서 아이콘.png");
  inactiveDocIcon = loadImage("assets/문서 아이콘 비활성화.png");
  activeSatIcon = loadImage("assets/위성 아이콘.png");
  inactiveSatIcon = loadImage("assets/위성 아이콘 비활성화.png");
  imgCode = loadImage("assets/모스부호.jpg");
  imgError = loadImage('assets/에러창.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(myFont);
  textSize(35);
  textAlign(CENTER, CENTER);

  setupInputs();
  
// 에러1 유형의의 텍스트 지정
  error1 = new Error1(
    imgError,
    "From: 구조언어부 백업담당 T\n To: 감정조정실 S외 2명\nSubject: 그거 진짜 지운 애 있음ㅋㅋ\n진짜로 그거 날려버린 직원 나왔어요.\n마지막에 충격받은 표정이 꽤 웃겨서 추천함.\n자기 눈으로 세상 본 줄 아는 표정 아시죠? (...)",  // 30초 이전에 표시할 텍스트
    "이렇게무시하다간정말필요한것도놓칠걸?\n"  // 30초 이후에 표시할 텍스트
  );

  error2 = new Error1(
    imgError,
    "From: 연구원 B(12팀)\n To: 수거조정실 전체\nSubject: 오늘 삭제 처리 후 커피?\n오늘 027 반응 참 재밌었죠.\n끝나고 A-구역 자동판매기 앞에서 모일까요?\n신상 나왔다던데, 어제 것보다 진하면 좋겠(...)", // 30초 이전에 표시할 텍스트
    "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\n"  // 30초 이후에 표시할 텍스트
  );

  error3 = new Error1(
    imgError,
    "From: 실감부 U\nTo: 정제실 3층 협의라인\nSubject: 점심 감각세트 예약했어요\n'향수 + 미열 + 저항감' 패키지로 해놨어요.\n그나저나 027이 자꾸 같은 이름을 떠올린대요.\n이전 루프에선 그런 거 없었는데. 그만 소각(...)", // 30초 이전에 표시할 텍스트
    "아 잘못보냈다ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\n"  // 30초 이후에 표시할 텍스트
  );
}

function setupInputs() {
  nameInput = createInput();
  nameInput.size(320, 50);
  nameInput.position(width / 2 - 210, height / 2);
  styleInput(nameInput, '이름을 입력해주세요', '30px', 'red');

  codeInput = createInput();
  codeInput.size(500, 60);
  codeInput.position(width / 2 - 310, height - 80);
  styleInput(codeInput, '정답을 입력하세요', '30px', 'red');
  codeInput.hide();

  const css = `input::placeholder { color: white !important; opacity: 1; }`;
  const style = createElement('style', css);
  document.head.appendChild(style.elt);
}

function styleInput(input, placeholder, fontSize, bg = 'black') {
  input.style('font-family', 'DungGeunMo');
  input.style('font-size', fontSize);
  input.style('background', bg);
  input.style('border', 'none');
  input.style('color', 'white');
  input.style('text-align', 'center');
  input.attribute('placeholder', placeholder);
}
//모스 정답 함수
function checkMorseAnswer() {
  const codeCheck = codeInput.value().trim();
  if (stage ===9 && codeCheck === "제약") {
    stage++;
    console.log("정답!");
    codeInput.hide();
  } else {
    resultMessage = "틀렸습니다. 다시 시도하세요.";
    console.log("실패");
  }
}

function draw() {
  background(0);
  cursor(ARROW);

  drawManual();

  if (stage === 0) {
  nameInput.show();
  codeInput.hide();
  } else if (stage === 9) {
  nameInput.hide();
  codeInput.show();
  } else {
  nameInput.hide();
  codeInput.hide();
  }

  switch (stage) {
    case 0: 
      fill(255);
      textSize(120);
      text('MANUAL', width / 2, height / 2 - 100);

      fill(255, 0, 0);
      rect(width / 2 + 130, height / 2 - 1.5, 80, 53);

      let isHovering =
        mouseX >= width / 2 + 130 &&
        mouseX <= width / 2 + 210 &&
        mouseY >= height / 2 - 1.5 &&
        mouseY <= height / 2 + 51.5;

      if (isHovering) {
        fill(255, 80, 80); // 연한 빨강
        cursor(HAND); // 커서 손 모양으로
      } else {
        fill(255, 0, 0); // 기본 빨강
        cursor(ARROW); // 기본 커서
      }
      
      rectMode(CORNER);
      rect(width / 2 + 130, height / 2, 80, 53);
      
      fill(255);
      textSize(30);
      textAlign(CENTER, CENTER);
      text('확인', width / 2 + 170, height / 2 + 22);
      break;
  
    case 1:
      // 회사 배경 비율 유지하면서 표시
      let companyW = 1000;
      let companyH = imgCompany.height * (companyW / imgCompany.width);
      image(imgCompany, (width - companyW) / 2, 0, companyW, companyH);
      
      // 화면 아래 회색 박스
      fill(120);
      rect(0, height - height / 4, width, height / 4);
      
      fill(0);
      typeText([
        [" 드디어 오늘이 왔다! "],
        ["내가 다니는 제약회사에서 진행하고 있는 프로젝트는", "인간의 감염병을 치료하는 백신을 중점적으로 연구한다고 들었다."], 
        ["신입이니까 초반 며칠은 자잘한 서류 처리 작업을 맡겠지만", "프로젝트를 진행하다보면 중대한 업무도 맡게 되겠지."], 
        ["질병의 치료라는 중대한 사명을 가지고 있는 만큼","'절대로 매뉴얼을 따라야 한다’는 선배의 말을 반드시 명심해야 한다."], 
        ["후... 부담감과 기대감에 떨려오지만, 잘 적응해낼 수 있을거다."], 
        ["Click to continue ···"]
      ]);
      break;

    case 2:
      drawResearcher();

      // 화면 아래 회색 박스
      fill(120);
      rect(0, height - height / 4, width, height / 4);

      fill(0);
      typeText([
        [nameInput.value() + " 씨 맞으신가요?"],
        ["저는 연구 부서의 김철수 연구원이라고 합니다."],
        ["해야 할 업무를 설명해 드리겠습니다."],
        ["이전에 안내드린 바와 같이, 업무는 간단합니다."],
        ["컴퓨터 화면에 그날 해야 할 업무 리스트가 제시되어 있을 겁니다."],
        ["순서대로 업무를 수행해주시면 됩니다."],
        ["따라주셔야 할 매뉴얼을 드리겠습니다."],
        ["매뉴얼을 따르지 않아 발생하는 문제는 회사에서 책임지지 않으므로,", "업무를 수행하면서 이를 반드시 지켜주시기 바랍니다."]
      ]);

      if (finishText) {
        stage ++; // stage 증가
        resetTyping(); // 텍스트 초기화
      }

      break;
    
    case 3:
      drawResearcher();
      // 화면 아래 회색 박스
      fill(120);
      rect(0, height - height / 4, width, height / 4);

      fill(255,0,0);
      textStyle(BOLD);
      typeText([
        [".. 반드시 매뉴얼을 따라주셔야 합니다."]
      ]);
      
      break;

        case 4:
      drawResearcher();
      // 화면 아래 회색 박스
      fill(120);
      rect(0, height - height / 4, width, height / 4);

      fill(30);
      typeText([
        ["이제부터 [m]키를 눌러 매뉴얼을 확인할 수 있습니다."],
      ]);
      
        break;

      case 5:
      fill(255);
      textSize(70)
      text("Day 1", width / 2, height / 2 - 50);
      textSize(30);
      text("Click to continue ···", width / 2, height / 2 + 50);
      finishText = true;
      
        break;

      case 6:
        fill(150, 150, 255);
        rect(width - 450, 50, 400, 200);
        fill(0);
        text("오늘의 할 일", width - 250, 85);
        text("1. 파일 정리", width - 250, 125);
        text("2. 정크 데이터 처리", width - 250, 165);
        text("3. 코드 해석", width - 250, 205);

        drawIcons();

        break;

      case 7:
        fill(150, 150, 255);
        rect(width - 450, 50, 400, 200);
        fill(0);
        text("오늘의 할 일", width - 250, 85);
        text("1. 파일 정리", width - 250, 125);
        text("2. 정크 데이터 처리", width - 250, 165);
        text("3. 코드 해석", width - 250, 205);

        strokeWeight(3);
        line(width - 350, 130, width - 150, 130);

        drawIcons();

        error1.display();

        break;

      case 8:
        fill(150, 150, 255);
        rect(width - 450, 50, 400, 200);
        fill(0);
        textSize(30);
        text("오늘의 할 일", width - 250, 85);
        text("1. 파일 정리", width - 250, 125);
        text("2. 정크 데이터 처리", width - 250, 165);
        text("3. 코드 해석", width - 250, 205);
        
        strokeWeight(3);
        line(width - 350, 130, width - 150, 130);
        line(width - 400, 170, width - 100, 170);
        
        drawIcons();

        break;

      case 9:
        imageMode(CENTER);
        rectMode(CENTER);

        image(imgCode, width / 2, height / 2  + 50, imgCode.width / 5, imgCode.height / 5);
        
        fill(255);
        strokeWeight(1);
        rect(width / 2, height * 0.05, width * 0.75, height * 0.08);

        fill(0);
        textSize(windowWidth * 0.03);
        text("모스부호를 해독해서 적절한 글을 입력하시오", width / 2, height * 0.06 - 15);
        fill(255);
        text(".--. -.-- -.- .. .-..", width / 2, height * 0.15);

        fill(255, 0, 0);
        noStroke();
        rect(width / 2 + 250, height - 50, 80, 62);

        fill(255);
        textSize(30);
        text("확인", width / 2 + 250, height - 52);
        //정답 : 제약

        break;
      case 100:
      fill(255);
      textSize(70)
      text("Day 2", width / 2, height / 2 - 50);
      textSize(30);
      text("Click to continue ···", width / 2, height / 2 + 50);
      finishText = true;
      
        break;

      case 101:
        fill(150, 150, 255);
        rect(width - 450, 50, 400, 200);
        fill(0);
        text("오늘의 할 일", width - 250, 85);
        text("1. 파일 정리", width - 250, 125);
        text("2. 정크 데이터 처리", width - 250, 165);
        text("3. 코드 해석", width - 250, 205);

        drawIcons();
        error2.display();

        break;

      case 102:
        fill(150, 150, 255);
        rect(width - 450, 50, 400, 200);
        fill(0);
        text("오늘의 할 일", width - 250, 85);
        text("1. 파일 정리", width - 250, 125);
        text("2. 정크 데이터 처리", width - 250, 165);
        text("3. 코드 해석", width - 250, 205);

        strokeWeight(3);
        line(width - 350, 130, width - 150, 130);

        drawIcons();

        break;

      case 103:
        fill(150, 150, 255);
        rect(width - 450, 50, 400, 200);
        fill(0);
        textSize(30);
        text("오늘의 할 일", width - 250, 85);
        text("1. 파일 정리", width - 250, 125);
        text("2. 정크 데이터 처리", width - 250, 165);
        text("3. 코드 해석", width - 250, 205);
        
        strokeWeight(3);
        line(width - 350, 130, width - 150, 130);
        line(width - 400, 170, width - 100, 170);
        
        drawIcons();

        break;

      case 200:
      fill(255);
      textSize(70)
      text("Day 3", width / 2, height / 2 - 50);
      textSize(30);
      text("Click to continue ···", width / 2, height / 2 + 50);
      finishText = true;
      
        break;

      case 201:
        fill(150, 150, 255);
        rect(width - 450, 50, 400, 200);
        fill(0);
        text("오늘의 할 일", width - 250, 85);
        text("1. 파일 정리", width - 250, 125);
        text("2. 정크 데이터 처리", width - 250, 165);
        text("3. 코드 해석", width - 250, 205);

        drawIcons();
        error3.display();

        break;

      case 202:
        fill(150, 150, 255);
        rect(width - 450, 50, 400, 200);
        fill(0);
        text("오늘의 할 일", width - 250, 85);
        text("1. 파일 정리", width - 250, 125);
        text("2. 정크 데이터 처리", width - 250, 165);
        text("3. 코드 해석", width - 250, 205);

        strokeWeight(3);
        line(width - 350, 130, width - 150, 130);

        drawIcons();

        break;

      case 203:
        fill(150, 150, 255);
        rect(width - 450, 50, 400, 200);
        fill(0);
        textSize(30);
        text("오늘의 할 일", width - 250, 85);
        text("1. 파일 정리", width - 250, 125);
        text("2. 정크 데이터 처리", width - 250, 165);
        text("3. 코드 해석", width - 250, 205);
        
        strokeWeight(3);
        line(width - 350, 130, width - 150, 130);
        line(width - 400, 170, width - 100, 170);
        
        drawIcons();

        break;
  }
}

function mouseClicked() {
  if (stage === 0) {
    if (
      mouseX >= width / 2 + 130 &&
      mouseX <= width / 2 + 210 &&
      mouseY >= height / 2 - 1.5 &&
      mouseY <= height / 2 + 51.5
    ) {
      stage ++;
      myInput.hide();
    }
  } else if (stage == 1 || stage == 3) {
    if (finishText) {
      stage ++;
      resetTyping();
    }
  } else if (stage == 4 || stage == 5|| stage==100 || stage ==200) {
    stage ++;
  } else if (stage >= 6 && stage <= 8 || stage>=101&&stage<=103 || stage>=201&&stage<=203) {
  let layout = getIconLayout();
  let activeKey = getActiveIconName();
  let icon = layout[activeKey];
  let y = layout.y;
  let iconH = layout.iconH;

    if (
    mouseX >= icon.x && mouseX <= icon.x + icon.w &&
    mouseY >= y && mouseY <= y + iconH
  ) {
    stage++;
    }
  
  }else  if(stage === 9){
    if (
      mouseX >= width / 2 + 210 &&
      mouseX <= width / 2 + 290 &&
      mouseY >= height - 81 &&
      mouseY <= height - 19 
    ){
      checkMorseAnswer()
    }
  }
}


function typeText(texts) {

  let lines = texts[part];

  let boxTop = height - height / 4;
  let lineHeight = 45;
  let totalTextHeight = lines.length * lineHeight;
  let startY = boxTop + (height / 4 - totalTextHeight) / 2 + 15;

  // 줄별 출력: 이전 줄은 전체, 현재 줄은 일부, 다음 줄은 빈 문자열
  for (let i = 0; i < lines.length; i++) {
    let txtToShow;
    if (i < linePart) {
      txtToShow = lines[i];  // 이미 타자 완료한 줄
    } else if (i === linePart) {
      txtToShow = lines[i].substring(0, letterCount);  // 타자 진행 중인 줄
    } else {
      txtToShow = "";  // 아직 타자 시작 안 한 줄
    }
    text(txtToShow, width / 2, startY + i * lineHeight);
  }

  if (!isWaiting && millis() - lastTime > typingSpeed) {
    if (letterCount < lines[linePart].length) {
      letterCount++;
      lastTime = millis();
    } else {
      // 현재 줄 타자 끝 → 다음 줄로
      linePart++;
      letterCount = 0;
      lastTime = millis();

      if (linePart >= lines.length) {
        // 모든 줄 타자 끝 → 대기 시작
        isWaiting = true;
      }
    }
  }

  // 문장 전체 출력 후 잠시 기다렸다 다음 파트로 이동
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

function resetTyping() {
  part = 0;
  linePart = 0;
  letterCount = 0;
  isWaiting = false;
  finishText = false;
  lastTime = millis();
}

function drawResearcher() {
  // 연구원 이미지 비율 유지하면서 표시
  let researcherW = 500;
  let researcherH = imgResearcher.height * (researcherW / imgResearcher.width);
  let imgX = 80;
  let imgY = height - height / 4 - researcherH + 200;
  image(imgResearcher, imgX, imgY, researcherW, researcherH);
}

function drawManual() {
  if (!showManual) return;
  manualH = height * 0.8;
  manualW = manualH * (imgManual.width / imgManual.height);
  manualX = width / 2 - manualW / 2;
  manualY = height * 0.05;
  image(imgManual, manualX, manualY, manualW, manualH);
}

function keyPressed() {
  if (stage >= 0 && key === 'm') {
    showManual = !showManual;
  }
}

function getIconLayout() {
  let iconH = 300;
  let gap = 100;

  let fileW = activeFileIcon.width * (iconH / activeFileIcon.height);
  let docW = activeDocIcon.width * (iconH / activeDocIcon.height);
  let satW = activeSatIcon.width * (iconH / activeSatIcon.height);

  let totalW = fileW + docW + satW + gap * 2;
  let startX = (width - totalW) / 2;
  let y = height - 450;

  return {
    iconH,
    gap,
    file: { x: startX, w: fileW },
    doc: { x: startX + fileW + gap, w: docW },
    sat: { x: startX + fileW + gap + docW + gap, w: satW },
    y
  };
}

function getActiveIconName() {
  if (stage === 6 | stage ===101 | stage === 201 ) return "file";
  if (stage === 7 | stage ===102 | stage === 202 ) return "doc";
  if (stage === 8 | stage ===103 | stage === 203 ) return "sat";
  return null;
}

function drawIcons() {
  let layout = getIconLayout();
  let { iconH, file, doc, sat, y } = layout;

  // 각 아이콘에 대한 정보 정리
  let icons = [
    {
      key: "file",
      active: activeFileIcon,
      inactive: inactiveFileIcon,
      layout: file
    },
    {
      key: "doc",
      active: activeDocIcon,
      inactive: inactiveDocIcon,
      layout: doc
    },
    {
      key: "sat",
      active: activeSatIcon,
      inactive: inactiveSatIcon,
      layout: sat
    }
  ];

  let activeKey = getActiveIconName();



  for (let icon of icons) {
    let isHovering =
      mouseX >= icon.layout.x &&
      mouseX <= icon.layout.x + icon.layout.w &&
      mouseY >= y &&
      mouseY <= y + iconH;

    let img;

    if (icon.key === activeKey) {
      img = icon.active;
    } else {
      img = icon.inactive;
    }


    image(img, icon.layout.x, y, icon.layout.w, iconH);

    if (icon.key === activeKey && isHovering) {
      cursor(HAND);
    }
  }
}
