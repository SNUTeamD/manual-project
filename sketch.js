// ====== 전역 변수 설정 ======
// 폰트, 이미지 등 기본 변수들 선언
let myFont;
let imgManual, imgResearcher, imgCompany, imgCode;
let activeFileIcon, inactiveFileIcon;
let activeDocIcon, inactiveDocIcon;
let activeSatIcon, inactiveSatIcon;

// 시작 스테이지 설정
let stage = 0;

// 텍스트 타자 효과 관련 변수
let part = 0;
let linePart = 0;
let letterCount = 0;
let lastTime = 0;
let typingSpeed = 100;
let waitTime = 1500;
let isWaiting = false;
let finishText = false;

let showManual = false; // 매뉴얼 보여줄지 여부

// 사용자 입력용 인풋창
let nameInput, codeInput;

// 폴더에 문서 넣는 업무(Day1 업무1) 관련 변수들
let doctaskDay1;
let folderIcon, folderDoc;

// 업무 2 관련 변수
let sentenceObjs = [];
let isDragging = false;
let dragStartX, dragStartY, dragEndX, dragEndY;
let resultMessage = "";
let lineHeight = 25;
let dragInitialized = false;

// 업무 3 관련 변수
let morseCorrect = false;
let morseCheckTime = 0;
let codeInitialized = false;

// 에러 관련 변수
let error1;
let imgError_1; // 에러 1 유형 이미지
let imgError_2; // 에러 2 유형 이미지
let errors = [];
const NUM_ERRORS = 7;


// 엔딩 관련 변수
let endingA;  // 엔딩 A
let endingB; // 엔딩 B
let endingC; // 엔딩 C

// day 전환 변수
let afterDay1;
// 너무 빨리 넘어감 방지 코드
let stageHandled = 0;


function preload() {
  // 폰트 불러오기
  myFont = loadFont('assets/DungGeunMo.ttf');

  // 각종 이미지 불러오기
  imgManual = loadImage("assets/매뉴얼.png");
  imgResearcher = loadImage("assets/연구원.png");
  imgCompany = loadImage("assets/우리 회사다! 반짝.png");
  imgCode = loadImage("assets/모스부호.jpg");
  folderIcon = loadImage('assets/folderIcon.png');
  folderDoc = loadImage('assets/folderDoc.png');
  myDesk = loadImage('assets/내 사무실 자리.png');
  thisIsManual = loadImage('assets/이것은 매뉴얼.png');

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
  
  // 엔딩 객체 불러오기
  // 엔딩 A
  endingA = new EndingA();
  // 엔딩 B
  endingB = new EndingB();
  endingB.preload();
  // 엔딩 C
  endingC = new EndingC();
  endingC.preload();
  //Day 1이 끝나고
  afterDay1 = new AfterDay1();
  afterDay1.preload();
}

// ====== 입력창 생성 및 스타일 지정 ======
function setupInputs() {
  // 이름 입력창
  nameInput = createInput();
  nameInput.size(320, 50);
  nameInput.position(width / 2 - 210, height / 2);
  styleInput(nameInput, '이름을 입력해주세요', '30px', 'red');

  // 업무 3 모스부호 정답 입력창
  codeInput = createInput();
  codeInput.size(500, 60);
  codeInput.position(width / 2 - 310, height - 80);
  styleInput(codeInput, '정답을 입력하세요', '30px', 'red');
  codeInput.mousePressed(() => {
  resultMessage = "";
  });

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
  // Day1 업무1
  doctaskDay1 = new Day1Task1();
  doctaskDay1.start();
  // 엔딩 초기화
  endingA.start();
  endingC.start();

  afterDay1.start();
}

