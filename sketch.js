// ====== 전역 변수 설정 ======
// 폰트, 이미지 등 기본 변수들 선언
let myFont;
let imgManual, imgResearcher, imgCompany, imgCode;
let activeFileIcon, inactiveFileIcon;
let activeDocIcon, inactiveDocIcon;
let activeSatIcon, inactiveSatIcon;

// bgm 관련 변수들 선언 및 설정
let beforeDay1bgm, day1bgm, day2bgm, day3bgm, endingBbgm, endingCbgm, endingDbgm, manualbgm;

// 시작 스테이지 설정
let stage = 0;
let returnStage = null; // 이전 스테이지로 돌아갈 때 사용

// // 텍스트 타자 효과 관련 변수
// let part = 0;
// let linePart = 0;
// let letterCount = 0;
// let lastTime = 0;
// let typingSpeed = 100;
// let waitTime = 1500;
// let isWaiting = false;
// let finishText = false;
//마우스 클릭 변수
//let startTime =0;
let stageClear = -1; // stage가 바뀌었는지 확인하는 변수
let currentTextIndex = 0;
let fullText = "";
let displayedText = "";
let charIndex = 0;
let lastUpdateTime = 0;
let delay = 85;
let isTyping = false;
let clickReady = false;
let texts = null;
let case1texts = [
  { speaker: "PLAYER", text: "드디어 오늘이 왔다!" },
  { speaker: "PLAYER", text: "오늘부터 나는 이 제약회사에서 인간의 감염병을 치료하는 백신을 중점적으로 연구하는 프로젝트에 참여하게 되었다." },
  { speaker: "PLAYER", text: "신입이니까 초반 며칠은 자잘한 서류 처리 작업을 맡겠지만, 프로젝트를 진행하다보면 중대한 업무도 맡게 될 거라 믿는다." },
  { speaker: "PLAYER", text: "질병의 치료라는 중대한 사명을 가지고 있는 만큼 '절대로 매뉴얼을 따라야 한다’는 선배의 말을 반드시 명심해야겠다." },
  { speaker: "PLAYER", text: "후 ... 부담감과 기대감에 떨려오지만, 잘 적응해낼 수 있을 거다. 할 수 있다!!" },
];

let case2texts = [
  // { speaker: "PLAYER", text: playerName + " 씨 맞으신가요?" },
  { speaker: "김철수", text: "저는 연구 부서의 김철수 연구원이라고 합니다." },
  { speaker: "김철수", text: "해야 할 업무를 설명해 드리겠습니다." },
  { speaker: "김철수", text: "이전에 안내드린 바와 같이, 업무는 간단합니다." },
  { speaker: "김철수", text: "컴퓨터 화면에 그날 해야 할 업무 리스트가 제시되어 있을 겁니다." },
  { speaker: "김철수", text: "순서대로 업무를 수행해주시면 됩니다." },
];

let case3texts = [
  { speaker: "김철수", text: "따라주셔야 할 매뉴얼을 드리겠습니다." },
  { speaker: "김철수", text: "매뉴얼을 따르지 않아 발생하는 문제는 회사에서 책임지지 않으므로, 업무를 수행하면서 이를 반드시 지켜주시기 바랍니다." }
  // // { speaker: "김철수", text: "업무 전, 매뉴얼을 숙지해야 하니 한 번 매뉴얼을 읽어보세요." },
  // { speaker: "김철수", text: "매뉴얼을 다 읽고 난 다음, 매뉴얼을 닫으시면 바로 업무를 시작할 수 있을 겁니다." },
];
let case4texts = [
  { speaker: "김철수", text: ".. 반드시 매뉴얼을 따라주셔야 합니다." }];
let case5texts = [
  { speaker: "김철수", text: "업무를 시작하기 전에, 매뉴얼을 읽어보세요." },
  { speaker: "김철수", text: "매뉴얼을 다 읽고 난 다음, 매뉴얼을 닫으시면 바로 업무를 시작할 수 있을 겁니다." },
  { speaker: "김철수", text: "이제부터 [m]키를 눌러 매뉴얼북을 열거나 치울 수 있습니다." },
  { speaker: "김철수", text: "매뉴얼을 다 읽으신 후 매뉴얼을 닫으면 자동으로 업무가 시작됩니다." },
]; 
let case13texts = [
  { speaker: "PLAYER", text: "휴 ... 오늘은 힘든 하루였어 ..." },
  { speaker: "PLAYER", text: "고연봉이라서 지원한 프로젝트인데 .. 그냥 그만둘까?" },
  { speaker: "PLAYER", text: "아냐 .. 그래도 어떻게 입사했는데 ... 열심히 일 해야지 ...." },
  { speaker: "PLAYER", text: "내일 하루도 힘내보자! 어떻게든 되겠지~" }
];



let showManual = false; // 매뉴얼 보여줄지 여부

// 사용자 입력용 인풋창
let nameInput, codeInput;

// 플레이어 이름 받는 변수
let playerName = "";

// 폴더에 문서 넣는 업무(Day1 업무1) 관련 변수들
let doctaskDay1;
let doctaskDay2;
let doctaskDay3;
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

// day 전환 변수
let afterDay1Started = false;
let afterDay1;
let afterDay2Started = false;
let afterDay2;
// 너무 빨리 넘어감 방지 코드
let stageHandled = 0;
// 시간 재기 변수
let startTime =0;
let glitchAlpha = 255;

// 에러 관련 변수
let error1;
let error2;
let error3;
let imgError_1; // 에러 1 유형 이미지
let imgError_2; // 에러 2 유형 이미지
let imgError_4; // 힌트 이미지
let errors = [];
const NUM_ERRORS = 7;
let errorDisplay =false; // 에러 창 보이게 하는 변수
let error1Triggered = false;
let error2Triggered = false;
let error3Triggered = false;

// 마지막 날 엔딩 A, C, D 전환 관련 변수
let isResetTriggered = false;
let resetTriggeredTime = 0;
let anotherResetTriggered = false; // 우선 엔딩 D 전환 변수입니다.

// 엔딩 관련 변수
let endingA;  // 엔딩 A
let endingB; // 엔딩 B
let endingC; // 엔딩 C
let endingD1, endingD2; // 엔딩 D
let endingAStarted = false;
let endingCStarted = false;
let endingD1Started =false;
let endingD2Started = false;


// 틀린 횟수 세기
let wrongCount = 0;
let showImage = false;
let imageStartTime = 0;
let showDuration = 2000;
let wrongImage;
let warningPositions = []; // "틀리지마" 위치들 저장할 배열
let warningCount = 10; // 몇 개 표시할지

//매뉴얼 토글 변수
let mToggleCount = 0;
let lastShowManual = false;

