export function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


export const createElement = (tagName, ...classNames) => {
    const element = document.createElement(tagName);
    element.classList.add(...classNames);
    return element;
  };
  