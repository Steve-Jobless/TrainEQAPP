// function listenClick() {
//   const button = document.getElementById('power-btn');
//   button.addEventListener('click', event => {
//     // if event.target.innerText === 'start' {
//     if (event.target.innerText === 'Start') {
//       // const $test = 1
//       chrome.tabs.executeScript({
//         file: 'scripts/monitoring.js'
//       });
//     }

//   })
// }
// function listenClick_two() {
//   const end_button = document.getElementById('end-btn');
//   end_button.addEventListener('click', event => {
//     // if event.target.innerText === 'start' {
//     if (event.target.innerText === 'End') {
//       // const $test = 1
//       chrome.tabs.executeScript({
//         file: 'scripts/end-meeting.js'
//       });
//       window.open("http://www.traineq.site/dashboard");
//     }

//   })
// }
function logOut() {
  const button = document.getElementById('logoutBtn');
  button.addEventListener('click', event => {
    chrome.storage.local.remove(["email", "token"], function () {
      // Set icon to logged out if user logs out
      toggleIcon("loggedOut");
      console.log('logging out');
    });
  })
};

// Toggles between logged in, logged out and recording chrome icon images
function toggleIcon(state) {
  switch (state) {
    case "loggedIn":
      chrome.browserAction.setIcon({path: "images/trainEQ_logo_16x.png"});
      break;
    case "loggedOut":
      chrome.browserAction.setIcon({path: "images/trainEQ_logo_16x_grey.png"});
      break;
    case "recording":
      chrome.browserAction.setIcon({path: "images/icon-recording16px.png"});
      break;
  }
}


function checkBoxtoggle() {
  const button = document.getElementById('checkbox-btn');

  chrome.storage.local.get(['key'], function (result) {
    button.checked = result.key;
    console.log(result.key)
  });
  // localStorage.setItem('sessionActive', button.checked = true );

  // button.checked = window.sessionActive
  // console.log(button.checked)

  button.addEventListener('change', function () {

    if (this.checked) {

      // Set icon to 'recording' if checkbox is switched on
      toggleIcon("recording");

      chrome.tabs.executeScript({
        file: 'scripts/monitoring.js'
      });
      chrome.storage.local.set({ key: true }, function () {
        key = button.checked
        console.log(button.checked)
      });
      // window.sessionActive = true;
      // console.log(button.checked)
    } else {

      // Set icon to logged on but inactive (standard logo) if checkbox is switched off
      toggleIcon("loggedIn");

      chrome.tabs.executeScript({
        file: 'scripts/end-meeting.js'
      });
      chrome.storage.local.set({ key: false }, function () {
        key = button.checked
        console.log(button.checked)


      });      // window.open("http://www.traineq.site/dashboard");
      // window.sessionActive = false;
      // console.log(button.checked)
    }

  });

}


function listenClickDashboard() {
  const button = document.getElementById('dashboardBtn');
  button.addEventListener("click", function () {
    window.open("http://www.traineq.site/dashboard");
  });
}

// listenClick();
// listenClick_two();
checkBoxtoggle();
listenClickDashboard();
logOut();
