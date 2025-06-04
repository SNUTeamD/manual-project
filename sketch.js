// ====== 전역 변수 설정 ======
// 폰트, 이미지 등 기본 변수들 선언
let myFont;
let imgManual, imgResearcher, imgCompany, imgCode;
let activeFileIcon, inactiveFileIcon;
let activeDocIcon, inactiveDocIcon;
let activeSatIcon, inactiveSatIcon;

let stage = 0;

// 텍스트 타자 효과 관련 변수
let part = 0;
let linePart = 0;
let letterCount = 0;
let lastTime = 0;
let typingSpeed = 120;
let waitTime = 1200;
let isWaiting = false;
let finishText = false;

let showManual = false; // 매뉴얼 보여줄지 여부

// 사용자 입력용 인풋창
let nameInput, codeInput;

let sentenceObjs = [];
let isDragging = false;
let dragStartX, dragStartY, dragEndX, dragEndY;
let resultMessage = "";
let lineHeight = 45;

// 에러 관련 변수
let error1;
let imgError_1; // 에러 1 유형 이미지
let imgError_2; // 에러 2 유형 이미지
let errors = [];
const NUM_ERRORS = 7;

let endingB; // 엔딩 B
let endingC; // 엔딩 C

function preload() {
  // 폰트 불러오기
  myFont = loadFont('assets/DungGeunMo.ttf');

  // 각종 이미지 불러오기
  imgManual = loadImage("assets/매뉴얼.png");
  imgResearcher = loadImage("assets/연구원.png");
  imgCompany = loadImage("assets/우리 회사다! 반짝.png");
  imgCode = loadImage("assets/모스부호.jpg");

  // 아이콘들 (활성/비활성) 불러오기
  activeFileIcon = loadImage("assets/파일 아이콘.png");
  inactiveFileIcon = loadImage("assets/파일 아이콘 비활성화.png");
  activeDocIcon = loadImage("assets/문서 아이콘.png");
  inactiveDocIcon = loadImage("assets/문서 아이콘 비활성화.png");
  activeSatIcon = loadImage("assets/위성 아이콘.png");
  inactiveSatIcon = loadImage("assets/위성 아이콘 비활성화.png");

  // 에러 이미지 불러오기
  imgError_1 = loadImage('assets/에러창.png');
  imgError_2 = loadImage('assets/에러창2.png');
  endingB = new EndingB();
  endingC = new EndingC();
  endingB.preload();
  endingC.preload();
}


// ====== 초기 설정 ======
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  textFont(myFont);
  textSize(35);
  textAlign(CENTER, CENTER);

  setupInputs();
  
// 에러 1 유형의 텍스트 지정
  error1 = new Error1(
    imgError_1,
    "From: 구조언어부 백업담당 T\n To: 수거조정실 S외 2명\nSubject: 그거 진짜 지운 애 있음ㅋㅋ\n진짜로 그거 날린 직원 나왔어요. 영상도 첨부함!\n마지막에 충격받은 표정이 꽤 웃겨서 추천함.\n자기 눈으로 세상 본 줄 아는 표정 아시죠? (...)",  // 30초 이전에 표시할 텍스트
    "이렇게무시하다간정말필요한것도놓칠걸?\n"  // 30초 이후에 표시할 텍스트
  );

  error2 = new Error1(
    imgError_1,
    "From: 연구원 B(12팀)\n To: 수거조정실 전체\nSubject: 오늘 삭제 처리 후 커피?\n오늘 027 반응 참 재밌었죠.\n끝나고 A-구역 자동판매기 앞에서 모일까요?\n신상 나왔다던데, 어제 것보다 진하면 좋겠(...)", // 30초 이전에 표시할 텍스트
    "ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\n"  // 30초 이후에 표시할 텍스트
  );

  error3 = new Error1(
    imgError_1,
    "From: 실감부 U\nTo: 정제실 3층 협의라인\nSubject: 점심 감각세트 예약했어요\n'향수 + 미열 + 저항감' 패키지로 해놨어요.\n그나저나 027이 자꾸 같은 이름을 떠올린대요.\n이전 루프에선 그런 거 없었는데. 그만 소각(...)", // 30초 이전에 표시할 텍스트
    "아 잘못보냈다ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\n"  // 30초 이후에 표시할 텍스트
  );

  //엔딩 C 초기화
  endingC.start();
}


