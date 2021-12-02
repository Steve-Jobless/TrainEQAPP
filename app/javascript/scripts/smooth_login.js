const emailInput = document.querySelector('.user_email');
const email = window.localStorage.getItem('email');
console.log(email);
emailInput.innerHTML = '';
emailInput.insertAdjacentHTML('beforeend', `<input class="form-control string email optional" autocomplete="email" autofocus="autofocus" type="email" value="${email}" name="user[email]" id="user_email">`);