// ====== 메인 화면 반복 그리기 ======
function draw() {
  background(0);

  // 입력창 보여줄 stage 설정
  if (stage === 0) {
    nameInput.show();
    codeInput.hide();
  } else if (stage === 11 || stage === 20 || stage === 205) {
    nameInput.hide();
    codeInput.show();
  } else {
    nameInput.hide();
    codeInput.hide();
  }

  switch (stage) {
    case 0:
      // 초기 화면: 이름 입력창 + 확인 버튼
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
      // 회사 배경과 함께 도입 문구 출력
      let companyW = 1000;
      let companyH = imgCompany.height * (companyW / imgCompany.width);
      image(imgCompany, (width - companyW) / 2, 0, companyW, companyH);

      // 화면 아래 회색 박스
      fill(120);
      rect(0, height - height / 4, width, height / 4);

      fill(0);
      typeText([
        [" 드디어 오늘이 왔다! "],
        /*["오늘부터 내가 근무할 제약회사에서는 인간의 감염병을 치료하는 백신을 중점적으로 연구한다고 들었다."], 
        ["신입이니까 초반 며칠은 자잘한 서류 처리 작업을 맡겠지만", "프로젝트를 진행하다보면 중대한 업무도 맡게 될 거라 믿는다."], 
        ["질병의 치료라는 중대한 사명을 가지고 있는 만큼","'절대로 매뉴얼을 따라야 한다’는 선배의 말을 반드시 명심해야겠다."], 
        ["후... 부담감과 기대감에 떨려오지만, 잘 적응해낼 수 있을거다."],*/
        ["Click to continue ···"]
      ]);
  
      break;

    case 2:
      // 연구원 등장, 이름 기반 환영 멘트
      drawResearcher();

      // 화면 아래 회색 박스
      fill(120);
      rect(0, height - height / 4, width, height / 4);

      // 연구원 이름 표시 박스
      fill(60, 215);
      rectMode(CENTER);
      noStroke();
      rect(width / 20 + 235, height - 195, 200, 50, 10);
      rectMode(CORNER);
      fill(255);
      text("김철수", width / 20 + 235, height - 200);
    
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
        stage ++;
        resetTyping();
      }

      break;
    
    case 3:
      drawResearcher();

      // 화면 아래 회색 박스
      fill(120);
      rect(0, height - height / 4, width, height / 4);

      fill(45);
      typeText([
        ["이제부터 [m]키를 눌러 매뉴얼을 확인할 수 있습니다."],
      ]);

      if (finishText) {
        stage ++;
        resetTyping();
      }

      break;

    case 4:
      let manualW = 1000;
      let manualH = thisIsManual.height * (manualW / thisIsManual.width);
      image(thisIsManual, (width - manualW) / 2, 0, manualW, manualH);

      fill(120);
      rect(0, height - height / 4, width, height / 4);

      // 연구원 이름 표시 박스
      fill(60, 215);
      rectMode(CENTER);
      noStroke();
      rect(width / 20 + 235, height - 195, 200, 50, 10);
      rectMode(CORNER);
      fill(255);
      text("김철수", width / 20 + 235, height - 200);

      fill(255, 0, 0);
      typeText([
        [".. 반드시 매뉴얼을 따라주셔야 합니다."]
      ]);

      if (finishText) {
        stage ++;
        resetTyping();
      }
      
      break;

    case 5:
      fill(255);
      textSize(70)
      text("Day 1", width / 2, height / 2 - 50);
      textSize(30);
      text("Click to continue ···", width / 2, height / 2 + 50);

      break;

    case 6: // 바탕화면 1

      // 업무 리스트
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
    
    case 7:
      // Day 1 -업무 1: 파일 정리 업무
       doctaskDay1.update(); 
      // 일단 흐름 파악하려고 주석 처리했어요
      // 코드 연결하시고 주석 처리 해제하심 됩니다
      
      break;

    
    case 8: // 바탕화면 2

      // 업무 리스트
      fill(150, 150, 255);
      rect(width - 450, 50, 400, 200);
      fill(0);
      textAlign(CENTER, CENTER);
      textSize(30);
      text("오늘의 할 일", width - 250, 85);
      text("1. 파일 정리", width - 250, 125);
      text("2. 정크 데이터 처리", width - 250, 165);
      text("3. 코드 해석", width - 250, 205);

      // 밑줄: 업무 1 완료 표시
      stroke(0);
      strokeWeight(3);
      line(width - 350, 130, width - 150, 130);
      noStroke();

      // 아이콘 표시: 문서 아이콘만 활성화
      drawIcons();

      break;

    case 9:
      // Day 1 - 업무 2: 정크 데이터 처리
      fill(255);
      rect(50, 30, width - 100, height);
      
      fill(180);
      rect(width - 630, 60, 550, 80);

      fill(0);
      textSize(20);
      textAlign(LEFT, TOP);
      text("흐름에 맞지 않는 부분을 드래그하여 선택하세요.", width - 610, 77);
      text("드래그 박스 안에 문장이 '정확히' 포함되어야 합니다.", width - 610, 102);

      if (sentenceObjs.length === 0) { 
        let firstLines = [
          "Day 1 데이터 정리",
          "내부 연구 보고서",
          "문서번호: IR-401-1",
          "작성일자: [2025-06-20]",
          "작성부서: 인지응답실험팀 (현재 비활성화 상태)",
          "작성자: 김철수 선임연구원",
          "보안등급: 내부기밀 (Confidential; for Internal Use Only)",
          "",
          "1. 보고서 개요",
          "본 문서는 당사 연구소 내 인지응답실험팀에서 수행한 초기 탐색적 연구 결과를 정리한 것이다.",
          "해당 연구는 특정 약물 후보물질(Candidate Compound X)이 인지기능에 미치는 영향을 평가하기 위한 사전 실험으로, 약물 투여 후 피험자의 반응 속도, 정확성, 선택적 주의력 변화 등을 측정하였다.",
          "현재 본 팀은 운영이 일시 중단된 상태이나, 실험 결과의 과학적 의의와 향후 임상 적용 가능성을 고려하여 연구 기록 보존 및 부서 간 공유를 목적으로 본 보고서를 작성하였다.",
          "",
          // 흐름에 맞지 않는 내용
          "한 해를 마무리하는 특별 할인! 겨울의 마법이 시작됩니다. 따뜻한 순간을 선물하세요.",
          "크리스마스의 기적, 마음에 닿기를",
          "",
          "2. 연구 배경 및 목적",
          "인지 기능은 다양한 신경정신계 질환뿐만 아니라, 통증 완화, 수면 조절 등 다양한 치료영역과 밀접한 관련이 있다.",
          "최근 개발 중인 Candidate Compound X는 중추신경계에 선택적으로 작용하는 것으로 보고되었으며, 동물모델에서 인지 능력 개선 가능성을 보인 바 있다.",
          "이에 따라 본 연구에서는 해당 물질이 건강한 성인에게서 인지적 자극에 대한 반응성에 어떤 영향을 미치는지를 사전적으로 검토하고자 하였다.",
          "",
          "3. 실험 설계",
          "3.1 실험 대상자",
          "모집 대상: 건강한 성인 남녀, 20~35세",
          "최종 참여자 수: 총 20명 (남성 10명, 여성 10명)",
          "선정 기준: 신경학적 질환 이력 없음, 약물 복용 이력 없음, 정상 범위 내 인지능력 보유",
        ];

        for (let i = 0; i < firstLines.length; i ++) {
          let line = firstLines[i];
          let isWrong = false;

          // 이상한 문장 판별 기준
          if (line.includes("특별 할인") || line.includes("크리스마스")) {
            isWrong = true;
          }

          sentenceObjs.push({
            text: line,
            x: 70,
            y: 50 + i * lineHeight,
            isWrong: isWrong,
            state: "default"
          });
        }
      }

      textSize(15);
      textAlign(LEFT, TOP);

      for (let s of sentenceObjs) {
        if (s.state === "correct") fill(0, 100, 255);
        else if (s.state === "wrong") fill(255, 50, 50);
        else fill(0);

        text(s.text, s.x, s.y);
      }

      if (isDragging) {
        noFill();
        stroke(200);
        rectMode(CORNERS);
        rect(dragStartX, dragStartY, mouseX, mouseY);
        noStroke();
        rectMode(CORNER);
      }

      if (resultMessage) {
        textSize(30);
        textAlign(CENTER, CENTER);
        if (resultMessage.includes("성공")) {
          fill(0, 100, 255);
        } else {
          fill(255, 50, 50);
        }
        text(resultMessage, width - 355, 180);
      }

      error1.display();

      break;

    case 10: // 바탕화면 3
      
      // 업무 리스트
      fill(150, 150, 255);
      rectMode(CORNER);
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

    case 11:
      // Day 1 - 업무 3: 코드 해석
      image(imgCode, width / 2 - imgCode.width / 10, height / 2 + 50 - imgCode.height / 10, imgCode.width / 5, imgCode.height / 5);

      fill(255);
      textSize(windowWidth * 0.03);
      text("모스부호를 해독해서 적절한 글을 입력하시오", width / 2, height * 0.06 - 15);
      fill(255);
      text(".--. -.-- -.- .. .-..", width / 2, height * 0.15);

      let btnX11 = width / 2 + 210;
      let btnY11 = height - 81;
      let btnW11 = 80;
      let btnH11 = 62;

      checkButton(btnX11, btnY11, btnW11, btnH11);
      noStroke();
      rect(btnX11, btnY11, btnW11, btnH11);

      fill(255);
      textSize(30);
      text("확인", width / 2 + 250, height - 52);

      // 정답 여부 판단 후 결과 메시지 띄우기
      if (resultMessage !== "") {
        if (morseCorrect) {
          fill(0, 100, 255);
        } else {
          fill(255, 50, 50);
        }

        rect(width / 2 - 250, height / 2, 500, 100);
        fill(255);
        text(resultMessage, width / 2, height / 2 + 48);
      }

      // 정답이면 1.5초 후 다음 스테이지로
      if (morseCorrect && millis() - morseCheckTime > 1500) {
        stage ++;
        morseCorrect = false;
        resultMessage = "";
      }

      break;
      
    case 12: // Day 1 마무리 파트
      finishText = false;
      let deskW = 1000;
      let deskH = myDesk.height * (deskW / myDesk.width);
      image(myDesk, (width - deskW) / 2, 0, deskW, deskH);

      // 화면 아래 회색 박스
      fill(120);
      rect(0, height - height / 4, width, height / 4);

      fill(0);
      typeText([
        ["휴우 어제는 힘든 하루였어 ..."],
        ["고연봉이라서 지원한 프로젝트인데 .. 이거 하지 말까?"],
        ["아냐 아냐 그래도 어떻게 입사한건데 .. 일 해야지 ..."],
        ["음? 오늘 작업해야 하는 보고서인가?"]
      ]);
      
      if (finishText) {
        stage ++;
        resetTyping();
      }

      break;
      
    case 13:
      afterDay1.update();
      break;


    case 14: // Day 2로 전환
      fill(255);
      textSize(70);
      text("Day 2", width / 2, height / 2 - 50);
      textSize(30);
      text("Click to continue ···", width / 2, height / 2 + 50);
      
      break;

    case 15: // 바탕화면 1
      fill(150, 150, 255);
      rect(width - 450, 50, 400, 200);
      fill(0);
      text("오늘의 할 일", width - 250, 85);
      text("1. 파일 정리", width - 250, 125);
      text("2. 정크 데이터 처리", width - 250, 165);
      text("3. 코드 해석", width - 250, 205);
      
      // 아이콘 표시: 파일 아이콘만 활성화
      drawIcons();
      error2.display();

      break;

    case 16:
      // 여기에 둘째 날 업무 1 코드 넣어주세요
      stage ++;

      break;

    case 17: // 바탕화면 2
      fill(150, 150, 255);
      rect(width - 450, 50, 400, 200);
      fill(0);
      text("오늘의 할 일", width - 250, 85);
      text("1. 파일 정리", width - 250, 125);
      text("2. 정크 데이터 처리", width - 250, 165);
      text("3. 코드 해석", width - 250, 205);

      stroke(0);
      strokeWeight(3);
      line(width - 350, 130, width - 150, 130);
      noStroke();

      drawIcons();

      break;
    
    case 18:
      // Day 2 - 업무 2: 정크 데이터 처리
      fill(255);
      rect(50, 30, width - 100, height);
      
      fill(180);
      rect(width - 630, 60, 550, 80);

      fill(0);
      textSize(20);
      textAlign(LEFT, TOP);
      text("흐름에 맞지 않는 부분을 드래그하여 선택하세요.", width - 610, 77);
      text("드래그 박스 안에 문장이 '정확히' 포함되어야 합니다.", width - 610, 102);

      if (!dragInitialized) {
        sentenceObjs = [];
        dragInitialized = true;
      }
      
      if (sentenceObjs.length === 0) { 
        let secondLines = [
          "Day 1 데이터 정리",
          "내부 연구 보고서",
          "문서번호: IR-401-1",
          "작성일자: [2025-06-20]",
          "작성부서: 인지응답실험팀 (현재 비활성화 상태)",
          "작성자: 김철수 선임연구원",
          "보안등급: 내부기밀 (Confidential; for Internal Use Only)",
          "",
          "1. 보고서 개요",
          "본 문서는 당사 연구소 내 인지응답실험팀에서 수행한 초기 탐색적 연구 결과를 정리한 것이다.",
          "해당 연구는 특정 약물 후보물질(Candidate Compound X)이 인지기능에 미치는 영향을 평가하기 위한 사전 실험으로, 약물 투여 후 피험자의 반응 속도, 정확성, 선택적 주의력 변화 등을 측정하였다.",
          "현재 본 팀은 운영이 일시 중단된 상태이나, 실험 결과의 과학적 의의와 향후 임상 적용 가능성을 고려하여 연구 기록 보존 및 부서 간 공유를 목적으로 본 보고서를 작성하였다.",
          "",
          // 흐름에 맞지 않는 내용
          "한 해를 마무리하는 특별 할인! 겨울의 마법이 시작됩니다. 따뜻한 순간을 선물하세요.",
          "크리스마스의 기적, 마음에 닿기를",
          "",
          "2. 연구 배경 및 목적",
          "인지 기능은 다양한 신경정신계 질환뿐만 아니라, 통증 완화, 수면 조절 등 다양한 치료영역과 밀접한 관련이 있다.",
          "최근 개발 중인 Candidate Compound X는 중추신경계에 선택적으로 작용하는 것으로 보고되었으며, 동물모델에서 인지 능력 개선 가능성을 보인 바 있다.",
          "이에 따라 본 연구에서는 해당 물질이 건강한 성인에게서 인지적 자극에 대한 반응성에 어떤 영향을 미치는지를 사전적으로 검토하고자 하였다.",
          "",
          "3. 실험 설계",
          "3.1 실험 대상자",
          "모집 대상: 건강한 성인 남녀, 20~35세",
          "최종 참여자 수: 총 20명 (남성 10명, 여성 10명)",
          "선정 기준: 신경학적 질환 이력 없음, 약물 복용 이력 없음, 정상 범위 내 인지능력 보유",
        ];

        for (let i = 0; i < secondLines.length; i ++) {
          let line = secondLines[i];
          let isWrong = false;

          // 이상한 문장 판별 기준
          if (line.includes("특별 할인") || line.includes("크리스마스")) {
            isWrong = true;
          }

          sentenceObjs.push({
            text: line,
            x: 70,
            y: 50 + i * lineHeight,
            isWrong: isWrong,
            state: "default"
          });
        }
      }

      textSize(15);
      textAlign(LEFT, TOP);

      for (let s of sentenceObjs) {
        if (s.state === "correct") fill(0, 100, 255);
        else if (s.state === "wrong") fill(255, 50, 50);
        else fill(0);

        text(s.text, s.x, s.y);
      }

      if (isDragging) {
        noFill();
        strokeWeight(3);
        stroke(200);
        rectMode(CORNERS);
        rect(dragStartX, dragStartY, mouseX, mouseY);
        noStroke();
        rectMode(CORNER);
      }

      if (resultMessage) {
        textSize(30);
        textAlign(CENTER, CENTER);
        if (resultMessage.includes("성공")) {
          fill(0, 100, 255);
        } else {
          fill(255, 50, 50);
        }
        text(resultMessage, width - 355, 180);
      }

      break;

    case 19: // 바탕화면 3
        fill(150, 150, 255);
        rect(width - 450, 50, 400, 200);
        fill(0);
        textSize(30);
        text("오늘의 할 일", width - 250, 85);
        text("1. 파일 정리", width - 250, 125);
        text("2. 정크 데이터 처리", width - 250, 165);
        text("3. 코드 해석", width - 250, 205);
        
        stroke(0);
        strokeWeight(3);
        line(width - 350, 130, width - 150, 130);
        line(width - 400, 170, width - 100, 170);
        noStroke();

        drawIcons();

        break;
    
    case 20:
      // 업무 3 모스부호 해석
      if (!codeInitialized) {
        codeInput.value("");
        morseCorrect = false;
        morseCheckTime = 0;
        codeInitialized = true;
      }

      image(imgCode, width / 2 - imgCode.width / 10, height / 2 + 50 - imgCode.height / 10, imgCode.width / 5, imgCode.height / 5);

      fill(255);
      textSize(windowWidth * 0.03);
      text("모스부호를 해독해서 적절한 글을 입력하시오", width / 2, height * 0.06 - 15);
      text("--. --.- -.- -- ... -.-" /* ← 원하는 모스부호 */, width / 2, height * 0.15); // 일단 지금은 '생명' 넣어두었습니다

      let btnX20 = width / 2 + 210;
      let btnY20 = height - 81;
      let btnW20 = 80;
      let btnH20 = 62;

      checkButton(btnX20, btnY20, btnW20, btnH20);
      rect(btnX20, btnY20, btnW20, btnH20);

      fill(255);
      textSize(30);
      text("확인", width / 2 + 250, height - 52);

      if (resultMessage !== "") {
        fill(morseCorrect ? color(0, 100, 255) : color(255, 50, 50));
        rect(width / 2 - 250, height / 2, 500, 100);
        fill(255);
        text(resultMessage, width / 2, height / 2 + 48);
      }

      if (morseCorrect && millis() - morseCheckTime > 1500) {
        stage++;
        morseCorrect = false;
        resultMessage = "";
      }

      break;

    case 21:
      // Day 3 가기 전 전환 파트
      stage ++;

      break;

    case 22: // Day 3로 전환
    fill(255);
    textSize(70)
    text("Day 3", width / 2, height / 2 - 50);
    textSize(30);
    text("Click to continue ···", width / 2, height / 2 + 50);
    
      break;
    
    case 23: // 바탕화면 1
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
    
    case 24:
      // 셋째 날 업무 1은 여기에
      stage ++;

      break;

    case 25: // 바탕화면 2
      fill(150, 150, 255);
      rect(width - 450, 50, 400, 200);
      fill(0);
      text("오늘의 할 일", width - 250, 85);
      text("1. 파일 정리", width - 250, 125);
      text("2. 정크 데이터 처리", width - 250, 165);
      text("3. 코드 해석", width - 250, 205);

      stroke(0);
      strokeWeight(3);
      line(width - 350, 130, width - 150, 130);
      noStroke();

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

    case 204: // 바탕화면 3
      noStroke();
      fill(150, 150, 255);
      rect(width - 450, 50, 400, 200);
      fill(0);
      textSize(30);
      text("오늘의 할 일", width - 250, 85);
      text("1. 파일 정리", width - 250, 125);
      text("2. 정크 데이터 처리", width - 250, 165);
      text("3. 코드 해석", width - 250, 205);
      
      stroke(0);
      strokeWeight(3);
      line(width - 350, 130, width - 150, 130);
      line(width - 400, 170, width - 100, 170);
      noStroke;

      drawIcons();

      break;

      case 205:
      // 업무 3 모스부호 해석
      if (!codeInitialized) {
        codeInput.value("");
        morseCorrect = false;
        morseCheckTime = 0;
        codeInitialized = true;
      }
      
      image(imgCode, width / 2 - imgCode.width / 10, height / 2 + 50 - imgCode.height / 10, imgCode.width / 5, imgCode.height / 5);

      fill(255);
      textSize(windowWidth * 0.03);
      text("모스부호를 해독해서 적절한 글을 입력하시오", width / 2, height * 0.06 - 15);
      text("--. . ...- ...- ... .--. - ...." /* ← 원하는 모스부호 */, width / 2, height * 0.15); // 정답 살려줘

      let btnX205 = width / 2 + 210;
      let btnY205 = height - 81;
      let btnW205 = 80;
      let btnH205 = 62;

      checkButton(btnX205, btnY205, btnW205, btnH205);
      noStroke();
      rect(btnX205, btnY205, btnW205, btnH205);

      fill(255);
      textSize(30);
      text("확인", width / 2 + 250, height - 52);

      if (resultMessage !== "") {
        fill(morseCorrect ? color(0, 100, 255) : color(255, 50, 50));
        rect(width / 2 - 250, height / 2, 500, 100);
        fill(255);
        text(resultMessage, width / 2, height / 2 + 48);
      }

      if (morseCorrect && millis() - morseCheckTime > 1500) {
        stage =400;
        morseCorrect = false;
        resultMessage = "";
      }

      break;

    case 400:
        // 엔딩 A
        endingA.update();
      break;
    
    case 500:
        // 엔딩 B
        endingB.update();
      break;

    case 600:
        // 엔딩 C
        endingC.update();
      break;
  }
  updateCursor();
  drawManual(); // 매뉴얼 표시
}