// ====== 입력창 생성 및 스타일 지정 ======
function setupInputs() {
  // 이름 입력창
  nameInput = createInput();
  nameInput.size(320, 50);
  nameInput.position(width / 2 - 210, height / 2);
  styleInput(nameInput, '이름을 입력해주세요', '30px', 'red');

  // 모스부호 정답 입력창
  codeInput = createInput();
  codeInput.size(500, 60);
  codeInput.position(width / 2 - 310, height - 80);
  styleInput(codeInput, '정답을 입력하세요', '30px', 'red');
  codeInput.hide(); // 처음엔 숨김

  // placeholder 색상 흰색으로 커스텀
  const css = `input::placeholder { color: white !important; opacity: 1; }`;
  const style = createElement('style', css);
  document.head.appendChild(style.elt);
}

// ====== 입력창 스타일링 함수 ======
function styleInput(input, placeholder, fontSize, bg = 'black') {
  input.style('font-family', 'DungGeunMo');
  input.style('font-size', fontSize);
  input.style('background', bg);
  input.style('border', 'none');
  input.style('color', 'white');
  input.style('text-align', 'center');
  input.attribute('placeholder', placeholder);
}

// ====== 메인 화면 반복 그리기 ======
function draw() {
  background(0);
  cursor(ARROW);

  drawManual(); // 매뉴얼 표시

  // 입력창 보여줄 stage 설정
  if (stage === 0) {
    nameInput.show();
    codeInput.hide();
  } else if (stage === 10) {
    nameInput.hide();
    codeInput.show();
  } else {
    nameInput.hide();
    codeInput.hide();
  }

  switch (stage) {
    case 0:
      // 초기 화면: MANUAL + 확인 버튼
      fill(255);
      textSize(120);
      text('MANUAL', width / 2, height / 2 - 100);

      let btnX0 = width / 2 + 130;
      let btnY0 = height / 2;
      let btnW0 = 80;
      let btnH0 = 53;

      checkButton(btnX0, btnY0, btnW0, btnH0);
      rect(btnX0, btnY0, btnW0, btnH0);

      fill(255);
      textSize(30);
      textAlign(CENTER, CENTER);
      text('확인', width / 2 + 170, height / 2 + 24);
      break;

    case 1:
      // 회사 배경과 첫 소개 타자 출력
      let companyW = 1000;
      let companyH = imgCompany.height * (companyW / imgCompany.width);
      image(imgCompany, (width - companyW) / 2, 0, companyW, companyH);

      fill(120);
      rect(0, height - height / 4, width, height / 4);

      fill(0);
      typeText([
        [" 드디어 오늘이 왔다! "],
        /*["내가 다니는 제약회사에서 진행하고 있는 프로젝트는", "인간의 감염병을 치료하는 백신을 중점적으로 연구한다고 들었다."], 
        ["신입이니까 초반 며칠은 자잘한 서류 처리 작업을 맡겠지만", "프로젝트를 진행하다보면 중대한 업무도 맡게 되겠지."], 
        ["질병의 치료라는 중대한 사명을 가지고 있는 만큼","'절대로 매뉴얼을 따라야 한다’는 선배의 말을 반드시 명심해야 한다."], 
        ["후... 부담감과 기대감에 떨려오지만, 잘 적응해낼 수 있을거다."],*/
        ["Click to continue ···"]
      ]);
      break;

    case 2:
      // 연구원 등장, 이름 기반 환영 멘트
      drawResearcher();
      fill(120);
      rect(0, height - height / 4, width, height / 4);

      fill(0);
      typeText([
        [nameInput.value() + " 씨 맞으신가요?"],
        /*["저는 연구 부서의 김철수 연구원이라고 합니다."],
        ["해야 할 업무를 설명해 드리겠습니다."],
        ["이전에 안내드린 바와 같이, 업무는 간단합니다."],
        ["컴퓨터 화면에 그날 해야 할 업무 리스트가 제시되어 있을 겁니다."],
        ["순서대로 업무를 수행해주시면 됩니다."],
        ["따라주셔야 할 매뉴얼을 드리겠습니다."], */
        ["매뉴얼을 따르지 않아 발생하는 문제는 회사에서 책임지지 않으므로,", "업무를 수행하면서 이를 반드시 지켜주시기 바랍니다."]
      ]);

      if (finishText) {
        stage++;
        resetTyping();
      }

      break;
    
    case 3:
      drawResearcher();
      fill(120);
      rect(0, height - height / 4, width, height / 4);

      fill(255, 0, 0);
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
      // 바탕화면 1
      fill(150, 150, 255);
      rect(width - 450, 50, 400, 200);
      fill(0);
      text("오늘의 할 일", width - 250, 85);
      text("1. 파일 정리", width - 250, 125);
      text("2. 정크 데이터 처리", width - 250, 165);
      text("3. 코드 해석", width - 250, 205);

      // 아이콘 표시: 파일 아이콘만 활성화
      drawIcons();
      break;
    
    // 파일 정리 업무는 여기에 넣어주세요!!
    
    case 7:
      // 바탕화면 2
      fill(150, 150, 255);
      rect(width - 450, 50, 400, 200);
      fill(0);
      text("오늘의 할 일", width - 250, 85);
      text("1. 파일 정리", width - 250, 125);
      text("2. 정크 데이터 처리", width - 250, 165);
      text("3. 코드 해석", width - 250, 205);

      // 밑줄: 업무 1 완료 표시
      strokeWeight(3);
      line(width - 350, 130, width - 150, 130);

      drawIcons();
      break;

    case 8:
      background(0);

      if (sentenceObjs.length === 0) {
        let texts = [
          { text: "이번 프로젝트는 인공지능을 활용한 예측 모델을 개발하는 것이 목표이다.", isWrong: false },
          { text: "팀원 간의 협업을 위해 매주 정기적인 회의를 진행하고 있다.", isWrong: false },
          { text: "고양이는 간식을 매우 좋아한다. 특히 참치맛을 선호한다.", isWrong: true },
          { text: "데이터는 외부 기관으로부터 수집되며, 개인정보는 익명화 처리된다.", isWrong: false },
          { text: "향후에는 사용자 피드백 기반 개선도 고려할 예정이다.", isWrong: false }
        ];

        sentenceObjs = texts.map((t, i) => ({
          ...t,
          x: width / 2 - 400,
          y: 150 + i * lineHeight,
          state: "default"
        }));
      }

      error1.display();

      textSize(24);
      textAlign(LEFT, TOP);
      for (let s of sentenceObjs) {
        if (s.state === "correct") fill(0, 100, 255);
        else if (s.state === "wrong") fill(255, 50, 50);
        else fill(255);

        text(s.text, s.x, s.y);
      }

      if (isDragging) {
        noFill();
        stroke(200);
        rectMode(CORNERS);
        rect(dragStartX, dragStartY, mouseX, mouseY);
      }

      if (resultMessage) {
        fill(255, 0, 0);
        textSize(30);
        textAlign(CENTER, CENTER);
        text(resultMessage, width / 2, height - 100);
      }

      break;

    case 9:
      // 바탕화면 3
      textAlign(CENTER, CENTER);
      noStroke();
      rectMode(CORNER);
      textSize(30);
      fill(150, 150, 255);
      rect(width - 450, 50, 400, 200);
      fill(0);
      text("오늘의 할 일", width - 250, 85);
      text("1. 파일 정리", width - 250, 125);
      text("2. 정크 데이터 처리", width - 250, 165);
      text("3. 코드 해석", width - 250, 205);

      // 밑줄: 업무 1, 2 완료 표시
      stroke(0);
      strokeWeight(3);
      line(width - 350, 130, width - 150, 130);    // 1번 줄 완료
      line(width - 400, 170, width - 100, 170);    // 2번 줄 완료
      noStroke();

      // 아이콘 표시: 위성 아이콘만 활성화
      drawIcons();
      break;

    case 10:
      // Day 1 - 업무 3: 코드 해석
      image(imgCode, width / 2 - imgCode.width / 10, height / 2 + 50 - imgCode.height / 10, imgCode.width / 5, imgCode.height / 5);

      fill(255);
      textSize(windowWidth * 0.03);
      text("모스부호를 해독해서 적절한 글을 입력하시오", width / 2, height * 0.06 - 15);
      fill(255);
      text(".-- . -.- ..- ...- - --. -..", width / 2, height * 0.15);

      let btnX10 = width / 2 + 210;
      let btnY10 = height - 81;
      let btnW10 = 80;
      let btnH10 = 62;

      handleButtonHover(btnX10, btnY10, btnW10, btnH10);
      noStroke();
      rect(btnX10, btnY10, btnW10, btnH10);

      fill(255);
      textSize(30);
      text("확인", width / 2 + 250, height - 52);
        
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
        // case 0 전용 변수들
       if (typeof draw.errorIndex === 'undefined') {
        draw.errorIndex = 0;
        draw.lastErrorTime = millis();
        draw.interval = 200;
        draw.errorTexts = [
          "7. 도망쳐.",
          "6. [알수없는 오류입니다][알수없는 오류입니다]./[알수없는 오류입니다][알수없는 오류입니다]-",
          "5. 이제 어느 곳도 안전하지 않아./이걸본사람이있다면제발-/[알수없는 오류입니다][알수없는 오류입니다]-/[알수없는 오류입니다][알수없는 오류입니다]-",
          "4. 여기에는 인간이 아닌 누군가가 느껴져/[system error]./표시하는데 오류가 발생했습니다-",
          "3. 컴퓨터에서 Event Log를 시작하지 못했습니다./오류 확인을 위해 자세히보기를 눌러주세요-/오류ehdhkwnj./지침서를 유심히 봐주세요.",
          "2. 업무가 정상적으로 처리되지 않았습니다./컴퓨터를 종료하지 마세요-",
          "1. :( PC에 문제가 발생하여 다시 시작해야 합니다./일부 오류 정보를 수집하고 있습니다-/그런 다음 자동으로 다시 시작합니다./ 현재 15% 완료-"
        ];
       }

        if (draw.errorIndex < NUM_ERRORS && millis() - draw.lastErrorTime > draw.interval) {
        let relW = 0.4;
        let relH = relW * (imgError_2.height / imgError_2.width);
        let relX = random(0, 1 - relW);
        let relY = random(0, 1 - relH);

        let msg = draw.errorTexts[draw.errorIndex];
        errors.push(new ErrorWindow(imgError_2, relX, relY, relW, msg));

        draw.errorIndex++;
        draw.lastErrorTime = millis();
       }

        for (let e of errors) {
        e.display();
       }
        break;

      case 204:
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

      /*case 400:
          //엔딩 A
          ending
        break;
        case 500:
          drawResearcher();
          endingB.update();
          break;//엔딩 B

      case 600:
          // 엔딩 C
          endingC.update();
        break;

          

    }
  }

// 클릭 이벤트 처리
function mouseClicked() {
  if (error1 && error1.isClicked(mouseX, mouseY)) {
    stage = 500;
    return;
  }
    // 뒤에서부터 검사해서 삭제 시 인덱스 밀림 방지
  for (let i = errors.length - 1; i >= 0; i--) {
    if (errors[i].isXBtnClicked(mouseX, mouseY)) {
      errors.splice(i, 1);

      // 모든 창 닫혔는지 확인
      if (errors.length === 0) {
        stage = 204;  // 원하는 다음 스테이지 번호로 바꾸세요
      }

      return;  // 한 번에 하나만 닫기
    }

  }
  if (stage === 0) {
    // 확인 버튼 클릭 시 다음 stage로
    if (
      mouseX >= width / 2 + 130 &&
      mouseX <= width / 2 + 210 &&
      mouseY >= height / 2 - 1.5 &&
      mouseY <= height / 2 + 51.5
    ) {
      stage++;
      nameInput.hide();
    }
  } else if (stage == 1 || stage == 3) {
    if (finishText) {
      stage++;
      resetTyping();
    }
  } else if (stage == 4 || stage == 5|| stage==100 || stage ==200) {
    stage ++;
  } else if (stage >= 6 && stage <= 8 || stage>=101&&stage<=103 || stage===201 ||stage===202 || stage === 204) {
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
  
    }
  else  if(stage === 9){
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

function checkButton(x, y, w, h) {
  let isHover = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;

  if (isHover) {
    fill(255, 80, 80);
    cursor(HAND);
  } else {
    fill(255, 0, 0);
    cursor(ARROW);
  }

  return isHover;
}

function mousePressed() {
  if (stage === 8) {
    dragStartX = mouseX;
    dragStartY = mouseY;
    isDragging = true;
  }
  /*endingC.mousePressed();
  endingB.handleClick();*/ // 클릭 처리
}

function mouseReleased() {
  if (stage === 8) {
    dragEndX = mouseX;
    dragEndY = mouseY;
    isDragging = false;

    let x1 = min(dragStartX, dragEndX);
    let y1 = min(dragStartY, dragEndY);
    let x2 = max(dragStartX, dragEndX);
    let y2 = max(dragStartY, dragEndY);

    let selected = [];

    for (let s of sentenceObjs) {
      let tw = textWidth(s.text);
      let th = lineHeight;
      if (
        s.x < x2 &&
        s.x + tw > x1 &&
        s.y < y2 &&
        s.y + th > y1
      ) {
        selected.push(s);
      }
    }

    let allCorrect = selected.length === 1 && selected[0].isWrong;

    for (let s of sentenceObjs) {
      if (selected.includes(s)) {
        s.state = allCorrect ? "correct" : "wrong";
      }
    }

    if (allCorrect) {
      resultMessage = "";
      setTimeout(() => {
        stage++; // 다음 스테이지로
      }, 800);
    } else {
      resultMessage = "실패! 다시 시도하세요.";
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
  if (stage >= 4  && key === 'm') {
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
  if (stage === 8 | stage ===103 | stage === 204 ) return "sat";
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

// 모스 정답 함수
function checkMorseAnswer() {
  const codeCheck = codeInput.value().trim();
  if (stage === 9 && codeCheck === "제약") {
    stage++;
    console.log("정답!");
    codeInput.hide();
  } else {
    resultMessage = "틀렸습니다. 다시 시도하세요.";
    console.log("실패");
  }
}
