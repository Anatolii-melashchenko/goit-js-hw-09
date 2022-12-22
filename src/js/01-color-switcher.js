function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};
const DELAY = 1000;
let timerId = null;

refs.start.addEventListener('click', onChangeColorStart);
refs.stop.addEventListener('click', onChangeColorStop);
refs.stop.disabled = true;

function onChangeColorStart() {
  refs.start.disabled = true;
  refs.stop.disabled = false;

  timerId = setInterval(() => {
    let randomColor = getRandomHexColor();

    document.body.style.backgroundColor = randomColor;
  }, DELAY);
}

function onChangeColorStop() {
  clearInterval(timerId);

  refs.start.disabled = false;
  refs.stop.disabled = true;
}
