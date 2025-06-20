// 실패 시 stage 분기 필요

class Day3Task1 {
  constructor() {
    this.folders = [];
    this.docs = [];
    this.docNames = ["공황", "절망", "혼란", "불안", "공포", "망상", "분노", "초조"];
    this.answerMap = {
      "공황": "포집용",
      "절망": "포집용",
      "혼란": "포집용",
      "불안": "포집용",
      "공포": "감정 연구",
      "망상": "포집용",
      "분노": "포집용",
      "초조": "포집용"
    };

    this.isInitialized = false;
    this.missionEnded = false;
    this.missionSuccess = false;
    this.mistakeMade = false; // 실수 여부
  }
  preload(){
    insertSound = loadSound('audio/파일 넣는 소리 수정.mp3');
  }
  start() {
    this.isInitialized = false;
    this.missionEnded = false;
    this.missionSuccess = false;
    this.folders = [];
    this.docs = [];
  }

  update() {
    // 안내 텍스트
    fill(255);
    textSize(16);
    textAlign(CENTER, TOP);
    textFont(myFont);
    text("문서를 마우스로 클릭해 선택하세요. 인간이 보이는 감정 문서는 ‘포집용’ 폴더에, \n???이 섭취하는 감??문서는 ‘감정 연구’ 폴더에 넣어주세요. \n???에영양되는것만모아서??>&%를 옮기면, 자동으로 ???로 전송이 완료됩니다.", width / 2, 40);

    if (!this.isInitialized) {
      // 폴더 위치 설정
      this.folders.push(new MyFolder(width / 3, 200, 100, 60, "포집용"));
      this.folders.push(new MyFolder(2 * width / 3, 200, 100, 60, "감정 연구"));

      // 문서들 배치
      let cols = 4;
      let spacing = 150;
      let startX = width / 3;
      let startY = 350;

      for (let i = 0; i < this.docNames.length; i++) {
        let x = startX + (i % cols) * spacing;
        let y = startY + floor(i / cols) * spacing;
        this.docs.push(new MyDoc(x, y, 50, 80, this.docNames[i]));
      }

      this.isInitialized = true;
    }

    // 폴더 그리기
    for (let f of this.folders) {
      f.display();
    }

    // 문서 그리기
    for (let d of this.docs) {
      if (!d.removed) {
        d.display();
      }
    }
    
    if (!this.missionEnded) {
    this.checkMissionStatus();

    if (this.mistakeMade) {
      fill(255, 0,0);
      textSize(36);
      text("틀렸어.", width / 2, height - 100);
    }

    } else if (this.missionSuccess) {
    stage++;
    }
    //틀릴 때 이미지
    if (showImage) {
  let elapsed = millis() - imageStartTime;
  if (elapsed < showDuration) {
    tint(255, 127);
    image(wrongImage, 0, 0, width, height); // 전체화면에 이미지
    noTint();
    fill(255, 0, 0);
    textSize(48);
    for (let pos of warningPositions) {
      text("틀리지마", pos.x, pos.y);
    }
  } else {
    showImage = false;
    this.mistakeMade = false; // ✅ 이미지가 사라지면 실수 상태도 초기화
  }
}

  }

  mousePressed() {
    if (this.missionEnded) return;
    for (let doc of this.docs) {
      doc.checkPressed();
    }
  }

  mouseDragged() {
    if (this.missionEnded) return;
    for (let doc of this.docs) {
      doc.drag();
    }
  }

  mouseReleased() {
    if (this.missionEnded) return;

    let wrongCalled = false;

    for (let doc of this.docs) {
      if (doc.removed) continue;
      doc.stopDragging();
      doc.inBasket = null; // 드래그 후 폴더에 넣지 않은 경우 초기화

      for (let f of this.folders) {
        if (f.contains(doc)) {
          doc.inBasket = f.name;

          if (!this.isCorrect(doc)) {
            this.mistakeMade = true; // 실수 여부 설정
            wrongAction();
            wrongCalled = true;
          } else {
            doc.removed = true;
            this.mistakeMade = false;  // ✔ 실수 상태 초기화
            // ✔ 효과음 재생
            if (insertSound && !insertSound.isPlaying()) {
            insertSound.play();
            }
          }
        }
      }
    }
  }

  isCorrect(doc) {
    return this.answerMap[doc.name] === doc.inBasket;
  }

  // loadNextText() {
  //   if (this.currentTextIndex >= this.texts.length) {
  //     this.fullText = "";
  //     this.displayedText = "";
  //     this.clickReady = false;

  //     if (this.onEndCallback) {
  //       this.onEndCallback(); // ← 여기서 stage 변경
  //     } else {
  //       noLoop();
  //     }

  //     return;
  //   }
  // }
  

  checkMissionStatus() {
    if (this.docs.every(d => d.removed)) {
      this.missionEnded = true;
      this.missionSuccess = true;
    //   stage ++; // 성공 시 다음 스테이지로 이동
    //   if (this.onEndCallback) {
    //   this.onEndCallback();
    //  }
    }
  }
  
}