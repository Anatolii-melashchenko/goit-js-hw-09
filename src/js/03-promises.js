import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

function onCreatePromise(e) {
  e.preventDefault();

  let delay = Number(e.target.delay.value);
  let step = Number(e.target.step.value);
  let amount = Number(e.target.amount.value);

  for (let i = 1; i <= amount; i++) {
    createPromise(step, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

refs.form.addEventListener('submit', onCreatePromise);
// ----------------------------------------------------------------------------------

// const horse = ['Joi', 'Candler', 'Rachel', 'Monica', 'Fibs'];

// const promises = horse.map(run);

// function run(horse) {
//   return new Promise((resolve, reject) => {
//     const time = randomTime(2000, 3500);
//     setTimeout(() => {
//       resolve({ horse, time });
//     }, time);
//   });
// }

// Promise.race(promises).then(({ horse, time }) => {
//   console.log(
//     `%cWinner ${horse} time ${time} ms`,
//     'color:green; font-size:20px'
//   );
// });
// Promise.all(promises).then(x => {
//   console.log(x);
// });

// run('Joi')
//   .then(x => console.log(x))
//   .catch(e => console.log(e));

// function randomTime(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }
