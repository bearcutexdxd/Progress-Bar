const logContainer = document.querySelector('.logContainer');
const formContainer = document.querySelector('#formContainer');

function addForm() {
  return `
<form id="logUser" action="/main">
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label ">Введите Email</label>
    <input name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label ">Введите пароль</label>
    <input name="pass" type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <div id="btndiv" class="text-center">
    <button type="submit" class="btn btn-success ">Войти</button>
  </div>
</form>
`;
}

logContainer.addEventListener('click', async (e) => {
  if (e.target.type === 'button' && e.target.dataset.lgin === '1') {
    formContainer.innerHTML = '';
    formContainer.insertAdjacentHTML('afterbegin', addForm());

    const form = document.querySelector('#logUser');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const allInputs = Object.fromEntries(new FormData(form));
      const response = await fetch('/main', {
        method: 'post',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(allInputs),
      });
      if (response.ok) {
        window.location = '/main';
      } else { alert('Неверные данные. Проверьте e-mail и пароль'); }
    });
  }
});