function preload() {
  // 폰트 불러오기
  myFont = loadFont('assets/DungGeunMo.ttf');

  // 각종 이미지 불러오기
  imgManual = loadImage("assets/매뉴얼.png");
  imgResearcher = loadImage("assets/연구원.png");
  imgCompany = loadImage("assets/우리 회사다! 반짝.png");
  imgCode = loadImage("assets/모스부호 수정.jpg");
  folderIcon = loadImage('assets/folderIcon.png');
  folderDoc = loadImage('assets/folderDoc.png');
  myDesk = loadImage('assets/내 사무실 자리.png');
  thisIsManual = loadImage('assets/이것은 매뉴얼.png');
  wrongImage =loadImage('assets/왜틀려.png');
  fakeDoc = loadImage('assets/위장용 보고서.png');

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
  imgError_4 = loadImage('assets/에러창-예.png');

  // bgm 불러오기
  beforeDay1bgm = loadSound('audio/업무시작전브금.mp3')
  day1bgm = loadSound('audio/1일차 브금.mp3')
  day2bgm = loadSound('audio/2일차브금_믹스다운.mp3')
  day3bgm = loadSound('audio/3일차브금_믹스다운.mp3')
  endingBbgm = loadSound('audio/엔딩B사무실.mp3')
  endingCbgm = loadSound('audio/엔딩c브금_믹스다운.mp3')
  endingDbgm = loadSound('audio/엔딩D.mp3')
  manualbgm = loadSound('audio/매뉴얼 브금.mp3')
  
  // 엔딩 객체 불러오기
  // 엔딩 A
  //endingA = new EndingA(playerName);
  // 엔딩 B
  //endingB = new EndingB();
  //endingB.preload();
  // 엔딩 C
  //endingC = new EndingC();
  //endingC.preload();
  // 엔딩 D
  //endingD1 = new EndingD1();
  //endingD2 = new EndingD2(playerName);
  //endingD2.preload();
  //Day 1이 끝나고
  afterDay1 = new AfterDay1();
  afterDay1.preload();
  //Day 2가 끝나고
  afterDay2 = new AfterDay2();
  afterDay2.preload();
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

  setupInputs();

  // 커서 안에 마우스가 있어도 엔터 치면 다음 스테이지 가능하게
  nameInput.elt.addEventListener("keydown", (e) => {
    if (stage === 0 && e.key === "Enter" && nameInput.value() !== "") {
      playerName = nameInput.value();
      stage = 1;
    }
  }); // 이름 입력창에서 엔터칠때

  codeInput.elt.addEventListener("keydown", (e) => {
    if ((stage === 12 || stage === 21 || stage === 30) && e.key === "Enter") {
      checkMorseAnswer();
    }
  }); //모스부호 엔터 칠때

  
  // 에러 1 유형의 텍스트 지정
  error1 = new Error1(
    imgError_1,
    "From: 구조언어부 백업담당 T\n To: 수거조정실 S외 2명\nSubject: 그거 진짜 지운 애 있음ㅋㅋ\n진짜로 그거 날린 직원 나왔어요. 영상도 첨부함!\n마지막에 충격받은 표정이 꽤 웃겨서 추천함.\n자기 눈으로 세상 본 줄 아는 표정 아시죠? (...)",  // 30초 이전에 표시할 텍스트
    "이렇게무시하다간정말필요한것도놓칠걸?\n"  // 30초 이후에 표시할 텍스트
  );
  error1.start();

  error2 = new Error1(
    imgError_4 );
  error2.start();

  error3 = new Error1(
    imgError_1,
    "From: 실감부 U\nTo: 정제실 3층 협의라인\nSubject: 점심 감각세트 예약했어요\n'향수 + 미열 + 저항감' 패키지로 해놨어요.\n그나저나 027이 자꾸 같은 이름을 떠올린대요.\n이전 루프에선 그런 거 없었는데. 그만 소각(...)", // 30초 이전에 표시할 텍스트
    "아 잘못보냈다ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\nㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ\n"  // 30초 이후에 표시할 텍스트
  );
  error3.start();

  // Day1 업무1
  // doctaskDay1 = new Day1Task1();
  // doctaskDay1.start();
  // Day2 업무1
  // doctaskDay2 = new Day2Task1(); 
  // doctaskDay2.start();
  // Day3 업무1
  // doctaskDay3 = new Day3Task1(); 
  // doctaskDay3.start();
  // 엔딩 초기화
  // endingA.start();
  // endingC.start();
  //endingD1.start();
  //endingD2.start();
  //Day 마치고 초기화
  //afterDay1.start();
  //afterDay2.start();
}