function updateCursor() {
  let isHand = false;

  // 1. 버튼 위에 마우스 올렸는지 직접 계산
  if (
    (stage === 0 &&
      mouseX >= width / 2 + 130 &&
      mouseX <= width / 2 + 210 &&
      mouseY >= height / 2 - 1.5 &&
      mouseY <= height / 2 + 51.5)
    ||
    (stage === 11 &&
      mouseX >= width / 2 + 210 &&
      mouseX <= width / 2 + 290 &&
      mouseY >= height - 81 &&
      mouseY <= height - 19)
    ||
    (stage === 20 &&
      mouseX >= width / 2 + 210 &&
      mouseX <= width / 2 + 290 &&
      mouseY >= height - 81 &&
      mouseY <= height - 19)
  ) {
    isHand = true;
  }

  // 2. 아이콘 hover 체크
  let layout = getIconLayout();
  let activeKey = getActiveIconName();
  if (activeKey) {
    let icon = layout[activeKey];
    let y = layout.y;
    let iconH = layout.iconH;

    if (
      mouseX >= icon.x &&
      mouseX <= icon.x + icon.w &&
      mouseY >= y &&
      mouseY <= y + iconH
    ) {
      isHand = true;
    }
  }

  // 3. case 1: 텍스트 다 나오고 클릭 대기 중
  if (stage === 1 && finishText) {
    isHand = true;
  }

  // 4. Day 전환 화면
  if ([5, 14, 22].includes(stage)) {
    isHand = true;
  }

  cursor(isHand ? HAND : ARROW);
}

