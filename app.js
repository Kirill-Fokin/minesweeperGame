import { createMatrix, matrix} from "./matrix.js"
import { createElement } from "./helpers.js";
import { Menu } from "./menu.js";
import { Stopwatch } from "./timer.js"
import { cellSound, bombSound  } from "./audio.js"

export class App {
  constructor (width=15, height=15, bombs, clicks, closure) {
       this.width = width
       this.heigth = height
       this.bombs = bombs
       this.clicks = clicks
       this.closure = closure
       this.mode = 10;
       this.res = []
       this.lastRes = 0;
       
    }

    
   getResultsfromLocal() {
    console.log('данные получены!')
    let results =  localStorage.getItem("leaderboard");
    console.log(results)
     return results 
   } 

   pushresultsToLocal() {
      const lastresultTime = document.querySelector('.endgame-text').textContent.slice(12)
      const lastresultClicks = document.querySelectorAll('.endgame-text')[1].textContent.slice(14)
      console.log(lastresultClicks)
      let oldRes = this.getResultsfromLocal() 
      if (oldRes) {
        
       

        
      }
    
      if (oldRes) {
      localStorage.setItem('leaderboard',  lastresultTime+ ' ' + lastresultClicks + '-' + oldRes)
      console.log(lastresultTime)

      if (this.getResultsfromLocal().split('-').length > 10 ) {
        localStorage.setItem('leaderbord', getResultsfromLocal().split('-').slice(0, 10).join('-'))
        console.log( oldRes.split('-').length)
      }

      } else {
        
          localStorage.setItem('leaderboard',  '-'  + lastresultTime+ ' ' + lastresultClicks )
          console.log(lastresultTime)
          console.log('rgdfsgdfsgdf')
          
      }
// 
   }
  
    changeMode () {
      const app = document.getElementById('app')

      const modeText = document.querySelector('.mode-text')
      if (modeText.textContent == 'EASY') {
        this.mode = 15;
        modeText.textContent = 'MEDIUM'
         this.refresh(15, 15, 30)
         app.classList.remove('app25X25')
         app.classList.add('app15X15')
       }
       else if (modeText.textContent == 'MEDIUM') {
        this.mode = 25;
        modeText.textContent = 'HARD'
        this.refresh(25, 25, 65)
        app.classList.add('app25X25')
        app.classList.remove('app15X15')
       }
        else if (modeText.textContent == 'HARD') {
          this.mode = 10;
        modeText.textContent = 'EASY'
        this.refresh(10,10,10)
        app.classList.remove('app25X25')
        app.classList.remove('app15X15')
       }
    }

    startGame(width, height, bombs) {
      createMatrix(width, height, bombs)
      console.log(matrix)
    }

    changeTheme () {
      let link = document.head.querySelectorAll('link')
      const link1 = link[0]
      const link2 = link[1]
      if (link1.getAttribute('media')  == 'all') {
       link1.setAttribute('media', 'not all')
       link2.setAttribute('media', 'all')
      } else {
       link1.setAttribute('media', 'all')
       link2.setAttribute('media', 'not all')
      }
    }


    createLeaderboarsd() {
     const leaderbord = createElement('div', ['leaderboard']) 
     const leaderbordTitle = createElement('div', ['leaderboard-title']) 
     leaderbordTitle.textContent = 'Last results'
     leaderbord.append(leaderbordTitle)

     const modal = document.querySelector('.modal');
     modal.append(leaderbord)

     let res = this.getResultsfromLocal().split('-')
     for (let i = 0; i < 10; i++) {
      const stroka = createElement('div', ['leaderboard-text']) 
      if (res[i]== '') {
        continue
      }
      stroka.textContent = i  + 1 + ' ' + res[i]

      leaderbord.append(stroka)
     }
    }
    

   


    addListeners() {
      document.querySelector('.refresh').addEventListener('click', () => this.refresh( this.width, this.heigth, this.bombs))
      document.querySelector('.refresh').addEventListener('click',
       () => { document.querySelector('.refresh-img').classList.add('refresh-img-rotated'),
       setTimeout(()=>document.querySelector('.refresh-img').classList.remove('refresh-img-rotated'), 1000 )
       
      })  
      document.getElementById('app').addEventListener('click', 
      () => this.isLose(),)
      document.getElementById('app').addEventListener('click', 
      () => this.isWin()) 
      document.getElementById('app').addEventListener('click', 
      () => this.isFirstClick()) 
      document.querySelector('.burger-img').addEventListener('click', 
     () => this.createSetting() )     
    }

