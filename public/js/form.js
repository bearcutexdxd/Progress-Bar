/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
const input = document.querySelector('#names');
const main = document.querySelector('#main');
const checkboxes = document.querySelectorAll('.form-check-input');
const formId = main.dataset.formid;
const progressBar = document.querySelector('#progressBar');

const formOutput = {
};

function getPercent(num) {
  return Math.floor((num / 12) * 100);
}

window.addEventListener('load', async (event) => { // requesting data from DB
  try {
    const res = await fetch(`/db/form/${formId}`);
    if (res.ok) {
      const data = await res.json();
      for (const el in data) {
        if (el === 'q8_Str') {
          input.value = data[el];
          formOutput.names = input.value;
        }
        for (let i = 0; i < checkboxes.length; i += 1) {
          if (el === checkboxes[i].id) {
            checkboxes[i].checked = data[el];
            formOutput[el] = data[el];
          }
        }
      }
    }
  } catch {
    alert("Couldn't get data from DB. Please reload the page.");
  }

  let counter = 0;

  for (let i = 0; i < checkboxes.length; i += 1) { // adding progressbar
    if (checkboxes[i].checked) {
      counter += 1;
    }
  }

  counter = getPercent(counter);
  if (counter <= 50) {
    progressBar.className = 'progress-bar progress-bar-striped bg-danger';
    progressBar.setAttribute('style', `width: ${counter}%`);
    progressBar.setAttribute('aria-valuenow', `${counter}`);
  } else if (counter <= 75) {
    progressBar.className = 'progress-bar progress-bar-striped bg-warning';
    progressBar.setAttribute('style', `width: ${counter}%`);
    progressBar.setAttribute('aria-valuenow', `${counter}`);
  } else {
    progressBar.className = 'progress-bar progress-bar-striped bg-success';
    progressBar.setAttribute('style', `width: ${counter}%`);
    progressBar.setAttribute('aria-valuenow', `${counter}`);
  }
});

main.addEventListener('click', async (event) => { // checkboxes logic
  if (event.target.type === 'checkbox') {
    if (event.target.checked) {
      formOutput[event.target.id] = true;
    } else {
      formOutput[event.target.id] = false;
    }
    formOutput.names = input.value;
    try {
      const response = await fetch('/db/form', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ formOutput, formId }),
      });
    } catch (error) {
      alert("Couldn't send data to DB.");
    }

    let counter = 0;

    for (let i = 0; i < checkboxes.length; i += 1) { // adding progressbar
      if (checkboxes[i].checked) {
        counter += 1;
      }
    }

    counter = getPercent(counter);
    if (counter <= 50) {
      progressBar.className = 'progress-bar progress-bar-striped bg-danger';
      progressBar.setAttribute('style', `width: ${counter}%`);
      progressBar.setAttribute('aria-valuenow', `${counter}`);
    } else if (counter <= 75) {
      progressBar.className = 'progress-bar progress-bar-striped bg-warning';
      progressBar.setAttribute('style', `width: ${counter}%`);
      progressBar.setAttribute('aria-valuenow', `${counter}`);
    } else {
      progressBar.className = 'progress-bar progress-bar-striped bg-success';
      progressBar.setAttribute('style', `width: ${counter}%`);
      progressBar.setAttribute('aria-valuenow', `${counter}`);
    }
  }
});

window.addEventListener('beforeunload', async () => { // sending data to DB
  formOutput.names = input.value;
  try {
    const response = await fetch('/db/form', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ formOutput, formId }),
    });
  } catch (error) {
    alert("Couldn't send data to DB.");
  }
});
