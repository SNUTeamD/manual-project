function preload(){
 myFont = loadFont('assets/DungGeunMo.ttf');
 folderIcon = loadImage('assets/folderIcon.png');
 folderDoc = loadImage('assets/folderDoc.png');
}

class MyFolder {
  constructor(folderX, folderY, folderW, folderH, folderCont) {
    this.x = folderX;
    this.y = folderY;
    this.w = folderW;
    this.h = folderH;
    this.img = folderIcon;
    this.cont = folderCont;
  }

  display() {
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.w, this.h);
    text(folderCont, folderX, folderY+folderH/2);
  }
}

class MyDoc{
    constructor(docX, docY, docW, docH, docCont){
        this.x = docX;
        this.y = docY;
        this.w = docW;
        this.h = docH;
        this.img = folderDoc;
        this.cont = docCont;
    }
    display() {
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.w, this.h);
    text(docCont, docX, docY+docH/2);
    }
}