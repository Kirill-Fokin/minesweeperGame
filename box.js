import { getAllNeighbors, openAllBoxes  } from "./matrix.js";
import { createElement } from "./helpers.js";
import { cellSound, bombSound  } from "./audio.js"

const appElem = document.getElementById("app");

class Box {
  constructor(isBomb, coordinates) {
    this.isBomb = isBomb;
    this.coordinates = coordinates;
    this.isOpenned = false;
    this.isClicked  = false;
  }

  setFlage(isFlagged) {
   if (this.isFlagged) {
    this.isFlagged = false;
    this.boxElem.innerHTML =  "";
    document.querySelector('.flag-text').textContent  = +document.querySelector('.flag-text').textContent + 1
  } else {
    this.isFlagged = isFlagged;

  if (isFlagged && +(document.querySelector('.flag-text').textContent) > 0 && !this.isOpenned) {
    this.boxElem.innerHTML = isFlagged ? "🚩" : "";
        document.querySelector('.flag-text').textContent  = +document.querySelector('.flag-text').textContent - 1;
    } 
  }
 }

  removeFlage() {
    if(this.isFlagged) {
      this.isFlagged = false;
      this.boxElem.innerHTML = ' ';
    }
  }

  setBoxValue(value) {
    this.value = value;
  }

  showBoxValue(){
    this.boxElem.innerHTML = this.value || "";
  }

  getValue () {
     return this.value;
  }

  open() {
    this.isOpenned = true;
    this.boxElem.classList.remove('initial'); 
    this.showBoxValue()
  }

  setBoxType() {
    if (this.isBomb) {
       this.setBoxValue('💣');
       return;
    }

    const AllNeighbors = getAllNeighbors(this.coordinates)
    let bombCount = 0;

    AllNeighbors.forEach((neighbor) => {
        if (neighbor === 1 || neighbor.isBomb) {
           bombCount++ ;
        }
    });

    if (bombCount) {
      this.setBoxValue(bombCount)
    }
  }

  onBoxClick(allowOpenNumber = false, isReturn = true) {
    this.isClicked = true;
    cellSound.play()
    if (this.isFlagged) {
      console.log('this block  is flagged !')
     return 
    }

    if (!this.value && !this.isOpenned){
      this.open();
      const allNeighbors = getAllNeighbors(this.coordinates);
      allNeighbors.forEach((neighbor) => {
        if (!neighbor.isOpenned) {
          neighbor.onBoxClick(true, false);
        }
      });
     
      if (isReturn) {
        document.querySelector('.click-counter').textContent = +document.querySelector('.click-counter').textContent  + 1;
      }

      } else if (
        (this.value && allowOpenNumber  ) || typeof this.value === "number")  {
        this.open();
      if (isReturn) {
        document.querySelector('.click-counter').textContent = +document.querySelector('.click-counter').textContent  + 1;
      }
      isReturn = false;

  } else if ((this.isBomb) && (document.querySelector('.click-counter').textContent == '0')) {
    console.log('первый хож и бимба!')   
     
   } else if (this.isBomb) {
    bombSound.play()
    console.log(this.coordinates +  'бомба координаты ')
    openAllBoxes()
   }
   app.clicks++
  }
    
 createBoxOnArea() {
     const boxElem = document.createElement('div')
     boxElem.innerHTML = this.value || ''; 
     boxElem.classList.add('box'); 
     boxElem.classList.add('initial'); 
     if (this.value) {
        boxElem.classList.add(`bomb-count-${this.value}`); 
     } 
     this.boxElem = boxElem
     this.boxElem.addEventListener('click',()=> this.onBoxClick());
     this.boxElem.addEventListener('contextmenu', (e)=> {
        e.preventDefault() ;
        this.setFlage(true);
        return
      }
     );
     
     appElem.appendChild(boxElem);
  }
}
export function createBox(isBomb, coordinates) {
    const newBox = new Box(isBomb, coordinates);

    newBox.setBoxType()
    newBox.createBoxOnArea()

    return newBox;
} 