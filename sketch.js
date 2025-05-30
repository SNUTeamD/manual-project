// ====== 전역 변수 설정 ======
// 이미지, 폰트, 인풋창 등 기본 변수들 선언
let myFont;
let imgManual, imgResearcher, imgCompany, imgCode;
let activeFileIcon, inactiveFileIcon;
let activeDocIcon, inactiveDocIcon;
let activeSatIcon, inactiveSatIcon;

let stage = 0;  // 현재 게임의 진행 상태

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


// ====== 폰트 및 이미지 미리 불러오기 ======
function preload() {
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
}


// ====== 초기 설정 ======
function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(myFont);
  textSize(35);
  textAlign(CENTER, CENTER);

  setupInputs(); // 입력창 초기화
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
  } else if (stage === 9) {
    nameInput.hide();
    codeInput.show();
  } else {
    nameInput.hide();
    codeInput.hide();
  }

  // 진행 단계(stage)에 따른 화면 분기 처리
  switch (stage) {
    case 0:
      // 초기 화면: MANUAL + 확인 버튼
      fill(255);
      textSize(120);
      text('MANUAL', width / 2, height / 2 - 100);

      fill(255, 0, 0);
      rect(width / 2 + 130, height / 2 - 1.5, 80, 53); // 확인 버튼 배경

      // 확인 버튼 마우스 오버 처리
      let isHovering =
        mouseX >= width / 2 + 130 &&
        mouseX <= width / 2 + 210 &&
        mouseY >= height / 2 - 1.5 &&
        mouseY <= height / 2 + 51.5;

      if (isHovering) {
        fill(255, 80, 80);
        cursor(HAND);
      } else {
        fill(255, 0, 0);
        cursor(ARROW);
      }

      rectMode(CORNER);
      rect(width / 2 + 130, height / 2, 80, 53);

      fill(255);
      textSize(30);
      textAlign(CENTER, CENTER);
      text('확인', width / 2 + 170, height / 2 + 22);
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
        ["프로젝트 [dlsRKsdPsjwl-444]."],
        ["내가 다니는 회사에서 진행하고 있는 기밀 프로젝트이자,", "오늘부터 참여하게 된 프로젝트이다."],
        ["모든 게 기밀이라는 이 프로젝트."],
        ["몇 번이고 ‘절대로 매뉴얼을 따라야 한다’는", "안내가 이루어졌다는 점이 마음에 걸리지만"],
        ["기밀이고, 중요한 프로젝트인만큼 규칙도 철저한 것이라 믿는다."],
        ["높은 초봉에 사무직.. 이런 조건은 어디에도 없을 기회다."],
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
        ["저는 연구 부서의 김철수 연구원이라고 합니다."],
        ["해야 할 업무를 설명해 드리겠습니다."],
        ["이전에 안내드린 바와 같이, 업무는 간단합니다."],
        ["컴퓨터 화면에 그날 해야 할 업무 리스트가 제시되어 있을 겁니다."],
        ["순서대로 업무를 수행해주시면 됩니다."],
        ["따라주셔야 할 매뉴얼을 드리겠습니다."],
        ["매뉴얼을 따르지 않아 발생하는 문제는 회사에서 책임지지 않으므로,", "업무를 수행하면서 이를 반드시 지켜주시기 바랍니다."]
      ]);

      if (finishText) {
        stage++;
        resetTyping();
      }

      break;

    case 3:
      // 매뉴얼 사용법 설명
      drawResearcher();
      fill(120);
      rect(0, height - height / 4, width, height / 4);

      fill(30);
      typeText([
        ["[이제부터 m 키를 눌러 매뉴얼을 확인할 수 있습니다.]"]
      ]);

      if (finishText) {
        stage++;
        resetTyping();
      }

      break;

    case 4:
      // 경고 메시지
      drawResearcher();
      fill(120);
      rect(0, height - height / 4, width, height / 4);

      fill(255, 0, 0);
      textStyle(BOLD);
      typeText([
        [".. 반드시 매뉴얼을 따라주셔야 합니다."]
      ]);
      break;

    case 5:
      // Day 1 시작 화면
      fill(255);
      textSize(70)
      text("Day 1", width / 2, height / 2 - 50);
      textSize(30);
      text("Click to continue ···", width / 2, height / 2 + 50);
      finishText = true;
      break;

    case 6:
      // Day 1 - 업무 1: 파일 정리
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
      // Day 1 - 업무 2: 정크 데이터 처리
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

      // 아이콘 표시: 문서 아이콘만 활성화
      drawIcons();
      break;

    case 8:
      // Day 1 - 업무 3: 코드 해석
      fill(150, 150, 255);
      rect(width - 450, 50, 400, 200);
      fill(0);
      text("오늘의 할 일", width - 250, 85);
      text("1. 파일 정리", width - 250, 125);
      text("2. 정크 데이터 처리", width - 250, 165);
      text("3. 코드 해석", width - 250, 205);

      // 밑줄: 업무 1, 2 완료 표시
      strokeWeight(3);
      line(width - 350, 130, width - 150, 130);    // 1번 줄 완료
      line(width - 400, 170, width - 100, 170);    // 2번 줄 완료

      // 아이콘 표시: 위성 아이콘만 활성화
      drawIcons();
      break;

    case 9:
      // 모스 부호 화면과 인풋창
      imageMode(CENTER);
      rectMode(CENTER);

      image(imgCode, width / 2, height / 2 + 50, imgCode.width / 5, imgCode.height / 5);

      fill(255);
      strokeWeight(1);
      rect(width / 2, height * 0.05, width * 0.75, height * 0.08);

      fill(0);
      textSize(windowWidth * 0.03);
      text("모스부호를 해독해서 적절한 글을 입력하시오", width / 2, height * 0.06 - 15);
      fill(255);
      text(".-- . -.- ..- ...- - --. -..", width / 2, height * 0.15);

      fill(255, 0, 0);
      noStroke();
      rect(width / 2 + 250, height - 50, 80, 62);

      fill(255);
      textSize(30);
      text("확인", width / 2 + 250, height - 52);
      break;
  }
}


// ====== 클릭 이벤트 처리 ======
function mouseClicked() {
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
  } else if (stage == 1 || stage == 4) {
    if (finishText) {
      stage++;
      resetTyping();
    }
  } else if (stage == 5) {
    stage++;
  } else if (stage >= 6 && stage <= 8) {
    // 활성화된 아이콘 클릭 시 다음 stage로
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
}