    lastClickCoordinates ()  {
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
          if(matrix[i][j].isClicked) {
            this.lastClickCoordinat = matrix[i][j].coordinates
            return(matrix[i][j].coordinates)
          } else {
           console.log('nothing coordinates');
          }
        }
      }
    }

    createSetting() {
      const modal = createElement('div', ['modal'])
      document.body.prepend(modal)
      setTimeout(() => modal.classList.add('open'), 200);
 
      const settings = createElement('div', ['setting']);
      const sound = createElement('div', ['sound']);
      const soundImage = createElement('img', ['sound-image']);
      
      settings.append(sound)
      sound.append(soundImage)

      this.sound = true;
      soundImage.src = 'assets/images/soundon.png'

      sound.addEventListener('click', () => {

      if (this.sound){
        soundImage.src = 'assets/images/soundoff.png'
        this.sound = false;
        cellSound.volume = 0;
        bombSound.volume = 0;
      
      } else {
        soundImage.src = 'assets/images/soundon.png'
        this.sound = true;
        cellSound.volume = 1;
        bombSound.volume = 1;
      
     }
    })
     
      const leaderButton= createElement('div', ['leaderboards-button']);
      const leaderbords= createElement('img', ['leaderboards']);

      leaderbords.src = 'assets/images/leaderboard-icon-17.jpg';
      settings.append(leaderButton)
      leaderButton.append(leaderbords)
      
      leaderbords.addEventListener('click', ()=> {
        if (document.querySelector('.leaderboard')){
          document.querySelector('.leaderboard').remove()
        } else {
        this.createLeaderboarsd()
        }
      })

      const style= createElement('div', ['style-button']);

      style.addEventListener('click', () => {
        this.changeTheme ()
      })
      const styleText= createElement('p', ['style-text']);
      styleText.textContent = 'Style'
      settings.append(style)
      style.append(styleText)




      const mode = createElement('div', ['mode']);
      settings.append(mode)
     
      const modeText= createElement('p', ['mode-text']);
      mode.append(modeText)
      
      if (this.mode == 10) {
        modeText.textContent = 'EASY'
      }
        
      else if (this.mode == 15) {
        modeText.textContent = 'MEDIUM'
      }
        
      else if (this.mode == 25) {
        modeText.textContent = 'HARD'
      }



      
      mode.addEventListener('click', () => {
       if (modeText.textContent == 'EASY') {
        modeText.textContent = 'MEDIUM'
       this.changeMode()
       }
       else if (modeText.textContent == 'MEDIUM') {
        modeText.textContent = 'HARD'
        this.changeMode()
       }
       else if (modeText.textContent == 'HARD') {
        modeText.textContent = 'EASY'
        this.changeMode()
       }
      })

      modal.append(settings)
      console.log('settings created')


      modal.addEventListener('click', (e)=> {
        if (e.target.classList.contains('modal')){
          modal.classList.remove('open')
          modal.remove()
        }
      })
    }

      isFirstClick() {
        if (document.querySelector('.click-counter').textContent == '0') { 
          this.lastClickCoordinates()
          const blocks = document.querySelectorAll('.box')
          let coordinates = this.lastClickCoordinates()
          console.log( coordinates)
          console.log( coordinates.x,coordinates.y    )
          this.refresh(this.width, this.heigth, this.bombs)
          matrix[coordinates.y][coordinates.x].onBoxClick()
        } else {
          console.log('no, its not  a first click')
        }
      }

      isLose(state = false, res= true, ) { 
        for (let i = 0; i < matrix.length; i++) {
          for (let j = 0; j < matrix[0].length; j++) {
             if(matrix[i][j].isBomb && matrix[i][j].isOpenned){
               console.log('Ты проиграл ')
               console.log('324324234')
               if (res) {
                 this.createEndGame('Lose') 
                 
             
               
              }
              if (!res) {
                return true
              }
             
             }
          }
          
        }
        
      }

      isWin() {
        let counter = 0;
        const winNumeber =  document.querySelectorAll('.box').length == 100 ? 90 :
         document.querySelectorAll('.box').length == 225 ? 195 : 560
     

        for (let i = 0; i < matrix.length; i++) {
          for (let j = 0; j < matrix[0].length; j++) {
             if(matrix[i][j].isOpenned) {
              counter++
             }
          }
        }
        if (counter == winNumeber) {
          this.createEndGame('Win')
          this.pushresultsToLocal()
          this.stopwatch.stop()
        }
        console.log(counter)
      }

   createEndGame(word) {
    if (document.querySelector('.modal')) {
      return 
    }
    const   modal = createElement('div', ['modal'])
    document.body .prepend(modal)
    setTimeout(() => modal.classList.add('open') , 200);
      const endGameField = createElement('div', ['endgame'])
      modal.append(endGameField)

      const endGameButton = createElement('div', ['endgame-button'])
      endGameButton.textContent = 'x'
      endGameField.append(endGameButton)

      endGameButton.addEventListener('click', ()=> {
        modal.remove()
        setTimeout(() => this.refresh(this.width, this.heigth, this.bombs), 200)
      })
       
      const  endGameTtitle = createElement('div', ['endgame-title'])
      endGameTtitle.textContent = `You ${word} `
      endGameField.append(endGameTtitle)
      const  endGameText = createElement('div', ['endgame-text'])
      const  endGameTime = createElement('div', ['endgame-text'])
       
      endGameText.textContent = `Youre result: ${document.querySelector('.click-counter').textContent}`
      endGameField.append(endGameTime)
      let time = document.querySelector('.timer').textContent
      endGameTime.textContent = `Youre time: ${time}`
      endGameField.append(endGameText)
      // stopwatch.stop()
       
     }

     safeData () {
      let currentTime = document.querySelector('.timer')
      let currentClicks = document.querySelector('.click-counter')
      setItem(timeLeaderboards, [ currentClicks, currentTime ])
     }

     refresh(width =10, height=10, bombs=10 ) {
      // bombs = this.mode == 10 ? 10  : this.mode == 15 ? 25;
      document.querySelector('.flag-text').textContent ='10';


      bombs = this.mode == 10
      ? 10
      :this.mode == 15
      ? 35
      : this.mode == 25

      if ( this.mode == 25) {
        bombs = 65;
      }
      let boxes = document.querySelectorAll('.box')
       console.log(boxes.length)


       this.width = width;
       this.heigth = height;
       this.width = width;
       for (let i = 0; i < boxes.length; i++) {
        boxes[i].remove()
     
     }
     this.stopwatch.reset()
     this.stopwatch.start()
     this.startGame(width, height, bombs)
     document.querySelector('.click-counter').textContent = 0;
   }

   createMenu() {
    let menu = new Menu()
    menu.create()
   } 
   
   
   createStopwatch() {
    this.stopwatch = new Stopwatch("stopwatch");
     this.stopwatch.start()
      
}
}