function mouseClicked() {
  console.log("mouseClicked called, stage =", stage);
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
  }

  if (stage === 1 || stage === 3) {
    if (finishText) {
      stage++;
      resetTyping();
    }
  }

  if (stage === 5 || stage === 22) {
    stage++;
  }
// stage 13에서 stage 14를 mousePressed와 mouseClicked가 중복 적용되어서 빨리 넘어가는 바람에 쓰는 제한 코드
// 2번 눌러야 다음으로 진행됩니다
  if (stage === 14) {
  if (stageHandled<1) {
    stageHandled++
}else if(stageHandled ==1){
  stage++
  stageHandled =0;
  } 
}

  if (
    stage === 6 ||
    stage === 8 ||
    stage === 10 ||
    stage === 15 ||
    stage === 17 ||
    stage === 19 ||
    stage === 23 ||
    stage === 25 ||
    stage === 204
  ) {
    let layout = getIconLayout();
    let activeKey = getActiveIconName();
    let icon = layout[activeKey];
    let y = layout.y;
    let iconH = layout.iconH;

    if (
      mouseX >= icon.x &&
      mouseX <= icon.x + icon.w &&
      mouseY >= y &&
      mouseY <= y + iconH
    ) {
      stage++;
    }
  }

  if (stage === 11 || stage === 20 || stage ===205 ) {
    if (
      mouseX >= width / 2 + 210 &&
      mouseX <= width / 2 + 290 &&
      mouseY >= height - 81 &&
      mouseY <= height - 19
    ) {
      checkMorseAnswer();
    }
  }
  
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
        stage = 14 // 원하는 다음 스테이지 번호로 바꾸세요
      }

      return; // 한 번에 하나만 닫기
    }
  }
}

