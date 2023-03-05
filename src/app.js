const formContainer = document.querySelector('.form');
const clearBtn = document.querySelector('.clear-btn');

// to render table content from localStorage
const tableContainer = document.querySelector('.table__body');
const workDateInput = document.querySelector('.form__input--date');
const workDescriptionInput = document.querySelector('.form__input--description');
const workDurationInput = document.querySelector('.form__input--time');
//select options dropdown
const workTypeInput = document.querySelector('#workTypeInput');

let spentTimes = [];

///////////////////////////////////////////////////////////////////////////////////////////////////
const isWorkDateValid = () => {
  const workDurationInputValue = workDurationInput.value;
  if (!workDurationInputValue) {
    workDurationInput.classList.add('danger');
    return false;
  }

  return true;
};

const calculateTime = (spentTimes) => {
  if (spentTimes.length === 0) {
    return 'Brak wykonanych zadań 😱';
  }
  const numbers = spentTimes.map((info) => Number(info.duration));
  const sum = numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return `Całkowity czas wykonywanych zadań to: ${sum} min! 🫡`;
};

//clear input fields
const clearFields = () => {
  workDateInput.valueAsDate = new Date(); //set default value of workDateInput input in form to today
  workDescriptionInput.value = null;
  workDurationInput.value = null;
  workTypeInput.value = null;
};

// render data to table from localStorage
const renderData = () => {
  const loadedSpentTimes = localStorage.getItem('spentTimes');
  if (!loadedSpentTimes) {
    spentTimes = [];
    clearBtn.classList.add('hidden');
  } else {
    spentTimes = JSON.parse(loadedSpentTimes);
    clearBtn.classList.remove('hidden');
  }

  const sumOfTime = calculateTime(spentTimes);

  const allTimeContainer = document.querySelector('.allTime');
  tableContainer.innerHTML = '';
  allTimeContainer.innerHTML = '';
  allTimeContainer.insertAdjacentHTML('beforeend', sumOfTime);
  
  workDateInput.valueAsDate = new Date(); //set default value of workDateInput input in form to today

  if (spentTimes.length > 0) {
    //there are values to show so render markup
    const markup = `
    ${spentTimes
      .map((spentTime) => {
        return `<tr>
        <td class='table__body-data'>${spentTime.date}</td>
        <td class='table__body-data'>${spentTime.duration} min</td>
        <td class='table__body-data'>${spentTime.description}</td>
        <td class='table__body-data'>${spentTime.type.toUpperCase()}</td>
        </tr>`;
      })
      .join('')}`;
    tableContainer.insertAdjacentHTML('beforeend', markup);
  }
};

formContainer.addEventListener('submit', (e) => {
  e.preventDefault();
  if (isWorkDateValid()) {
    const work = {
      date: workDateInput.value,
      description: workDescriptionInput.value,
      duration: workDurationInput.value,
      type: workTypeInput.value,
    };
    spentTimes.push(work);
    localStorage.setItem('spentTimes', JSON.stringify(spentTimes));
    renderData();
    clearFields();
  }
});

clearBtn.addEventListener('click', (e) => {
  localStorage.clear();
  renderData();
});

window.addEventListener('load', () => {
  renderData();
});