// ====== 메인 화면 반복 그리기 ======
function draw() {
  background(0);
  textFont(myFont);
  textSize(35);
  textAlign(CENTER, CENTER);

  // 입력창 보여줄 stage 설정
  if (stage === 0) {
    nameInput.show();
    codeInput.hide();
  } else if (stage === 12 || stage === 21 || stage === 30) {
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
      fill(255,0,0);
      textSize(20);
      text('공포 요소가 있어요. 심약자 분들은 주의해 주세요!', width / 2, height / 2 + 90);
      
      //엔딩 보고 처음으로 돌아오면 start 초기화
      endingAStarted = false;
      endingCStarted = false;
      endingD1Started = false;
      endingD2Started = false;
      break;

    case 1:
      // bgm
      if (!beforeDay1bgm.isPlaying()) {
                stopAllbgm();
                beforeDay1bgm.loop(); // 자동 반복
                beforeDay1bgm.setVolume(0.7);
      }

      // 회사 배경과 함께 도입 문구 출력
      let companyW = 1200;
      let companyH = imgCompany.height * (companyW / imgCompany.width);
      image(imgCompany, (width - companyW) / 2, 0, companyW, companyH);

      // 화면 아래 회색 박스
      noStroke();
      fill(120);
      rect(0, height - height / 4, width, height / 4);
      
      fill(0);
      textSize(30);
      // typeText([
      //   [" 드디어 오늘이 왔다! "],
      // //  ["오늘부터 나는 이 제약회사에서 인간의 감염병을 치료하는", "백신을 중점적으로 연구하는 프로젝트에 참여하게 되었다."], 
      // //  ["신입이니까 초반 며칠은 자잘한 서류 처리 작업을 맡겠지만,", "프로젝트를 진행하다보면 중대한 업무도 맡게 될 거라 믿는다."], 
      // //  ["질병의 치료라는 중대한 사명을 가지고 있는 만큼","'절대로 매뉴얼을 따라야 한다’는 선배의 말을 반드시 명심해야겠다."], 
      // //  ["후 ... 부담감과 기대감에 떨려오지만, 잘 적응해낼 수 있을거다. 할 수 있다!!"],
      // ]);
      texts = case1texts; 
      if (stageClear !== stage) {
        resetTextState();
        loadNextText();
        stageClear = stage;
      }
      drawTextbox();
      drawTyping();

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
      textSize(30);
      text("김철수", width / 20 + 235, height - 200);
    
      fill(0);
      textSize(30);
      // typeText([
      //   [playerName + " 씨 맞으신가요?"],
      // //  ["저는 연구 부서의 김철수 연구원이라고 합니다."],
      // //  ["해야 할 업무를 설명해 드리겠습니다."],
      // //  ["이전에 안내드린 바와 같이, 업무는 간단합니다."],
      // //  ["컴퓨터 화면에 그날 해야 할 업무 리스트가 제시되어 있을 겁니다."],
      // //  ["순서대로 업무를 수행해주시면 됩니다."],
      // ]);
      texts = case2texts;
      if (stageClear !== stage) {
        resetTextState();
        loadNextText();
        stageClear = stage;
      }
      drawTextbox();
      drawTyping();
      break;

    case 3:
      if (!manualbgm.isPlaying()) {
                stopAllbgm();
                manualbgm.loop(); // 자동 반복
                manualbgm.setVolume(0.6);
      }
      manualPic();

      // // 화면 아래 회색 박스
      // fill(120);
      // rect(0, height - height / 4, width, height / 4);

      // // 연구원 이름 표시 박스
      // fill(60, 215);
      // rectMode(CENTER);
      // noStroke();
      // rect(width / 20 + 235, height - 195, 200, 50, 10);
      // rectMode(CORNER);
      // fill(255);
      // textSize(30);
      // text("김철수", width / 20 + 235, height - 200);
    
      fill(0);
      textSize(30);
      // typeText([
      //   ["따라주셔야 할 매뉴얼을 드리겠습니다."],
      // //  ["매뉴얼을 따르지 않아 발생하는 문제는 회사에서 책임지지 않으므로,", "업무를 수행하면서 이를 반드시 지켜주시기 바랍니다."],
      // //  ["업무 전, 매뉴얼을 숙지해야 하니 한 번 매뉴얼을 읽어보세요."],
      // //  ["매뉴얼을 다 읽고 난 다음, 매뉴얼을 닫으시면 바로 업무를 시작할 수 있을 겁니다."]
      // ]);
      texts = case3texts;
      if (stageClear !== stage) {
        resetTextState();
        loadNextText();
        stageClear = stage;
      }
      drawTextbox();
      drawTyping();
      break;

    case 4:
      // 매뉴얼 주는 장면으로 배경 전환
      manualPic();

      // 화면 아래 회색 박스
      // fill(120);
      // rect(0, height - height / 4, width, height / 4);

      // // 연구원 이름 표시 박스
      // fill(60, 215);
      // rectMode(CENTER);
      // noStroke();
      // rect(width / 20 + 235, height - 195, 200, 50, 10);
      // rectMode(CORNER);
      // fill(255);
      // textSize(30);
      // text("김철수", width / 20 + 235, height - 200);

      fill(255, 0, 0);
      textSize(30);
      // typeText([
      //   [".. 반드시 매뉴얼을 따라주셔야 합니다."],
      // ]);
      texts = case4texts;
      if (stageClear !== stage) {
        resetTextState();
        loadNextText();
        stageClear = stage;
      }
      drawTextbox();
      drawTyping();
      break;

    case 5:
      manualPic();

      fill(120);
      rect(0, height - height / 4, width, height / 4);

      fill(55);
      textSize(30);
      // typeText([
      //   ["이제부터 [m]키를 눌러 매뉴얼북을 열거나 치울 수 있습니다."],
      //   ["매뉴얼을 다 읽으신 후 매뉴얼을 닫으면 자동으로 업무가 시작됩니다."]
      // ]);
      if (showManual !== lastShowManual) {
        mToggleCount++;
        lastShowManual = showManual;
      }
      texts = case5texts;
      if (stageClear !== stage) {
        resetTextState();
        loadNextText();
        stageClear = stage;
      }
      drawTextbox();
      drawTyping();

      

      // if (currentTextIndex >=   texts.length && mToggleCount >= 2) {
      //   stage ++;
      //   resetTyping();
      // }

      break;

    case 6:
      stopAllbgm();
      fill(255);
      textSize(70)
      text("Day 1", width / 2, height / 2 - 50);
      textSize(30);
      text("Click to continue ···", width / 2, height / 2 + 50);
      break;

    case 7: // 바탕화면 1
      // bgm
      if (!day1bgm.isPlaying()) {
                stopAllbgm();
                day1bgm.loop(); // 자동 반복
                day1bgm.setVolume(0.7);
      }

      // 업무 리스트
      fill(150, 150, 255);
      rect(width - 450, 50, 400, 200);
      fill(0);
      textSize(30);
      text("오늘의 할 일", width - 250, 85);
      text("1. 파일 정리", width - 250, 125);
      text("2. 정크 데이터 처리", width - 250, 165);
      text("3. 코드 해석", width - 250, 205);

      // 아이콘 표시: 파일 아이콘만 활성화
      drawIcons();

      // 다음 업무 미리 로드
      doctaskDay1 = new Day1Task1();
      doctaskDay1.start();
      break;
    
    case 8:
      // Day 1 -업무 1: 파일 정리 업무
      doctaskDay1.update();

      break;

    
    case 9: // 바탕화면 2
      // bgm
      if (!day1bgm.isPlaying()) {
                stopAllbgm();
                day1bgm.loop(); // 자동 반복
                day1bgm.setVolume(0.7);
      }
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

    case 10:
      // Day 1 - 업무 2: 정크 데이터 처리  
      fill(255);
      rect(50, 30, width - 100, height);
      
      fill(180);
      rect(width - 630, 60, 550, 80);

      fill(0);
      textSize(20);
      textAlign(LEFT, TOP);
      text("보고서에 적합하지 않는 부분을 드래그하여 선택하세요.", width - 610, 77);
      text("드래그 박스 안에 문단이 '정확히' 포함되어야 합니다.", width - 610, 102);

      if (sentenceObjs.length === 0) { 
        let firstLines = [
          "Day 1 데이터 정리",
          "내부 연구 보고서",
          "작성일자: [2025-06-20]",
          "작성자: 김철수 선임연구원",
          "보안등급: 내부기밀 (Confidential; for Internal Use Only)",
          "",
          "1. 보고서 개요",
          "본 문서는 당사 연구소 내 인지응답실험팀에서 수행한 초기 탐색적 연구 결과를 정리한 것이다.",
          "해당 연구는 약물 투여 후 피험자의 반응 속도, 정확성, 선택적 주의력 변화 등을 측정하였다.",
          "향후 임상 적용 가능성을 고려하여 연구 기록 보존 및 부서 간 공유를 목적으로 본 보고서를 작성하였다.",
          "",
          // 흐름에 맞지 않는 내용
          "★★★한 해를 마무리하는 특별 할인! 겨울의 마법이 시작됩니다. 따뜻한 순간을 선물하세요.",
          "크리스마스의 기적, 신상! 공포맛 케이크 출시!★★★",
          "",
          "인지 기능은 다양한 신경정신계 질환뿐만 아니라, 통증 완화, 수면 조절 등 다양한 치료영역과 밀접한 관련이 있다.",
          "최근 개발 중인 Compound X는 중추신경계에 선택적으로 작용하는 것으로 보고되었으며, 특히 공포 감각을 극대화하는 것으로 보인다.",
          "",
          "2. 실험 설계",
          "2.1 실험 대상자",
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

      if (stage === 10) {
      if (!error1Triggered) {
      error1.start();
      error1Triggered = true;
      }
      error1.display();
      } else {
      error1Triggered = false; // 다른 스테이지에서 다시 초기화
    }


      break;

    case 11: // 바탕화면 3
    //업무 2 초기화
    sentenceObjs = [];
    resultMessage = "";
    isDragging = false;
      
      // 업무 리스트
      fill(150, 150, 255);
      rectMode(CORNER);
      rect(width - 450, 50, 400, 200);
      fill(0);
      textSize(30);
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

    case 12:
      // Day 1 - 업무 3: 코드 해석
      image(imgCode, width / 2 - imgCode.width / 10, height / 2 + 50 - imgCode.height / 10, imgCode.width / 5, imgCode.height / 5);

      fill(255);
      textSize(windowWidth * 0.03);
      text("모스부호를 해독해서 적절한 글을 입력하시오", width / 2, height * 0.06 - 15);
      fill(255);
      text("-ㆍ- / ㆍㆍ / ㆍ-ㆍㆍ", width / 2, height * 0.15); // 제약->약으로 바꿈

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
      if (isResetTriggered && millis() - resetTriggeredTime > 1500) {
      stage = 500;
      isResetTriggered = false;
      resultMessage = "";
    }
    // "도재인"일 때: 엔딩 D // 임시 코드 + 꼭 바꾸세요!!
    if(anotherResetTriggered && millis()- resetTriggeredTime > 1500){
      stage = 600;
      anotherResetTriggere = false;
      resultMessage ="";
    }


      break;
      
    case 13: // Day 1 마무리 파트
      codeInput.value(''); // 모스부호 입력창 초기화
      //finishText = false;
      let deskW = 1000;
      let deskH = myDesk.height * (deskW / myDesk.width);
      image(myDesk, (width - deskW) / 2, 0, deskW, deskH);

      // 화면 아래 회색 박스
      noStroke();
      fill(120);
      rect(0, height - height / 4, width, height / 4);

      fill(0);
      textSize(30);
      // typeText([
      //   ["휴 ... 오늘은 힘든 하루였어 ..."],
      //   ["고연봉이라서 지원한 프로젝트인데 .. 그냥 그만둘까?"],
      //   ["아냐 .. 그래도 어떻게 입사했는데 ... 열심히 일 해야지 ...."],
      //   ["내일 하루도 힘내보자! 어떻게든 되겠지~"]
      // ]);
      texts = case13texts;
      drawTextbox();
      drawTyping();
      
      break;
      
    case 14: // Day 2로 전환
      stopAllbgm();
      fill(255);
      textSize(70);
      text("Day 2", width / 2, height / 2 - 50);
      textSize(30);
      text("Click to continue ···", width / 2, height / 2 + 50);

      
      break;

    case 15: // 바탕화면 1
      // bgm
      if (!day2bgm.isPlaying()) {
                stopAllbgm();
                day2bgm.loop(); // 자동 반복
                day2bgm.setVolume(0.7);
      }

      fill(150, 150, 255);
      rect(width - 450, 50, 400, 200);
      fill(0);
      textSize(30);
      text("오늘의 할 일", width - 250, 85);
      text("1. 파일 정리", width - 250, 125);
      text("2. 정크 데이터 처리", width - 250, 165);
      text("3. 코드 해석", width - 250, 205);
      
      // 아이콘 표시: 파일 아이콘만 활성화
      drawIcons();

      //에러 등장 코드
      if (stage === 15) {
      if (!error2Triggered) {
      error2.start();
      error2Triggered = true;
      }
      error2.display();
      } else {
      error2Triggered = false; // 다른 스테이지에서 다시 초기화
    }

      doctaskDay2 = new Day2Task1(); 
      doctaskDay2.start();
      break;

    case 16:
      // 여기에 둘째 날 업무 1 코드 넣어주세요
      doctaskDay2.update();

      break;

    case 17: // 바탕화면 2
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
      noStroke();

      drawIcons();

      break;

    case 18:
        if (startTime === 0) {
          startTime = millis();
          console.log("Stage 18 시작 시간 기록:", startTime);
        }

        let elapsed = millis() - startTime;

        // 깜빡이는 글리치 느낌: 알파값을 랜덤으로 바꿔줌
        let glitchAlpha = random(200, 255);  
        tint(255, glitchAlpha);
        image(fakeDoc, 0, 0, windowWidth, windowHeight);
        noTint();

        // 2초 후 스테이지 전환
        if (elapsed > 2000) {
          stage++;
          startTime = 0; // 다음 스테이지에서 새 타이머 시작
          console.log("5초 경과. 다음 스테이지로:", stage);
        }
        break;
    
    case 19:
      if (!afterDay1Started) {
        afterDay1.start();
        afterDay1Started = true;
      }

      afterDay1.update();

      break;

    case 20: // 바탕화면 3
      afterDay1Started = false; // 앞의 스크립트 초기화 함수
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
    
    case 21:
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
      text("--ㆍ/ --ㆍ-/ -ㆍ-/ --/ ㆍㆍㆍ/ -ㆍ-" /* ← 원하는 모스부호 */, width / 2, height * 0.15); // 일단 지금은 '생명' 넣어두었습니다

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
        resultMessage = ""
        codeInitialized = false;
      }
      if (isResetTriggered && millis() - resetTriggeredTime > 1500) {
      stage = 500;
      isResetTriggered = false;
      resultMessage = "";
    }
    // "도재인"일 때: 엔딩 D // 임시 코드 + 꼭 바꾸세요!!
    if(anotherResetTriggered && millis()- resetTriggeredTime > 1500){
      stage = 600;
      anotherResetTriggere = false;
      resultMessage ="";
    }

      
      // 틀릴 때 이미지
      if (showImage) {
        let elapsed = millis() - imageStartTime;
      if (elapsed < showDuration) {
      tint(255,127);
      image(wrongImage, 0, 0, width, height); // 전체화면에 이미지
      noTint();
      fill(255, 0, 0);
      textSize(48);
      for (let pos of warningPositions) {
        text("틀리지마", pos.x, pos.y);
      }

      } else {
      showImage = false; // 시간 지나면 안 보이게
      }
    }

      break;

    case 22:
      codeInput.value(''); // 모스부호 입력창 초기화
      if (!afterDay2Started) {
        afterDay2.start();
        afterDay2Started = true;
      }

      afterDay2.update();

      break;

    case 23: // Day 3로 전환
      afterDay2Started = false; // 앞의 스크립트 초기화 함수
      stopAllbgm();
      fill(255);
      textSize(70)
      text("Day 3", width / 2, height / 2 - 50);
      textSize(30);
      text("Click to continue ···", width / 2, height / 2 + 50);
    
      break;
    
    case 24: // 바탕화면 1
      // bgm
      if (!day3bgm.isPlaying()) {
                stopAllbgm();
                day3bgm.loop(); // 자동 반복
                day3bgm.setVolume(0.8);
      }

      fill(150, 150, 255);
      rect(width - 450, 50, 400, 200);
      fill(0);
      textSize(30);
      text("오늘의 할 일", width - 250, 85);
      text("1. 파일 정리", width - 250, 125);
      text("2. 정크 데이터 처리", width - 250, 165);
      text("3. 코드 해석", width - 250, 205);

      drawIcons();

      if (stage === 24) {
      if (!error3Triggered) {
      error3.start();
      error3Triggered = true;
      }
      error3.display();
      } else {
      error3Triggered = false; // 다른 스테이지에서 다시 초기화
    }

      doctaskDay3 = new Day3Task1(); 
      doctaskDay3.start();

      break;
    
    case 25:
      // 문서 업무 3일차
      doctaskDay3.update();
      break;

    case 26: // 바탕화면 2
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
      noStroke();

      drawIcons();
      
      break;

    case 27:

    stopAllbgm()

      if (draw.prevStage !== 27) {
        // stage가 다시 27로 돌아왔을 때 초기화됨
        draw.errorIndex = 0;
        draw.lastErrorTime = millis();
        draw.interval = 200;
        draw.errorTexts = [ 
          "7. 얼른./도./망-/가.",
          "6. [알수없는 오류입니다][알수없는 오류입니다]./[알수없는 오류입니다][알수없는 오류입니다]./[알수없는 오류입니다][알수없는 오류입니다]-",
          "5. 이제 어느 곳도 안전하지 않아-/이걸본사람이있다면제발./[알수없는 오류입니다][알수없는 오류입니다]-",
          "4. 여기에는 인간이 아닌 누군가가 느껴져-/[system error]-/표시하는데 오류가 발생했습니다./표시하는데 오류가 발생했습니다.",
          "3. 컴퓨터에서 Event Log를 시작하지 못했습니다./오류 확인을 위해 자세히보기를 눌러주세요-/오류ehdhkwnj-/지침서를 유심히 봐주세요.",
          "2. 업무가 정상적으로 처리되지 않았습니다./컴퓨터를 종료하지 마세요-",
          "1. :( PC에 문제가 발생하여 다시 시작해야 합니다-/일부 오류 정보를 수집하고 있습니다./그런 다음 자동으로 다시 시작합니다./ 현재 15% 완료."
        ];
        errors = []; // error 창도 초기화
        //-.../ .-/ .--./--.-/-.-/..-/..-.
      }

      // 에러창 생성
      if (draw.errorIndex < draw.errorTexts.length && millis() - draw.lastErrorTime > draw.interval) {
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

      // 마지막에 현재 스테이지 저장
      draw.prevStage = stage;

      break;

    case 28: 
      // bgm
      if (!day3bgm.isPlaying()) {
                stopAllbgm();
                day3bgm.loop(); // 자동 반복
                day3bgm.setVolume(0.8);
      }

      // 위 에러 등장 초기화
      draw.prevStage = stage;

      // Day 3 - 업무 2: 정크 데이터 처리
      fill(255);
      rect(50, 30, width - 100, height);
      
      fill(180);
      rect(width - 630, 60, 550, 80);

      fill(0);
      textSize(20);
      textAlign(LEFT, TOP);
      text("보고서에 적합하지 않는 부분을 드래그하여 선택하세요.", width - 610, 77);
      text("드래그 박스 안에 문단이 '정확히' 포함되어야 합니다.", width - 610, 102);

      if (!dragInitialized) {
        sentenceObjs = [];
        dragInitialized = true;
      }
      
      if (sentenceObjs.length === 0) { 
        let secondLines = [
          "내부 기밀 보고서 제403-2",
          "작성일자: [2025-06.22]",
          "작성 부서: 조직행동 관찰국 - 인지추출실",
          "보안 등급: 🔴 최상위",
          "",
          "1. 보고 목적",
          "본 보고서는 신입 직원 #A1127(이하 “대상”)의 일상적 업무 수행 반응을 통해 정서 자극 민감도,",
          "인지 왜곡 내성, 감정 수율 등을 분석하고 ner%^rㅇㄹ3로서의 적합성 여부를 평가하기 위해 작성되었다.",
          "",
          "2. 업무 평가 개요",
          "업무 관찰 코드명: 〈일상 과업 기반 적합성 판별 실험>",
          "대상의 3일 동안의 파일 분류, 데이터 정리, 부호 해석 업무를 관찰",
          "",
          "※살고싶fdfㅏ다면2ㅏㅣ2자ㅣㅏ제발 이걸읽어※",
          "그것들은 인간이 아니야. 퇴사를 하려고 시도한 사람은 다 실종됐다. 다행히 도망칠 수 있는-방법을 알아내 그 방법을 남긴다.",
          "모스부호에 초기화코드'/456827'을 입력하면 문제를 고치는 동안 시선을 피할 수 있을 거다. 무사히 돌아갈 수 있기를... ",
          "",
          "3. 종합 분석",
          "“그만둘까?” 발언 3회 기록 → 감정 단백질 분해 시작, 무기력 에너지 추출 가능성 확인",
          "비록 약간의 반복적인 화면에 대한 스트레스와 피곤함이 보이지만 다른 개체에서는 안 보이는 성실도가 보임,",
          "관찰 기간 동안 대상은 명백한 업무 반응성 우수 ㄸner%^&로 분류됨."
        ];

        for (let i = 0; i < secondLines.length; i ++) {
          let line = secondLines[i];
          let isWrong = false;

          // 이상한 문장 판별 기준
          if (line.includes("읽어") || line.includes("도망")||line.includes("초기화코드")) {
            isWrong = true;
          }

          sentenceObjs.push({
            text: line,
            x: 80,
            y: 70 + i * lineHeight,
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
      // 틀렸을 때 wrongAction 이미지 보이게
      if (showImage) {
        let elapsed = millis() - imageStartTime;
      if (elapsed < showDuration) {
      tint(255,127);
      image(wrongImage, 0, 0, width, height); // 전체화면에 이미지
      noTint();
      fill(255, 0, 0);
      textSize(48);
      for (let pos of warningPositions) {
        text("틀리지마", pos.x, pos.y);
      }

      } else {
      showImage = false; // 시간 지나면 안 보이게
      }
    }

      break;

    case 29: // 바탕화면 3
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

    case 30:
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
      text("--ㆍ/ ㆍ/ ㆍㆍㆍ-/ ㆍㆍㆍ-/ ㆍㆍㆍ/ ㆍ--ㆍ/ ㆍㆍㆍㆍ/ -" /* ← 원하는 모스부호 */, width / 2, height * 0.15); // 정답: 살려줘

      let btnX28 = width / 2 + 210;
      let btnY28 = height - 81;
      let btnW28 = 80;
      let btnH28 = 62;

      checkButton(btnX28, btnY28, btnW28, btnH28);
      noStroke();
      rect(btnX28, btnY28, btnW28, btnH28);

      fill(255);
      textSize(30);
      text("확인", width / 2 + 250, height - 52);

      if (resultMessage !== "") {
        if(morseCorrect) {
          fill(0, 100, 255);
        } else if(isResetTriggered) {
          fill(60, 215);
        } else fill(255, 50, 50);
        rect(width / 2 - 250, height / 2, 500, 100);
        fill(255);
        text(resultMessage, width / 2, height / 2 + 48);
      }
      
      // 틀릴 때 이미지
      if (showImage) {
        let elapsed = millis() - imageStartTime;
      if (elapsed < showDuration) {
      tint(255,127);
      image(wrongImage, 0, 0, width, height); // 전체화면에 이미지
      noTint();
      fill(255, 0, 0);
      textSize(48);
        for (let pos of warningPositions) {
          text("틀리지마", pos.x, pos.y);
        }
      } else {
      showImage = false; // 시간 지나면 안 보이게
      }
    }
    
    // 정답일 때: 엔딩 A
    if (morseCorrect && millis() - morseCheckTime > 1500) {
      stage = 300;
      morseCorrect = false;
      resultMessage = "";
    }

    // "/456827"일 때: 엔딩 C
    if (isResetTriggered && millis() - resetTriggeredTime > 1500) {
      stage = 500;
      isResetTriggered = false;
      resultMessage = "";
    }
    // "도재인"일 때: 엔딩 D // 임시 코드 + 꼭 바꾸세요!!
    if(anotherResetTriggered && millis()- resetTriggeredTime > 1500){
      stage = 600;
      anotherResetTriggere = false;
      resultMessage ="";
    }

      break;

    case 300: // 엔딩 A
      codeInput.value(''); // 모스부호 입력창 초기화
      
      if (!endingAStarted) {
        endingA = new EndingA(playerName);
        endingA.start();
        endingAStarted = true;
      }

      if (endingA) {
        endingA.update(); // 매 프레임마다 update()는 호출되어야 함
      }

      break;
    
    case 400: // 엔딩 B
    draw.prevStage = stage;//에러창 개수 수정 코드
      // bgm
      if (!endingBbgm.isPlaying()) {
        stopAllbgm();
        endingBbgm.loop(); // 자동 반복
        endingBbgm.setVolume(0.8);
      }
        endingB.update();
      break;

    case 500: // 엔딩 C
      // bgm
      if (!endingCbgm.isPlaying()) {
        stopAllbgm();
        endingCbgm.loop(); // 자동 반복
        endingCbgm.setVolume(1.0);
      }

      codeInput.value(''); // 모스부호 입력창 초기화

      // 엔딩 C 초기화 코드
      if (!endingCStarted) {
        endingC = new EndingC();
        endingC.preload();
        endingC.start();
        endingCStarted = true;
      }

      if (endingC) {
        endingC.update(); // 매 프레임마다 update()는 호출되어야 함
      }

      break;

    case 600: // 엔딩 D
      // bgm
      if (!endingDbgm.isPlaying()) {
        stopAllbgm();
        endingDbgm.loop(); // 자동 반복
        endingDbgm.setVolume(0.9);
      }

      codeInput.value(''); // 모스부호 입력창 초기화
      // 엔딩 D 초기화 코드
      if (!endingD1Started) {
        endingD1 = new EndingD1();
        endingD1.start();
        endingD1Started = true;
      }

      if (endingD1) {
        endingD1.update(); // 매 프레임마다 update()는 호출되어야 함
      }

      break;

    case 601: // 엔딩 D 연결
       if (!endingD2Started) {
        endingD2 = new EndingD2(playerName);
        endingD2.preload();
        endingD2.start();
        endingD2Started = true;
      }

      if (endingD2) {
        endingD2.update(); // 매 프레임마다 update()는 호출되어야 함
      }

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
    (stage === 12 &&
      mouseX >= width / 2 + 210 &&
      mouseX <= width / 2 + 290 &&
      mouseY >= height - 81 &&
      mouseY <= height - 19)
    ||
    (stage === 21 &&
      mouseX >= width / 2 + 210 &&
      mouseX <= width / 2 + 290 &&
      mouseY >= height - 81 &&
      mouseY <= height - 19)
    ||
    (stage === 30 &&
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
//   //isWaiting->isWaitingClick로 변경
//   // 3. 텍스트 다 나오고 클릭 대기 중
//   if ([1, 2, 3, 4, 13].includes(stage) && clickReady) {
//   isHand = true;
//   }

// //isWaiting->isWaitingClick로 변경
//   if (stage === 5) {
//     if (isWaiting && part === 0) {
//       isHand = true;
//     }
//   }

  // 4. Day 전환 화면
  if ([6, 14, 23].includes(stage)) {
    isHand = true;
  }

  cursor(isHand ? HAND : ARROW);
}

function mouseClicked() {
  if (stage === 0) {
    // 확인 버튼 클릭 시 다음 stage로
    if (
      mouseX >= width / 2 + 130 &&
      mouseX <= width / 2 + 210 &&
      mouseY >= height / 2 - 1.5 &&
      mouseY <= height / 2 + 51.5
    ) {
      playerName = nameInput.value();
      stage ++;
      nameInput.hide();
    }
  }

  // if ([1, 2, 3, 4, 5, 13].includes(stage)) {
  //   if (isWaiting && !finishText) {
  //     part++;
  //     linePart = 0;
  //     letterCount = 0;
  //     isWaiting = false;
  //     lastTime = millis();
  //   }
  //   else if (finishText && stage !== 5) {
  //     stage++;
  //     resetTyping();
  //   }
  // }
  

  
// stage 23에서 stage 24를 mousePressed와 mouseClicked가 중복 적용되어서 빨리 넘어가는 바람에 쓰는 제한 코드
// 2번 눌러야 다음으로 진행됩니다
  if (stage === 6 || stage === 14 || stage === 23) {
  if (stageHandled < 1) {
    stageHandled++
  } else if(stageHandled == 1){
    stage ++;
    stageHandled = 0;
    } 
  }

  // 바탕화면이 보이는 stage 정의
  if (
    stage === 7 ||
    stage === 9 ||
    stage === 11 ||
    stage === 15 ||
    stage === 17 ||
    stage === 20 ||
    stage === 24 ||
    stage === 26 ||
    stage === 29
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
      stage ++;
    }
  }

  // 모스부호 스테이지 정의
  if (stage === 12 || stage === 21 || stage === 30) {
    if (
      mouseX >= width / 2 + 210 &&
      mouseX <= width / 2 + 290 &&
      mouseY >= height - 81 &&
      mouseY <= height - 19
    ) {
      checkMorseAnswer();
    }
  }
  
  if (stage == 10){
    if (error1 && error1.isClicked(mouseX, mouseY)) {
      returnStage = 9;
      resultMessage = ""
      stage = 400;
      endingB = new EndingB();     // ✅ 새 인스턴스 생성
      endingB.preload();           // ✅ 이미지 다시 불러오기
      endingB.start();             // ✅ 상태 초기화
      return;
    }
}
  if (stage == 15){
    if (error2 && error2.isClicked(mouseX, mouseY)) {
    returnStage = 15;
    resultMessage = ""
    stage = 400;
    endingB = new EndingB();     // ✅ 새 인스턴스 생성
    endingB.preload();           // ✅ 이미지 다시 불러오기
    endingB.start();             // ✅ 상태 초기화
    return;
  }
}
  if (stage == 24){
    if (error3 && error3.isClicked(mouseX, mouseY)) {
    returnStage = 24;
    stage = 400;
    resultMessage = ""
    endingB = new EndingB();     // ✅ 새 인스턴스 생성
    endingB.preload();           // ✅ 이미지 다시 불러오기
    endingB.start();             // ✅ 상태 초기화
    return;
  }
}
  // 뒤에서부터 검사해서 삭제 시 인덱스 밀림 방지
  for (let i = errors.length - 1; i >= 0; i--) {
    if (errors[i].isXBtnClicked(mouseX, mouseY)) {
      errors.splice(i, 1);

      // 모든 창 닫혔는지 확인
      if (errors.length === 0) {
        stage ++; // 원하는 다음 스테이지 번호로 바꾸세요
      }
      return; // 한 번에 하나만 닫기
    }
    else if (errors && stage === 27 && errors[i].isDetailBtnClicked(mouseX, mouseY)) {
    returnStage = 24;
    stage = 400;
    endingB = new EndingB();     // ✅ 새 인스턴스 생성
    endingB.preload();           // ✅ 이미지 다시 불러오기
    endingB.start();             // ✅ 상태 초기화
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
  if (stage === 1 || stage === 2 || stage === 3 ||  stage === 4 || stage === 5|| stage === 13) {
    if (isTyping) {
      displayedText = fullText;
      charIndex = fullText.length;
      isTyping = false;
      clickReady = true;
    } else if (clickReady) {
      currentTextIndex++;
      loadNextText();
    }
  }
  // if (stage === 6 || stage === 14) {   
  //   stage ++;
  // }
  if (stage === 8) {
    doctaskDay1.mousePressed();
  }
  // 드래그 업무 쓰는 스테이지
  if (stage === 10 || stage === 28) {
    for (let s of sentenceObjs) {
      s.state = "default";
    }
    resultMessage = ""

    dragStartX = mouseX;
    dragStartY = mouseY;
    isDragging = true;
  }
  if (stage === 16){
     doctaskDay2.mousePressed();
  }
  // afterDay들 마우스 처리
  if(stage === 19){
    afterDay1.mousePressed();
  }

  if(stage === 22){
    afterDay2.mousePressed();
  }
  if (stage === 25){
    doctaskDay3.mousePressed();
  }

  if (stage === 300 && endingA){
    endingA.handleClick(); // 다시 시작 코드
  }
  if (stage === 400) {
    endingB.handleClick();} // 클릭 처리

  if (stage === 500) {
    endingC.mousePressed();}
  if (stage === 500 && endingC){
  endingC.handleClick(); // 다시 시작 코드
  }
  if (stage === 601) {
    endingD2.mousePressed();
  }
  if (stage === 601 && endingD2){
  endingD2.handleClick(); // 다시 시작 코드
  }
}

function mouseDragged() {
  if (stage === 8){
    doctaskDay1.mouseDragged();
  }
  if (stage === 16) {
    doctaskDay2.mouseDragged();
  }
  if (stage === 25) {
    doctaskDay3.mouseDragged();
  }
}

function mouseReleased() {
  if (stage === 8){
    doctaskDay1.mouseReleased();
  }
    // 드래그 쓰는 스테이지
  if (stage === 10 || stage === 28) {
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
        sentenceObjs = [];  // 필요하면 리셋
      }, 1500);
    } else {
      fill(255, 50, 50);
      resultMessage = "실패입니다. 다시 시도하세요.";
      //틀린 횟수 세기
      wrongAction();
    }
  }
  if (stage === 16) {
    doctaskDay2.mouseReleased();
  }
  if (stage === 25) {
    doctaskDay3.mouseReleased();
  }
}

//텍스트 타자 효과 함수
// function typeText(texts) {

//   let lines = texts[part];

//   let boxTop = height - height / 4;
//   let lineHeight = 45;
//   let totalTextHeight = lines.length * lineHeight;
//   let startY = boxTop + (height / 4 - totalTextHeight) / 2 + 15;

//   // 줄별 출력: 이전 줄은 전체, 현재 줄은 일부, 다음 줄은 빈 문자열
//   for (let i = 0; i < lines.length; i ++) {
//     let txtToShow;
//     if (i < linePart) {
//       txtToShow = lines[i];  // 이미 타자 완료한 줄
//     } else if (i === linePart) {
//       txtToShow = lines[i].substring(0, letterCount);  // 타자 진행 중인 줄
//     } else {
//       txtToShow = "";  // 아직 타자 시작 안 한 줄
//     }
//     text(txtToShow, width / 2, startY + i * lineHeight);
//   }

//   if (!isWaiting && millis() - lastTime > typingSpeed) {
//     if (letterCount < lines[linePart].length) {
//       letterCount ++;
//       lastTime = millis();
//     } else {
//       // 현재 줄 타자 끝 → 다음 줄로
//       linePart ++;
//       letterCount = 0;
//       lastTime = millis();

//       if (linePart >= lines.length) {
//         // 모든 줄 타자 끝 → 대기 시작
//         isWaiting = true;
//       }
//     }
//   }

//   if (isWaiting) {
//     if (part >= texts.length - 1) {
//       finishText = true;
//     }
//   }
// }
// function typeText(texts) {
//   if (!texts[part]) return;
//   let lines = texts[part];

//   let boxTop = height - height / 4;
//   let lineHeight = 45;
//   let totalTextHeight = lines.length * lineHeight;
//   let startY = boxTop + (height / 4 - totalTextHeight) / 2 + 15;

//   for (let i = 0; i < lines.length; i++) {
//     let txtToShow;
//     if (i < linePart) {
//       txtToShow = lines[i];
//     } else if (i === linePart) {
//       txtToShow = lines[i].substring(0, letterCount);
//     } else {
//       txtToShow = "";
//     }
//     text(txtToShow, width / 2, startY + i * lineHeight);
//   }

//   if (isTyping && millis() - lastTime > typingSpeed) {
//     if (letterCount < lines[linePart].length) {
//       letterCount++;
//       lastTime = millis();
//     } else {
//       linePart++;
//       letterCount = 0;
//       lastTime = millis();

//       if (linePart >= lines.length) {
//         isTyping = false;
//         isWaitingClick = true;
//       }
//     }
//   }

//   if (!isTyping && isWaitingClick && part >= texts.length - 1) {
//     finishText = true;
//   }
// }



// // 텍스트 타자 효과 초기화 함수
// function resetTyping() {
//   part = 0;
//   linePart = 0;
//   letterCount = 0;
//   isWaiting = false;
//   finishText = false;
//   lastTime = millis();
// }

// 연구원 이미지 비율 유지하면서 표시하는 함수
function drawResearcher() {
  let researcherW = 500;
  let researcherH = imgResearcher.height * (researcherW / imgResearcher.width);
  let imgX = 80;
  let imgY = height - height / 4 - researcherH + 200;
  image(imgResearcher, imgX, imgY, researcherW, researcherH);
}

// 매뉴얼 주는 장면 배경 표시 함수
function manualPic() {
  let manualPicW = 1000;
  let manualPicH = thisIsManual.height * (manualPicW / thisIsManual.width);
  image(thisIsManual, (width - manualPicW) / 2, 0, manualPicW, manualPicH);
}

// 매뉴얼 띄우는 함수
function drawManual() {
  if (!showManual) return;
  manualPicH = height * 0.8;
  manualPicW = manualPicH * (imgManual.width / imgManual.height);
  manualX = width / 2 - manualPicW / 2;
  manualY = height * 0.05;
  image(imgManual, manualX, manualY, manualPicW, manualPicH);
}

function keyPressed() {
  const focusedEl = document.activeElement;

  // 인풋창 포커스 시 키 무시
  if (
    focusedEl === nameInput.elt ||
    focusedEl === codeInput.elt
  ) {
    return;
  }

  // stage 5 이후에 m키 누르면 매뉴얼이 나오도록
  if (stage >= 5 && key === 'm') {
    showManual = !showManual;
  }
  //엔터치면 넘어가는 함수였는데 위로 이동해서 각주처리
//   if(stage == 0 && nameInput.value !==""){
//     if (keyCode === ENTER) {
//       playerName = nameInput.value();
//       stage = 1; // 다음 스테이지로 이동
//     }
//   }
//   if(stage === 12 || stage === 21||stage === 30){

//     if(keyCode === ENTER){
//       checkMorseAnswer();
//     }
//   }
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
  if (stage === 7 | stage === 15 | stage === 24 ) return "file";
  if (stage === 9 | stage === 17 | stage === 26 ) return "doc";
  if (stage === 11 | stage === 20 | stage === 29 ) return "sat";
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
    (stage === 12 && codeCheck === "약") ||
    (stage === 21 && codeCheck === "생명") ||
    (stage === 30 && codeCheck === "살려줘")
  ) {
    resultMessage = "성공입니다.";
    morseCorrect = true;
    morseCheckTime = millis();  
  } else if ((stage === 12 || stage ===21 || stage === 30 )&& codeCheck === "/456827") {
    resultMessage = "시스템 초기화 중 ...";
    isResetTriggered = true;
    resetTriggeredTime = millis();
    morseCorrect = false;
    codeInput.value(''); 
  } else if ((stage === 12 || stage ===21 || stage === 30 ) && codeCheck === "도재인") { 
    resultMessage = "매뉴얼 무효화 시스템 가동 중 ...";
    anotherResetTriggered = true;
    resetTriggeredTime = millis();
    morseCorrect = false;
    codeInput.value(''); 
  } else {
    resultMessage = "실패입니다. 다시 시도하세요.";
    morseCorrect = false;
    morseCheckTime = 0;
    wrongAction();
  }
}

function wrongAction() {
  wrongCount ++;
  console.log(wrongCount);

  if (wrongCount === 3) {
    showImage = true;
    imageStartTime = millis();
    wrongCount =0;

    warningPositions = [];
    for (let i = 0; i < warningCount; i ++) {
      let x = random(100, width - 100);
      let y = random(100, height - 100);
      warningPositions.push({ x: x, y: y });
    }
  }
}

// 모든 bgm 정지 함수
function stopAllbgm() {
  beforeDay1bgm.stop();
  day1bgm.stop();
  day2bgm.stop();
  day3bgm.stop();
  endingBbgm.stop();
  endingCbgm.stop();
  endingDbgm.stop();
  manualbgm.stop();
}


function drawTextbox() {
    let boxW = width * 0.9;
    let boxH = 160;
    let boxX = width / 2 - boxW / 2;
    let boxY = height - boxH - 50;

    noStroke();
    fill(120);
    rect(0, height - height / 4, width, height / 4);

    let speaker = texts[currentTextIndex]?.speaker;

    if (speaker === "김철수") {
      noStroke();
      fill(60);
      rectMode(CENTER);
      rect(boxX + 230, boxY + 15, 200, 50, 10);
      rectMode(CORNER);
      fill(255);
      textSize(30);
      textAlign(CENTER, CENTER);
      text("김철수", boxX + 230, boxY + 10);
    }

    fill(0);
    textSize(30);
    text(displayedText, width / 2, 7 / 8 * height);
  }


function drawTyping() {
    if (  isTyping &&   charIndex <   fullText.length) {
      if (millis() -   lastUpdateTime >   delay) {
          displayedText +=   fullText.charAt(  charIndex);
          charIndex++;
          lastUpdateTime = millis();
      }
    } else {
        isTyping = false;
        clickReady = true;
    }
  }


function loadNextText() {
    if (currentTextIndex >= texts.length) {
    if (stage === 5) {
      if (mToggleCount >= 2) {
        fullText = "";
        displayedText = "";
        clickReady = false;
        stage++;
        stageClear = -1;
        resetTextState();
      }
      // ❗ 조건 미충족이면 그냥 대기 (return만)
      return;
    }

    // 일반 스테이지는 바로 진행
    fullText = "";
    displayedText = "";
    clickReady = false;
    stage++;
    resetTextState();
    return;
    }

    let obj =texts[currentTextIndex];
      fullText = obj.text;
      displayedText = "";
      charIndex = 0;
      lastUpdateTime = millis();
      isTyping = true;
      clickReady = false;
  }

function resetTextState() {
  currentTextIndex = 0;
  fullText = "";
  displayedText = "";
  charIndex = 0;
  lastUpdateTime = 0;
  isTyping = false;
  clickReady = false;
}