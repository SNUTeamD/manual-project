let img;
let scale = 0.25;
let inputBox;
let resultMessage = "";
let buttonX, buttonY, buttonW, buttonH;
let gameState = "quiz"; // "quiz" 또는 "success"

function preload() {
  img = loadImage("assets/모스부호.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textAlign(CENTER);
  rectMode(CENTER);

  // 입력창 생성
  inputBox = createInput();
  inputBox.size(600, 60);
  inputBox.position(windowWidth / 2 - 300, windowHeight / 10 * 9);
  inputBox.style("font-size", "32px");
  inputBox.style("padding", "10px");

  // 버튼 위치와 크기 설정
  buttonW = 100;
  buttonH = 60;
  buttonX = windowWidth / 2 + 350 + buttonW / 2;
  buttonY = windowHeight / 10 * 9 + buttonH / 2;
}

function draw() {
  background(105, 159, 169);

  if (gameState === "quiz") {
    // 퀴즈 화면
    image(img, width / 2, (windowHeight / 4) * 2, img.width * scale, img.height * scale);

    fill(255);
    stroke(0);
    textSize(64);
    rect(width / 2, windowHeight / 20, windowWidth / 4 * 3, windowHeight / 12);
    fill(0);
    text("모스부호를 해독해서 적절한 글을 입력하시오", width / 2, windowHeight / 15);
    text("– – ·　 ·　 · · · –　 · · · –　 · · ·　 · – – ·　 · · · ·　 –　", width / 2, windowHeight / 7);

    fill(74, 144, 226);
    stroke(255);
    strokeWeight(2);
    rect(buttonX, buttonY, buttonW, buttonH, 10);

    fill(255);
    noStroke();
    textSize(24);
    text("제출", buttonX, buttonY + 8);

    fill(0);
    textSize(48);
    text(resultMessage, width / 2, windowHeight / 10 * 8.5);
  }

  else if (gameState === "success") {
    // 성공 화면
    background(0);
    fill(255);
    textSize(72);
    text("Day 2", width / 2, height / 2);
  }
}

function mousePressed() {
  if (gameState === "quiz") {
    if (mouseX > buttonX - buttonW / 2 && mouseX < buttonX + buttonW / 2 &&
        mouseY > buttonY - buttonH / 2 && mouseY < buttonY + buttonH / 2) {
      checkAnswer();
    }
  }
}

function checkAnswer() {
  const userInput = inputBox.value().trim();
  if (userInput === "살려줘") {
    gameState = "success";  // 상태를 "성공 화면"으로 변경
    inputBox.hide();        // 입력창 숨기기
  } else {
    resultMessage = "틀렸습니다. 다시 시도하세요.";
    console.log("실패");
  }
}


