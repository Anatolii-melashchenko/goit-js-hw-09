import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  input: document.querySelector('input#datetime-picker'),
};
refs.start.setAttribute('disabled', true);

let targetTime = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= Date.now()) {
      window.alert('Please choose a date in the future');
      return;
    }

    targetTime = selectedDates[0];

    refs.start.addEventListener('click', onStartTime);

    refs.start.disabled = false;
  },
};

const timer = {
  start() {
    const intervalId = setInterval(() => {
      const deltaTime = targetTime.getTime() - Date.now();
      const timeComponent = convertMs(deltaTime);

      if (deltaTime <= 0) {
        clearInterval(intervalId);
        refs.seconds.style.color = 'inherit';
        refs.minutes.style.color = 'inherit';
        refs.hours.style.color = 'inherit';
        refs.days.style.color = 'inherit';
        refs.input.disabled = true;

        return;
      }

      refs.seconds.style.color = 'red';
      refs.minutes.style.color = 'red';
      refs.hours.style.color = 'red';
      refs.days.style.color = 'red';
      refs.seconds.textContent = timeComponent.seconds;
      refs.minutes.textContent = timeComponent.minutes;
      refs.hours.textContent = timeComponent.hours;
      refs.days.textContent = timeComponent.days;
    }, 1000);
  },
};

flatpickr(refs.input, options);

function onStartTime() {
  timer.start();

  refs.start.disabled = true;
  refs.input.disabled = true;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
