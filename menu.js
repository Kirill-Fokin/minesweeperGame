import { createElement } from "./helpers.js";



// export function createEndgameBlock () {
//   const endgameWrapper = createElement('div', ['endgame-wrapper'])
//   const endgameTitle = createElement('h3', ['endgame-title'])
//   const endgameText = createElement('p', ['endgame-text'])

//   document.querySelector('.body').append(endgameWrapper)
//   endgameWrapper.append(endgameTitle)
//   endgameTitle.textContent ='You Win!'
//   endgameWrapper.preppend(endgameText)
//   endgameText.textContent = 'Youre result: ---'
// }

  export class Menu {
    constructor(time, flags, mines, ) {

      this.flags = flags;
      this.mines = mines;
    }


   safeData() {
    localStorage.setItem('test', 1);
   }

    create() {
        const menu = createElement('div', ['menu']);
        document.querySelector('body').prepend(menu);


        const timerWrapper = createElement('div', ['timer-wrapper']);
        const timerImage = createElement('img', ['timer-img']);
        const timer = createElement('div', ['timer']);

        menu.prepend(timerWrapper);
        timer.textContent = '00:00';
        timerWrapper.prepend(timer);
        timerWrapper.prepend(timerImage);
        timerImage.src = 'assets/images/clock.svg'

      


        const burger = createElement('div', ['burger']);
        const burgerImage = createElement('img', ['burger-img']);
        burgerImage.src = 'assets/images/list2.svg'
        burger.append(burgerImage);
        

        burger.src = 'assets/images/list2.svg'
        menu.append(burger);


        const clickCounter = createElement('div', ['click-counter']);
        clickCounter.textContent =  0;
        menu.append(clickCounter);

        const refresh = createElement('div', ['refresh']);
        const refreshImage = createElement('img', ['refresh-img',]);
        refreshImage.src = 'assets/images/restart.svg'
        refresh.append(refreshImage);
         menu.append(refresh);

        const flag = createElement('div', ['flag']);
        const flagText = createElement('div', ['flag-text']);
        flagText.textContent = 10;
        const flagImage = createElement('img', ['flag-img']);
        flagImage.src = 'assets/images/flag.svg'
        flag.append(flagImage)
        flag.append(flagText)
        menu.append(flag);
    }
}
export default Menu