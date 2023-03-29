const ctaBtn = document.querySelector('.cta-btn');

// ctaBtn.innerHTML = 'Kalkulator';
// ctaBtn.innerHTML = 'Zadania';

const slide = document.querySelectorAll('.slide');

let counter = 0;

const defaultPosition = () => {
  ctaBtn.innerHTML = 'Kalkulator';
  slide.forEach((s, i) => {
    s.style.transform = `translateX(${i * 100}%)`;
  });
};

ctaBtn.addEventListener('click', () => {
  if (counter >= slide.length - 1) {
    counter = -1;
  }

  if (counter >= 0) {
    ctaBtn.innerHTML = 'Zadania';
  } else {
    ctaBtn.innerHTML = 'Kalkulator';
  }

  counter++;

  slide.forEach((s, i) => {
    s.style.transform = `translateX(${i * 100 - counter * 100}%)`;
  });
});

defaultPosition();
