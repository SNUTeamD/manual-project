class MyFolder {
  constructor(folderX, folderY, folderW, folderH, foldername) {
    this.x = folderX;
    this.y = folderY;
    this.w = folderW;
    this.h = folderH;
    this.img = folderIcon;
    this.name = foldername;
  }

  display() {
    push();
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.w, this.h);
    fill(255); // White text for folder name
    textSize(16); // Text size relative to folder height
    textAlign(CENTER, CENTER);
    text(this.name, this.x, this.y+50);
    pop();
  }
  contains(doc) {
    return (
      doc.x > this.x - this.w / 2 &&
      doc.x < this.x + this.w / 2 &&
      doc.y > this.y - this.h / 2 &&
      doc.y < this.y + this.h / 2
    );
  }
}

class MyDoc{
  constructor(docX, docY, docW, docH, docname){
    //기본세팅
    this.x = docX;
    this.y = docY;
    this.w = docW;
    this.h = docH;
    this.img = folderDoc;
    this.name = docname;
    //움직임
    this.dragging = false;
    this.offsetX = 0;
    this.offsetY = 0;
    this.inBasket = null;
    this.removed = false;
  }

  //생성
  display() {
    push();
    imageMode(CENTER);
    textSize(16);
    image(this.img, this.x, this.y, this.w, this.h);
    text(this.name, this.x, this.y+50);
    pop();
  }

  checkPressed() {
  if (mouseX > this.x - this.w / 2 &&
    mouseX < this.x + this.w / 2 &&
    mouseY > this.y - this.h / 2 &&
    mouseY < this.y + this.h / 2 ) {
    this.dragging = true;
    this.offsetX = this.x - mouseX;
    this.offsetY = this.y - mouseY;
    this.inBasket = null;
    }
  }

  drag() {
  if (this.dragging) {
    this.x = mouseX + this.offsetX;
    this.y = mouseY + this.offsetY;
  }
  }

  stopDragging() {
    this.dragging = false;
  }

  isCorrect() {
    return this.inBasket === answerMap[this.name];
  }
  
}


  