function checkButton(x, y, w, h) {
  let isHover = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;

  if (isHover) {
    fill(255, 80, 80);
  } else {
    fill(255, 0, 0);
  }

  return isHover;
}

function mousePressed() {
   console.log("mousePressed called, stage =", stage);
  if (stage === 7){
    doctaskDay1.mousePressed();
  }

  if (stage === 9 || stage === 18) {
    for (let s of sentenceObjs) {
      s.state = "default";
    }
    resultMessage = ""

    dragStartX = mouseX;
    dragStartY = mouseY;
    isDragging = true;
  }
  if(stage===13){
    afterDay1.mousePressed();
  }

  if (stage === 500) {
    endingB.handleClick();} // 클릭 처리

  if (stage === 600) {
    endingC.mousePressed();}
}

function mouseDragged() {
  if (stage === 7){
    doctaskDay1.mouseDragged();
  }
}

function mouseReleased() {
  if (stage === 7){
    doctaskDay1.mouseReleased();
  }

  if (stage === 9 || stage === 18) {
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
        s.text.trim() !== "" &&
        s.x < x2 &&
        s.x + tw > x1 &&
        s.y < y2 &&
        s.y + th > y1
      ) {
        selected.push(s);
      }
    }

    let correctCount = sentenceObjs.filter(s => s.isWrong).length;

    let allCorrect =
      selected.length === correctCount &&
      selected.every(s => s.isWrong);

    for (let s of sentenceObjs) {
      if (selected.includes(s)) {
        s.state = allCorrect ? "correct" : "wrong";
      }
    }

    if (allCorrect) {
      fill(0, 100, 255);
      resultMessage = "성공입니다.";
      setTimeout(() => {
        stage ++;
        resultMessage = "";
      }, 1500);
    } else {
      fill(255, 50, 50);
      resultMessage = "실패입니다. 다시 시도하세요.";
    }
  }
}

