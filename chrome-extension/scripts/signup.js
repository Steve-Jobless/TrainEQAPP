// function submitForm() {
  const submit = document.getElementById('sign-up');
  submit.addEventListener('click', event => {
    event.preventDefault();
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const passwordConfirmation = document.getElementById('password-confirmation-input').value;

    const url = 'http://localhost:3000/api/v1/auth/';
    console.log("fetching...")
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
        "password_confirmation": passwordConfirmation
      })
    }).then(response => response.json())
      .then((data) => {
        console.log(data)
        const email = data.data.email
        const token = data.data.authentication_token
        console.log(token, window, window.localStorage);
        window.localStorage.setItem("token", token)
        chrome.storage.local.set({ email: email }, function () {
        });
        chrome.storage.local.set({ token: token }, function () {
        });
      });
    window.location.href = '../popup.html';
  });
// }

// function submitForm() {

//   const url = 'http://localhost:3000/api/v1/auth/';

//   fetch(url, {
//     method: 'POST',
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       "email": "test37@gmail.com",
//       "password": "123123",
//       "password_confirmation": "123123"
//     })
//   }).then(response => response.json())
//     .then((data) => {
//       console.log(data)
//       const user_token = data.authentication_token
//     });
// };
