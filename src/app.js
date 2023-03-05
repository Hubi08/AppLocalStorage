const formContainer = document.querySelector('.form');
const clearBtn = document.querySelector('.clear-btn');

// to render table content from localStorage
const tableContainer = document.querySelector('.table__body');
const inputDate = document.querySelector('.form__input--date');
const inputDescription = document.querySelector('.form__input--description');
const inputTime = document.querySelector('.form__input--time');
//select options dropdown
const select = document.querySelector('#options');

///////////////////////////////////////////////////////////////////////////////////////////////////
const valid = () => {
  const dateValid = inputDate.value.trim();
  const descriptionValid = inputDescription.value.trim();
  const timeoutValid = inputTime.value.trim();
  const selectValid = select.value;

  if (timeoutValid === '') {
    inputTime.classList.add('danger');
    return false;
  }

  return true;
};
const calculateTime = (infos) => {
  if (infos.length === 0) {
    return 'Brak wykonanych zadań 😱';
  }
  const numbers = infos.map((info) => Number(info.timeout));
  const sum = numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  return `Całkowity czas wykonywanych zadań to: ${sum.toString()} min! 🫡`;
};

//clear input fields
const clearFields = () => {
  inputDate.value = '';
  inputDescription.value = '';
  inputTime.value = '';
  select.value = '';
};

// render data to table from localStorage
const renderData = () => {
  let infos;
  if (localStorage.getItem('array') === null) {
    infos = [];
  } else {
    infos = JSON.parse(localStorage.getItem('array'));
  }

  const sumOfTime = calculateTime(infos);

  if (infos.length === 0) {
    clearBtn.classList.add('hidden');
  } else {
    clearBtn.classList.remove('hidden');
  }

  const markup = `
    ${infos
      .map((info) => {
        return `<tr>
        <td class="table__body-data">${info.date}</td>
        <td class="table__body-data">${info.timeout} min</td>
        <td class="table__body-data">${info.description}</td>
        <td class="table__body-data">${info.select.toUpperCase()}</td>
        </tr>`;
      })
      .join('')}`;

  const allTimeContainer = document.querySelector('.allTime');
  tableContainer.innerHTML = '';
  allTimeContainer.innerHTML = '';
  allTimeContainer.insertAdjacentHTML('beforeend', sumOfTime);
  tableContainer.insertAdjacentHTML('beforeend', markup);
};

formContainer.addEventListener('submit', (e) => {
  e.preventDefault();
  if (valid()) {
    console.log('frum drum brum');
    const data = {
      date: inputDate.value,
      description: inputDescription.value,
      timeout: inputTime.value,
      select: select.value,
    };

    let infos;
    if (localStorage.getItem('array') === null) {
      infos = [];
    } else {
      infos = JSON.parse(localStorage.getItem('array'));
    }
    infos.push(data);
    localStorage.setItem('array', JSON.stringify(infos));
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