// 텍스트 타자 효과 함수
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

// 텍스트 타자 효과 초기화 함수
function resetTyping() {
  part = 0;
  linePart = 0;
  letterCount = 0;
  isWaiting = false;
  finishText = false;
  lastTime = millis();
}

// 연구원 이미지 비율 유지하면서 표시하는 함수
function drawResearcher() {
  let researcherW = 500;
  let researcherH = imgResearcher.height * (researcherW / imgResearcher.width);
  let imgX = 80;
  let imgY = height - height / 4 - researcherH + 200;
  image(imgResearcher, imgX, imgY, researcherW, researcherH);
}

// 매뉴얼 띄우는 함수
function drawManual() {
  if (!showManual) return;
  manualH = height * 0.8;
  manualW = manualH * (imgManual.width / imgManual.height);
  manualX = width / 2 - manualW / 2;
  manualY = height * 0.05;
  image(imgManual, manualX, manualY, manualW, manualH);
}

// stage 3 이후에 m키 누르면 매뉴얼이 나오도록
function keyPressed() {
  const focusedEl = document.activeElement;

  // 인풋창 포커스 시 키 무시
  if (
    focusedEl === nameInput.elt ||
    focusedEl === codeInput.elt
  ) {
    return;
  }

  if (stage >= 3 && key === 'm') {
    showManual = !showManual;
  }
}

// 배경화면 아이콘 처리 관련 함수 1
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

// 배경화면 아이콘 처리 관련 함수 2
function getActiveIconName() {
  if (stage === 6 | stage === 15 | stage === 23 ) return "file";
  if (stage === 8 | stage === 17 | stage === 25 ) return "doc";
  if (stage === 10 | stage === 19 | stage === 204 ) return "sat";
  return null;
}

// 배경화면 아이콘 처리 관련 함수 3
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
    let img = icon.key === activeKey ? icon.active : icon.inactive;
    image(img, icon.layout.x, y, icon.layout.w, iconH);
  }
}


// 모스 정답 함수
function checkMorseAnswer() {
  const codeCheck = codeInput.value().trim();

  if (
    (stage === 11 && codeCheck === "제약") ||
    (stage === 20 && codeCheck === "생명") ||
    (stage === 205 && codeCheck === "살려줘")
  ) {
    resultMessage = "성공입니다.";
    morseCorrect = true;
    morseCheckTime = millis(); 
  } else {
    resultMessage = "실패입니다. 다시 시도하세요.";
    morseCorrect = false;
    morseCheckTime = 0;
  }
}
